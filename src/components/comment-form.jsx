import React from 'react';
import '../css/comment-form.css';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      newComment: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.newComment);
    this.props.handleAddComment(this.state.newComment);
  };

  render() {
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Add a comment..." value={this.state.newComment} onChange={this.handleChange} />
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
