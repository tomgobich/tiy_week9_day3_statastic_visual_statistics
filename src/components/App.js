import React, { Component } from 'react';
import $ from 'jquery';
import Utilities from '../utilities/utilities';
import PlayerCharts from './PlayerCharts';
import Roster from './Roster';
import { Notification } from 'react-notification';


class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      nbaTeam:   'nba-atl',
      nbaTeamIndex: 0,
      teamName: 'Atlanta Hawks',
      teams: [],
      players: [],
      playerStats: [],
      searchError: false,
    };

    this.teamSubmit = this.teamSubmit.bind(this);
    this.setNotificationInactive = this.setNotificationInactive.bind(this);
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

  // Passes teamSubmit value
  teamSubmit(e)
  {
    e.preventDefault();

    let searchValue = $('#teamSearch').val();

    console.log(Utilities.findTeamFromSearch(this.state.teams, searchValue));

    let teamInfo = Utilities.findTeamFromSearch(this.state.teams, searchValue);

    console.log(teamInfo);

    if(typeof teamInfo === 'object')
    {
      console.log('door #1');
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
      let $noSearchResults = $('#noSearchResults');
      console.log('door #2');
      this.setState({ searchError: true });
    }
  }

  setNotificationInactive()
  {
    this.setState({ searchError: false });
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
                  <input id="teamSearch" className="form-control col-sm-8" type="text" placeholder="Enter NBA Team..."  />
                </div>
              </form>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Notification
                isActive={this.state.searchError}
                message="No search results were found, please try again!"
                action="Dismiss"
                dismissAfter={3000}
                onDismiss={this.setNotificationInactive}
              />
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
