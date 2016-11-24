import React, { Component } from 'react';

class Player extends Component {
  render() {
  	// Table Structure:
  	// No. | Name | Position | College | Height | Salary
    return (
      <tr>
	      <td>{this.props.data.uniform_number}</td>
	      <th>{this.props.data.name}</th>
	      <td>{this.props.data.position_abbreviation 	=== null ? "Unknown" 		: this.props.data.position_abbreviation}</td>
	      <td>{this.props.data.school 								=== null ? "No College" : this.props.data.school}</td>
	      <td>{this.props.data.height 								=== null ? "Unkown" 		: this.props.data.height + '"'}</td>
	      <td>{this.props.data.salary 								=== null ? "Uknown" 		: '$' + this.props.data.humanized_salary}</td>
	    </tr>
    )
  }
}

export default Player;