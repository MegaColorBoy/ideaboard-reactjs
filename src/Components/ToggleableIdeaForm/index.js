import React, {Component} from 'react';
import IdeaForm from '../IdeaForm';

// ToggleableIdeaForm
export default class ToggleableIdeaForm extends Component {
  state = {
    isFormOpen: false
  }

  openForm = () => {
    this.setState({
      isFormOpen: true
    });
  }

  closeForm = () => {
    this.setState({
      isFormOpen: false
    });
  }

  handleSubmit = (attrs) => {
    if(attrs.title === "" && attrs.body === "") {
      attrs.title = "New title";
      attrs.body = "Write something here..";
    }
    this.props.onFormSubmit(attrs);
    this.closeForm();
  }

  render() {
    const {isFormOpen} = this.state;

    if(!isFormOpen) {
      return (
        <button 
          className="toggleButton"
          onClick={this.openForm}
        >
          <i className="fas fa-plus"></i>
          <p>Add a new idea</p>
        </button>
      );
    }
    else {
      return (
        <IdeaForm 
          onFormSubmit={this.handleSubmit}
          closeForm={this.closeForm}
        />
      );
    }
  }
}