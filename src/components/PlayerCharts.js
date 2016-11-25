import React, { Component } from 'react';
import $ from 'jquery';
import ReactHighcharts from 'react-highcharts';


class PlayerCharts extends Component {

  // Get array with only player salary info
  // Excludes null salary valued players
  getPlayerSalaries()
  {
    let players = this.props.data;
    let salaries = [];

    players.forEach(player => 
    {
      let salary = player.salary;

      if(salary !== null)
      { 
      	salaries.push(salary);
      }
    })

    console.log({players, salaries});

    return salaries;
  }

  // Get array with only player name info
  // Excludes null salary valued players
	getPlayerNames()
  {
  	let players = this.props.data;
  	let names = [];

  	players.forEach(player => 
  	{
  		if(player.salary !== null)
  		{
  			names.push(player.name);
  		}
  	})

  	return names;
  }



  render() {

  	let playerNames 		= this.getPlayerNames();
  	let playerSalaries 	= this.getPlayerSalaries();

    var myChart = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Player Salaries'
        },
        xAxis: {
            categories: playerNames
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
     	<ReactHighcharts config={myChart} />
     </div>
    )
  }
}

export default PlayerCharts;