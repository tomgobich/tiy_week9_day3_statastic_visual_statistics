import React, { Component } from 'react';
import $ from 'jquery';
import ReactHighcharts from 'react-highcharts';
import ChartUtilities from '../utilities/chartUtilities';


class PlayerCharts extends Component {

  loadPlayerData()
  {
  	let players = this.props.data;
  	let playerStats = this.props.stats;
  	let playerData = [];

  	players.forEach(player =>
  	{
  		let playerObject = {
  			id: player.id,
  			name: player.name,
  			salary: player.salary,
  		};

  		playerStats.forEach(stat =>
  		{
  			if(stat.player_id === playerObject.id)
  			{
  				playerObject.average_minutes = stat.average_minutes;
  			}
  		})

  		playerData.push(playerObject);
  	})

  	return playerData;
  }



  render() {

  	let playerData = this.loadPlayerData();

  	console.log(playerData);

  	let playerSalaryNames 	= ChartUtilities.getPlayerSalaryNames(playerData);
  	let playerSalaries 			= ChartUtilities.getPlayerSalaries(playerData);
  	// let playerMinuteNames		= ChartUtilities.getPlayerMinuteNames(playerData);
  	let playerMinuteAverage = ChartUtilities.getPlayerMinuteAverage(playerData);

    let salaryChart = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Player Salaries'
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

  	

  	// Currently just prints out each players name OR salary depending on array passed in
    return (
     <div className="charts">
     	<ReactHighcharts config={salaryChart} />
     </div>
    )
  }
}

export default PlayerCharts;