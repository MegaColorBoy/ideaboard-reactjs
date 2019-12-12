import React, {Component} from 'react';
import uuid from 'uuid';
import useFetch from '../../Hooks/useFetch';
import IdeaBoard from '../IdeaBoard';

// Custom API Hook -- check out /src/Hooks/useFetch.js
const ideasApi = useFetch("http://localhost:3001/ideas");

// IdeaApp
export default class App extends Component {
  state = {
    ideaList: []
  }

  // Save changes to localStorage
  saveChanges = () => {
    localStorage.setItem('ideasCache', JSON.stringify(this.state.ideaList));
  }

  // Submit idea -- Can be used for Add and Edit
  submitIdea = (attrs) => {
    if(attrs.id !== "") {
      this.editIdea(attrs);
    }
    else {
      this.addIdea(attrs);
    }
  }

  // Add ideas
  addIdea = (attrs) => {
    let dt = new Date();
    let newDate = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();

    let newIdea = {
      id: uuid.v4(),
      title: attrs.title,
      body: attrs.body,
      created_date: newDate
    }

    ideasApi.post(newIdea)
    .then(data => {
      this.setState({
        ideaList: this.state.ideaList.concat(newIdea)
      }, () => {this.saveChanges()})
    })
  }

  // Edit ideas
  editIdea = (attrs) => {
    ideasApi.patch(attrs.id, attrs)
    .then(data => {
      this.setState({
        ideaList: this.state.ideaList.map((idea) => {
          if(idea.id === attrs.id) {
            return Object.assign({}, idea, {
              title: attrs.title,
              body: attrs.body
            })
          }
          else {
            return idea;
          }
        })
      }, () => {this.saveChanges()})
    })
  }

  // Delete ideas
  deleteIdea = (id) => {
    ideasApi.del(id)
    .then(data => {
      this.setState({
        ideaList: this.state.ideaList.filter(idea => idea.id !== id)
      }, () => {this.saveChanges()})
    })

  }

  // Fetch all ideas from db
  fetchIdeas = () => {
    ideasApi.get()
    .then(data => {
      this.setState({
        ideaList: data
      }, () => {this.saveChanges()})
    })
  }

  componentDidMount() {
    if(localStorage.getItem('ideasCache') != null) {
      this.setState({
        ideaList: JSON.parse(localStorage.getItem('ideasCache'))
      })
    }
    else {
      this.fetchIdeas();    
    }
  }

  render() {
    const {ideaList} = this.state;
    return (
      <div className="idea-board">
        <IdeaBoard 
          ideaList={ideaList}
          onSubmitIdea={this.submitIdea}
          onDeleteIdea={this.deleteIdea}
        />
      </div>
    );
  }
}