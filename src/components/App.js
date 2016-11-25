import React, { Component } from 'react';
import $ from 'jquery';
import Utilities from '../utilities/utilities';
import PlayerCharts from './PlayerCharts';
import Roster from './Roster';

class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      nbaTeam:   'nba-atl',
      nbaTeamIndex: 0,
      teamSubmit: '',
      teamName: 'Atlanta Hawks',
      teams: [],
      players: [],
      playerStats: []
    };

    this.teamChange = this.teamChange.bind(this);
    this.teamSubmit = this.teamSubmit.bind(this);
  }



  // Gets team listing
  getTeams()
  {
    let promise = Utilities.getNBATeams();
    promise.then(response => {
      this.setState({ teams: response.teams });
      this.getTeamPlayers(this.state.nbaTeamIndex);
    });
  }  

  // Gets player listing for passed in team (some trade players are mixed in)
  getTeamPlayers(teamIndex)
  {
    let teamSlug = this.state.teams[teamIndex].slug;

    let promise = Utilities.getNBATeamPlayers(teamSlug);
    promise.then(response =>
    {
      let teamPlayerList = Utilities.verifyTeamPlayer(response.players, this.state.teams[teamIndex].id);

      this.setState({ players: teamPlayerList });

      this.getTeamPlayersStats(teamSlug);
    });
  }

  getTeamPlayersStats(teamSlug)
  {
    let promise = Utilities.getNBATeamPlayersStats(teamSlug);
    promise.then(response =>
    {
      this.setState({ playerStats: response.player_season_stats });
    })
  }

  // Updates current teamSubmit value
  teamChange(e)
  {
    this.setState({ teamSubmit: e.target.value });
  }

  // Passes teamSubmit value
  teamSubmit(e)
  {
    e.preventDefault();

    let teamInfo = Utilities.findTeamFromSearch(this.state.teams, this.state.teamSubmit);

    if(typeof teamInfo.index === 'number')
    {
      this.getTeamPlayers(teamInfo.index);
      this.setState({ 
        teamIndex: teamInfo.index, 
        teamName: teamInfo.name,
        teamSubmit: '',
      });

      $('#teamSearch').val('');
    }
    else
    {
      alert('No team matching your search could be found. Please try again.');
    }
  }



  // Load initial forecast
  componentWillMount()
  {
    this.getTeams();
  }



  render()
  {
    return(
      <div className="app">
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <div className="navbar-xs">
              <p className="navbar-brand">Statastic</p>
              <span className="navbar-brand subtext hidden-sm-down">
                Fan-tastic Stats!
              </span>
              <form className="navbar-form navbar-form" onSubmit={this.teamSubmit}>
                <div className="form-group">
                  <input id="teamSearch" className="form-control col-sm-8" type="text" placeholder="Enter NBA Team..." onChange={this.teamChange} />
                </div>
              </form>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="team-name">{this.state.teamName} Statistics</h2>
            </div>
            <div className="col-xs-12">
              <PlayerCharts data={this.state.players} stats={this.state.playerStats} />
            </div>
            <Roster data={this.state.players} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
