import React, {Component} from 'react';

// IdeaForm
export default class IdeaForm extends Component {

  timeoutID;
  characterLimit = 140;

  state = {
    title: this.props.title || '',
    body: this.props.body || '',
    characterCount: 0,
    isManagingFocus: false
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleBodyChange = (e) => {
    this.setState({
      body: e.target.value,
      characterCount: e.target.value.length
    });
  }

  handleSubmit = () => {
    let ideaId = this.props.id ? this.props.id : '';
    this.props.onFormSubmit({
      id: ideaId,
      title: this.state.title,
      body: this.state.body
    });
  }

  handleBlur = () => {
    this.timeoutID = setTimeout(() => {
      if(this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: false,
        }, () => {this.handleSubmit()});
      }
    }, 0);
  }

  handleFocus = () => {
    clearTimeout(this.timeoutID);
    if(!this.state.isManagingFocus) {
      this.setState({
        isManagingFocus: true,
      });
    }
  }

  componentDidMount = () => {
    this.titleInput.focus();
    this.setState({
      characterCount: this.state.body.length
    });
  }

  render() {
    return(
      <div className="idea-card idea-form" onBlur={this.handleBlur} onFocus={this.handleFocus}>
        <div>
          <p>{this.props.created_date}</p>
          <textarea
            className="titleBox"
            ref={(input) => {this.titleInput = input;}}
            type="text"
            placeholder="Enter title"
            onChange={this.handleTitleChange}
            value={this.state.title}
          >
          </textarea>
          <textarea 
            className="bodyBox"
            ref={(input) => {this.bodyInput = input;}}
            placeholder="Write something here..."
            maxLength="140"
            onChange={this.handleBodyChange}
            value={this.state.body}
          >
          </textarea>
          {
            this.state.characterCount >= 125
            ? <p>{(this.characterLimit - this.state.characterCount) + " characters left."}</p>
            : null
          }
        </div>
      </div>
    );
  }
}