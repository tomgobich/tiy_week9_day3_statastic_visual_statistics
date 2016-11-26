import $ from 'jquery';

let Utilities =
{

  // --------------------------------------------------
  // Name: getNBATeams
  // Abstract: Gets NBA team's roster
  // --------------------------------------------------
  getNBATeams: () =>
  {
    let promise = $.ajax({
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token token=02cfc5b8af2037d657aa7c9f7ac501be",
        "Accept": "application/vnd.stattleship.com; version=1"
      },
      url: `https://api.stattleship.com/basketball/nba/teams`,
    });

    return promise;
  },



  // --------------------------------------------------
  // Name: getNBATeamPlayers
  // Abstract: Gets NBA team's roster
  // --------------------------------------------------
  getNBATeamPlayers: (teamSlug) =>
  {
    let promise = $.ajax({
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token token=02cfc5b8af2037d657aa7c9f7ac501be",
        "Accept": "application/vnd.stattleship.com; version=1"
      },
      url: `https://api.stattleship.com/basketball/nba/rosters?team_id=${teamSlug}`,
    });

    return promise;
  },



  // --------------------------------------------------
  // Name: getNBATeamPlayersStats
  // Abstract: Gets NBA team's player's season average statistics
  // --------------------------------------------------
  getNBATeamPlayersStats: (teamSlug) =>
  {
    let promise = $.ajax({
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token token=02cfc5b8af2037d657aa7c9f7ac501be",
        "Accept": "application/vnd.stattleship.com; version=1"
      },
      url: `https://api.stattleship.com/basketball/nba/player_season_stats?team_id=${teamSlug}`,
    });

    return promise;
  },



  // --------------------------------------------------
  // Name: findTeamFromSearch
  // Abstract: Finds team from teamList matching user input
  // --------------------------------------------------
  findTeamFromSearch: (teamList, teamInput) =>
  {
    let teamIndex = null;
    let teamName  = '';
    let teamError = 'No team matching your search could be found';

    // Loop through teamList
    teamList.forEach((team, index) =>
    {
      let name     = team.name.toUpperCase(),
          nickname = team.nickname.toUpperCase(),
          city     = team.location.toUpperCase();

      // Input in team name? OR Input in team nickname OR Input in team location
      if(name.includes(teamInput.toUpperCase())     ||
         nickname.includes(teamInput.toUpperCase()) ||
         city.includes(teamInput.toUpperCase()))
      {
        console.log('match found');
        // Yes, capture that index
        teamIndex = index;
        teamName  = team.name + ' ' + team.nickname;
      }
    });

    // teamIndex still null AND input length still greater than 2?
    if(teamIndex === null && teamInput.length > 2)
    {
      // Yes, remove a character from teamInput and try again
      return Utilities.findTeamFromSearch(teamList, teamInput.slice(0, -1));
    }
    else if(teamIndex === null)
    {
      // No, length is less than 3... set index as error string
      return teamError;
    }
    else
    {
      // Return index
      return {index: teamIndex, name: teamName};
    }
  },
  
  
  
  // --------------------------------------------------
  // Name: verifyTeamPlayers
  // Abstract: Returns new array with players verified on team
  //           Eliminates trade players still on list
  // --------------------------------------------------
  verifyTeamPlayer: (playerList, teamID) =>
  {
    let teamPlayerList = playerList.filter((player) => {
      return player.team_id === teamID;
    });

    return teamPlayerList;
  }

};

export default Utilities;
