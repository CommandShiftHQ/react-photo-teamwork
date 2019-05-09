import React from 'react';
import axios from 'axios';
import TokenManager from '../utils/token-manager';

const URL = 'http://mcr-codes-image-sharing-api.herokuapp.com/images';

class ImageUpload extends React.Component {
  state = {
    caption: '',
    tags: [],
    image: '',
  };

  handleCaptionChange = (event) => {
    this.setState({
      caption: event.target.value,
    });
  };

  handleTagsChange = (event) => {
    this.setState({
      tags: event.target.value.split(' '),
    });
  };

  handleImageChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('caption', this.state.caption);
    formData.append('tags', this.state.tags);
    formData.append('image', this.state.image);
    const config = {
      headers: {
        'authorization': TokenManager.getToken(),
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(URL, formData, config)
      .then((response) => {
        this.props.history.push(`/image/${response.data._id}`);
      })
      .catch(() => {
        alert(`can't upload image!`);
      });
  };

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
          Image caption
          <input name="caption" type="text" onChange={(event) => this.handleCaptionChange(event)} />
        </label>
        <label>
          Tags, separated by spaces
          <input name="tags" type="text" onChange={(event) => this.handleTagsChange(event)} />
        </label>
        <label>
          Choose image file
          <input name="image" type="file" accept="image/png, image/jpeg, image/gif" onChange={(event) => this.handleImageChange(event)} />
        </label>
        <button value="submit">
          Upload image
        </button>
      </form>
    );
  }
}

export default ImageUpload;
