import React, { Component } from 'react';

class TeamSubmitForm extends Component {

	teamSubmit(e) {
		e.preventDefault();

		const teamSearch = this.teamSearch.value;

		this.props.teamSubmit(teamSearch);
		this.teamSubmitForm.reset();
	}

  render() {
    return (
      <form ref={(input) => this.teamSubmitForm = input} className="navbar-form navbar-form" onSubmit={(e) => this.teamSubmit(e)}>
        <div className="form-group">
          <input ref={(input) => this.teamSearch = input} 
          			 className="form-control col-sm-8" 
          			 type="text" 
          			 placeholder="Enter NBA Team..."  />
        </div>
      </form>
    )
  }
}

export default TeamSubmitForm;