import React, { Component } from 'react';

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

  	let playerNames 		= this.getPlayerNames();
  	let playerSalaries 	= this.getPlayerSalaries();

  	// Currently just prints out each players name OR salary depending on array passed in
    return (
     <div className="charts">
     	{ 
	    	playerNames.map((player, index) => {
	    		return <p key={index}>{player}</p>
	      })
	  	}
     </div>
    )
  }
}

export default PlayerCharts;