import React, { Component } from 'react';
import Player from './Player';

class Roster extends Component {
	render() {
		return (
			<div className="roster">
				<div className="col-xs-12 roster">
					<h3 className="section-title">Roster</h3>
	        <div className="table-responsive">
	        	<table className="table table-sm table-striped">
						  <thead className="thead-inverse roster-table-head">
						    <tr>
						      <th>No.</th>
						      <th>Name</th>
						      <th>Position</th>
						      <th>College</th>
						      <th>Height</th>
						      <th>Salary</th>
						    </tr>
						  </thead>
						  <tbody>
						    {
						    	this.props.roster.map((player, index) => {
						    		// Player currently active member of team?
						        if(player.active) {
						        	// Yes, display player
						        	return <Player key={player.id} data={player} />
						        }
						      })
						  	}
						  </tbody>
						</table>
	        </div>
	      </div>
			</div>
		)
	}
}

export default Roster;