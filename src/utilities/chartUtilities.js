import $ from 'jquery';

let ChartUtilities =
{

  // --------------------------------------------------
  // Name: getNBATeams
  // Abstract: Gets NBA team's roster
  // --------------------------------------------------
  // Get array with only player name info
  // Excludes null salary valued players
  getPlayerSalaryNames(players)
  {
    let names = [];

    players.forEach(player => 
    {
      if(player.salary !== null)
      {
        names.push(player.name);
      }
    })

    return names;
  },

  // Get array with only player salary info
  // Excludes null salary valued players
  getPlayerSalaries(players)
  {
    let salaries = [];

    players.forEach(player => 
    {
      let salary = player.salary;

      if(salary !== null)
      { 
        salaries.push(salary);
      }
    })

    return salaries;
  },

  getPlayerMinuteNames(players)
  {

  },

  // Get array with only player's average minutes
  // Ordered the same 
  getPlayerMinuteAverage(players)
  {
    
  }

};

export default ChartUtilities;
