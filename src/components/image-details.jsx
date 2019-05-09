import React from 'react';
import Image from './image';
import Comments from './comments';
import axios from 'axios';

const URL = 'http://mcr-codes-image-sharing-api.herokuapp.com';

class ImageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: '',
      user: {},
      src: '',
      thumb: '',
      caption: '',
      tags: [],
      comments: [],
      timestamp: 0,
      likes: 0,
      isLiked: false,
    };
  }

  handleLike = () => {
    this.setState({
      isLiked: !this.state.isLiked,
    });
  };

  handleCommentSubmit = (comment) => {
    this.state.comments.push(comment);
  };

  componentDidMount() {
    axios.get(`${URL}/images/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          user: response.data.user,
          src: response.data.src,
          thumb: response.data.thumb,
          caption: response.data.caption,
          tags: response.data.tags,
          comments: response.data.comments,
          timestamp: response.data.timestamp,
          likes: response.data.likes,
          isLiked: response.data.isLiked,
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props.match);
    const {
      imageId,
      user,
      src,
      thumb,
      caption,
      tags,
      comments,
      timestamp,
      likes,
      isLiked,
    } = this.state;

    if (!comments) {
      return <h1>loading...</h1>;
    };

    return (
      <div>
        <Image src={src} user={user.firstName} />
        <Comments
          comments={comments}
          isLiked={isLiked}
          onLike={this.handleLike}
          onSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default ImageDetails;
