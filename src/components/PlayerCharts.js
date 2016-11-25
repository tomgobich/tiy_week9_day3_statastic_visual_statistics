import React, { Component } from 'react';
import $ from 'jquery';
import Highcharts from 'react-highcharts';
import ChartUtilities from '../utilities/chartUtilities';


class PlayerCharts extends Component {

	// Returns data needed by view in one array
	// This keeps info in same order throughout
  loadPlayerData()
  {
  	let players = this.props.data;
  	let playerStats = this.props.stats;
  	let playerData = [];

  	// Loop through players array
  	players.forEach(player =>
  	{
  		// Build data object
  		let playerObject = {
  			id: player.id,
  			name: player.name,
  			salary: player.salary,
  		};

  		// Loop through player stats array
  		playerStats.forEach(stat =>
  		{
  			// Find currently looped player's stats
  			if(stat.player_id === playerObject.id)
  			{
  				// Save that data into our new object
  				playerObject.average_minutes 	= stat.average_minutes;
  				playerObject.average_points		= stat.average_points;
  				playerObject.average_rebounds	= stat.average_rebounds;
  				playerObject.average_steals		= stat.average_steals;
  				playerObject.average_assists	= stat.average_assists;
  				playerObject.average_blocks		= stat.average_blocks;
  			}
  		})

  		// Push new object into playerData array
  		playerData.push(playerObject);
  	})

  	// Return array of needed player data
  	return playerData;
  }



  render() {

  	const SALARY_FIELD 					= 'salary';
  	const AVERAGE_MINUTES_FIELD = 'average_minutes';

  	let playerData 							= this.loadPlayerData();

  	let playerSalaryNames 			= ChartUtilities.getLineChartLabels(playerData, SALARY_FIELD);
  	let playerSalaries 					= ChartUtilities.getLineChartData(playerData, SALARY_FIELD);
  	let playerAverageMinute 		= ChartUtilities.getPieChartData(playerData, AVERAGE_MINUTES_FIELD);
  	let playerGameStatNames			= ChartUtilities.getPlayerGameStatNames(playerData);
  	let playerGameStats					= ChartUtilities.getPlayerGameStats(playerData);

  	console.log(playerGameStats);

  	// Set parameters for salary chart
    let salaryChart = {
      chart: {
          type: 'line'
      },
      title: {
        text: 'Player Salaries',
        style: {'fontFamily': '"Exo 2", sans-serif'}
      },
      labels: {
      	style: {'fontFamily': '"Exo 2", sans-serif'}
      },
      xAxis: {
        categories: playerSalaryNames
      },
      yAxis: {
        title: {
            text: 'Salary in USD'
        }
      },
      series: [{
        name: 'Player Salaries',
        data: playerSalaries
      }]
    }

    let averageMinuteChart = {
    	chart: {
    		type: 'pie'
    	},
    	title: {
    		text: 'Player Average Minute Distribution',
    		style: {'fontFamily': '"Exo 2", sans-serif'}
    	},
    	tooltip: {
    		pointFormat: '{point.percentage: .1f} %',
    	},
    	plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage: .1f} %',
            style: {
            	color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
	    	name: 'Player Average Minutes',
	    	colorByPoint: true,
	    	data: playerAverageMinute,
	    	dataLabels: {
        	style: {'fontFamily': '"Exo 2", sans-serif', 'fontWeight': 'normal'}
	    	}
	    }]
    }

    // Set parameters for salary chart
    let playerGameStatsConfig = {
      chart: {
          type: 'column'
      },
      title: {
        text: 'Player Averages per Game',
        style: {'fontFamily': '"Exo 2", sans-serif'}
      },
      labels: {
      	style: {'fontFamily': '"Exo 2", sans-serif'}
      },
      xAxis: {
        categories: playerGameStatNames,
        crosshair: true
      },
      yAxis: {
      	min: 0,
        title: {
            text: 'Average Numbers'
        }
      },
      series: playerGameStats
    }

  	

  	// Currently just prints out each players name OR salary depending on array passed in
    return (
     <div className="charts">
     	<div className="row">
     		<div className="col-xs-12 col-lg-6 chart">
     			<Highcharts config={salaryChart} />
     		</div>
     		<div className="col-xs-12 col-lg-6 chart">
     			<Highcharts config={averageMinuteChart} />
     		</div>
     		<div className="col-xs-12 chart">
     			<Highcharts config={playerGameStatsConfig} />
     		</div>
     	</div>
     </div>
    )
  }
}

export default PlayerCharts;