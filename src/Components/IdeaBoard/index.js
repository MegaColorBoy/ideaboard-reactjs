import React, {Component} from 'react';
import EditableIdea from '../EditableIdea';
import ToggleableIdeaForm from '../ToggleableIdeaForm';

// IdeaBoard
export default class IdeaBoard extends Component {

  handleSubmit = (attrs) => {
    this.props.onSubmitIdea(attrs);
  }

  handleDeleteIdeaClick = (id) => {
    this.props.onDeleteIdea(id);
  }

  render() {
    const {ideaList} = this.props;
    let sortedIdeas = ideaList.sort((a,b) => {
      a = new Date(a.created_date);
      b = new Date(b.created_date);
      return a - b;
    });

    let ideaComponents = sortedIdeas.map((idea) => (
      <EditableIdea 
        key={"editidea-" + idea.id}
        id={idea.id}
        title={idea.title}
        body={idea.body}
        created_date={idea.created_date}
        onFormSubmit={this.handleSubmit}
        onDeleteIdeaClick={this.handleDeleteIdeaClick}
      />
    ));
    return (
      <div className="idea-list">
        {ideaComponents}
        <ToggleableIdeaForm 
          onFormSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}