import React from 'react';
import Image from './image';
import ImageInfo from './image-info';
import TokenManager from '../utils/token-manager';
import axios from 'axios';
import '../css/image-details.css';

const URL = 'http://mcr-codes-image-sharing-api.herokuapp.com';

class ImageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      src: '',
      thumb: '',
      caption: '',
      tags: [],
      comments: [],
      timestamp: 0,
      likes: 0,
      isLiked: true,
    };
  }

  handleLike = () => {
    // this.setState({
    //   isLiked: !this.state.isLiked,
    // });
    console.log('clicked');
  };

  handleCommentSubmit = (comment) => {
    if (TokenManager.isTokenValid()) {
      const token = TokenManager.getTokenPayload();
      const authorizationToken = TokenManager.getToken();
      
      // const postData = {
      //   comments: {
      //     content: comment,
      //     timestamp: token.iat,
      //     author: {
      //       avatar: token.avatar,
      //       bio: token.bio,
      //       firstName: token.firstName,
      //       lastName: token.lastName,
      //       _id: token._id,
      //     },
      //   },
      // };

      const postData = {
        content: comment,
      };

      const axiosHeaders = {
        headers: {
          Authorization: authorizationToken,
        },
      };
      axios.post(
        `${URL}/images/${this.props.match.params.id}/comments`,
        postData, axiosHeaders
      )
        .then(response => {
          this.getAPIInfo();
        })
        .catch(error => {
          console.log(error, 'error');
        });
    } else {
      console.log('Not authorised to do this action');
    }
  };

  getAPIInfo = () => {
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAPIInfo();
  }

  render() {
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
      <div className="imageDetails">
        <Image src={src} firstName={user.firstName} lastName={user.lastName} likes={likes} handleClick={this.handleLike} />
        <ImageInfo
          user={user}
          comments={comments}
          isLiked={isLiked}
          onLike={this.handleLike}
          handleAddComment={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default ImageDetails;
