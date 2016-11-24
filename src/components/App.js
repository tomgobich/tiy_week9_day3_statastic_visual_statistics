import React, { Component } from 'react';
import $ from 'jquery';
import Utilities from '../utilities/searchUtilities';
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
    promise.then(response => {
      let teamPlayerList = Utilities.verifyTeamPlayer(response.players, this.state.teams[teamIndex].id);

      this.setState({ players: teamPlayerList });
    });
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
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <nav className="navbar navbar-dark bg-inverse">
              <a className="navbar-brand" href="#">Statastics</a>
              <ul className="nav navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
              </ul>
              <form className="form-inline float-xs-right" onSubmit={this.teamSubmit}>
                <input id="teamSearch" className="form-control" type="text" placeholder="Enter NBA Team..." onChange={this.teamChange} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </nav>
          </div>
          <div className="col-xs-12">
            <h2 className="team-name">{this.state.teamName} Statistics</h2>
          </div>
          <div className="col-xs-12">
            <PlayerCharts data={this.state.players} />
          </div>
          <Roster data={this.state.players} />
        </div>
      </div>
    );
  }
}

export default App;
