import React from 'react';
import Image from './image';
import Comments from './comments';
import Likes from './likes';
import axios from 'axios';
import TokenManager from '../utils/token-manager';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/image-details.css';

library.add(faComment, faHeart);

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

  handleCommentLike = () => {
    this.setState({
      isLiked: !this.state.isLiked,
    });
  };

  handleCommentSubmit = (comment) => {
    const URL2 = `http://mcr-codes-image-sharing-api.herokuapp.com/images/${this.state.imageId}/comments`;
    const config = {
      headers: {
        authorization: TokenManager.getToken(),
        'content-type': 'application/json',
      },
    };
    axios.post(URL2, { content: comment }, config)
      .then(() => this.apiCall())
      .catch((error) => console.log(error));
  };

  handleImageLike = () => {
    this.setState({
      likes: this.state.likes + 1,
    });
  };

  apiCall = () => {
    axios.get(`${URL}/images/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          user: response.data.user,
          imageId: response.data._id,
          src: response.data.src,
          thumb: response.data.thumb,
          caption: response.data.caption,
          tags: response.data.tags,
          comments: response.data.comments,
          timestamp: response.data.timestamp,
          likes: response.data.likes,
          isLiked: response.data.isLiked,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.apiCall();
  }

  render() {
    console.log('heyhey');
    console.log(this.state);
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
    }

    return (
      <div>
        <Image src={src} user={user.firstName} />
        <span>
          <FontAwesomeIcon icon="comment" className="icon-comment" />
          {comments.length}
        </span>
        <Likes
          likes={likes}
          imageLike={this.handleImageLike}
        />
        <Comments
          className="comments"
          comments={comments}
          isLiked={isLiked}
          onLike={this.handleCommentLike}
          onSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default ImageDetails;
