import React, { Component } from 'react';
import $ from 'jquery';
import Chart from 'react-chartjs';


class PlayerCharts extends Component {

  getPlayerNames()
  {
  	let players = this.props.data;
  	let names = [];

  	players.forEach(player => {
  		names.push(player.name);
  	})

  	return names;
  }

  // Get array with only player salary info
  getPlayerSalaries()
  {
    let players = this.props.data;
    let salaries = [];

    players.forEach(player => {
      let salary = player.salary;

      if(salary === null) { salary = 0 };

      salaries.push(salary);
    })

    console.log({players, salaries});

    return salaries;
  }



  render() {

  	let LineChart = Chart.Line;

  	let ctx = $('#myChart');

  	let playerNames 		= this.getPlayerNames();
  	let playerSalaries 	= this.getPlayerSalaries();
  	let data = { 
  		labels: playerNames,
  		datasets: [
  			{
  				data: playerSalaries
  			}
  		]
  	}

  	let options = {
  		responsive: true
  	}

  	

  	// Currently just prints out each players name OR salary depending on array passed in
    return (
     <div className="charts">
     	<LineChart data={data} options={options} />
     </div>
    )
  }
}

export default PlayerCharts;