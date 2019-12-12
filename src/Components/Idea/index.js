import React, {Component} from 'react';

// Idea
export default class Idea extends Component {
  
  handleEditIdeaClick = () => {
    this.props.onEditIdeaClick();
  }

  handleDeleteIdeaClick = () => {
    this.props.onDeleteIdeaClick(this.props.id);
  }

  render(){
    return (
      <div className="idea-card">
        <div 
          className="content"
        >
          <p>{this.props.created_date}</p>
          <h3 onClick={this.handleEditIdeaClick}>{this.props.title}</h3>
          <h5 onClick={this.handleEditIdeaClick}>{this.props.body}</h5>
        </div>
        <div className="buttonGroup">
          <button onClick={this.handleDeleteIdeaClick} className="btn no-bg">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }
}