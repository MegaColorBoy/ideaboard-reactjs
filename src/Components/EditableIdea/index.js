import React, {Component} from 'react';
import Idea from '../Idea';
import IdeaForm from '../IdeaForm';

// EditableIdea
export default class EditableIdea extends Component {
  
  state = {
    isEditMode: false
  }

  openIdeaForm = () => {
    this.setState({
      isEditMode: true
    });
  }

  closeIdeaForm = () => {
    this.setState({
      isEditMode: false
    })
  }

  handleSubmit = (attrs) => {
    if(attrs.title === "" && attrs.body === "") {
      attrs.title = "New title";
      attrs.body = "Write something here..";
    }
    this.props.onFormSubmit(attrs);
    this.closeIdeaForm();
  }

  handleDeleteIdeaClick = (id) => {
    this.props.onDeleteIdeaClick(id);
  }

  render() {
    const {isEditMode} = this.state;
    const {id, title, body, created_date} = this.props;

    if(!isEditMode) {
      return (
        <Idea
          key={"idea-" + id}
          id={id}
          title={title}
          body={body}
          created_date={created_date}
          onEditIdeaClick={this.openIdeaForm}
          onDeleteIdeaClick={this.handleDeleteIdeaClick}
        />
      );
    }
    else {
      return (
        <IdeaForm
          title={title}
          body={body}
          created_date={created_date}
          id={id}
          onFormSubmit={this.handleSubmit}
        />
      );
    }
  }
}