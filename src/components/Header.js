import React, { Component } from 'react';
import TeamSubmitForm from './TeamSubmitForm';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
	      <div className="container">
	        <div className="navbar-xs">
	          <p className="navbar-brand">Statastic</p>
	          <span className="navbar-brand subtext hidden-sm-down">
	            Fan-tastic Stats!
	          </span>
	          <TeamSubmitForm teamSubmit={this.props.teamSubmit} />
	        </div>
	      </div>
	    </nav>
    )
  }
}

export default Header;