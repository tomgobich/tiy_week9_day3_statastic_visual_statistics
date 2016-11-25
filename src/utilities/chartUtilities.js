import $ from 'jquery';

let ChartUtilities =
{

  // --------------------------------------------------
  // Name: getPlayerNames
  // Abstract: Returns array with only player name info
  //           Excludes null valued fields
  // --------------------------------------------------
  getLineChartLabels(players, field)
  {
    let names = [];

    players.forEach(player => 
    {
      if(player[field] !== null && player[field] !== undefined) names.push(player.name);
    })

    return names;
  },



  // --------------------------------------------------
  // Name: getPlayerField
  // Abstract: Returns array with only player field info
  //           Excludes null valued fields
  // --------------------------------------------------
  getLineChartData(players, field)
  {
    let dataArray = [];

    players.forEach(player => 
    {
      if(player[field] !== null && player[field] !== undefined) dataArray.push(player[field]);
    })

    return dataArray;
  },



  // --------------------------------------------------
  // Name: getPlayerMinuteAverage
  // Abstract: Returns array with only player minute average info
  //           Excludes null average minute players
  // --------------------------------------------------
  getPieChartData(players, field)
  {
    let dataArray = [];

    // Populate dataArray values
    players.forEach(player =>
    {
      // Field data have a value?
      if(player[field] !== null && player[field] !== undefined)
      {
        // Yes, build dataObject
        let dataObject = {
          name: player.name,
          y: player[field]
        }

        // Add dataObject to dataArray
        dataArray.push(dataObject);
      }
    })

    // Return completed dataArray
    return dataArray;
  },



  // --------------------------------------------------
  // Name: getPlayerGameStatNames
  // Abstract: Returns array of player names who have 
  //           data in Player Averages Per Game Chart
  // --------------------------------------------------
  getPlayerGameStatNames(players)
  {
    let names = [];
    
    players.forEach((player, index) =>
    {
      // Eliminate players names whose data won't be shown
      if(player.average_points    !== null  && player.average_points    !== undefined &&
         player.average_assists   !== null  && player.average_assists   !== undefined &&
         player.average_steals    !== null  && player.average_steals    !== undefined &&
         player.average_rebounds  !== null  && player.average_rebounds  !== undefined &&
         player.average_blocks    !== null  && player.average_blocks    !== undefined)
      {
        // Push player name into name array
        names.push(player.name);
      }
    })

    // Return completed names
    return names;
  },



  // --------------------------------------------------
  // Name: getPlayerGameStats
  // Abstract: Returns array of objects holding data for column graph
  // --------------------------------------------------
  getPlayerGameStats(players)
  {
    let dataArray = [];
    let averagePoints   = {name: 'Average Points Per Game',   data: []};
    let averageAssists  = {name: 'Average Assists Per Game',  data: []};
    let averageSteals   = {name: 'Average Steals Per Game',   data: []};
    let averageRebounds = {name: 'Average Rebounds Per Game', data: []};
    let averageBlocks   = {name: 'Average Blocks Per Game',   data: []};


    players.forEach((player, index) =>
    {
      // Prevent bad data from blocking graph from showing... none shall pass!!!
      if(player.average_points    !== null  && player.average_points    !== undefined &&
         player.average_assists   !== null  && player.average_assists   !== undefined &&
         player.average_steals    !== null  && player.average_steals    !== undefined &&
         player.average_rebounds  !== null  && player.average_rebounds  !== undefined &&
         player.average_blocks    !== null  && player.average_blocks    !== undefined)
      {
        // Load data into appropriate data array
        averagePoints.data.push(player.average_points);
        averageAssists.data.push(player.average_assists);
        averageSteals.data.push(player.average_steals);
        averageRebounds.data.push(player.average_rebounds);
        averageBlocks.data.push(player.average_blocks);
      }
    })

    // Push all the data
    dataArray.push(averagePoints);
    dataArray.push(averageAssists);
    dataArray.push(averageSteals);
    dataArray.push(averageRebounds);
    dataArray.push(averageBlocks);

    // Return completed dataArray
    return dataArray;
  },

};

export default ChartUtilities;
