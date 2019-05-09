import React from 'react';
import axios from 'axios';

const container = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const imagesInUser = {
  width: '150px',
  height: '100px',
};

const URL = 'http://mcr-codes-image-sharing-api.herokuapp.com/users/';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        images: [],
      },
    };
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  getProfileInfo = () => {
    axios.get(`${URL}/${this.props.id}`).then(response => {
      this.setState({
        user: response.data,
      });
    });
  };

  render() {
    return (
      <div className="profile-info">
        <div className="Name">
          Name: {this.state.user.firstName} {this.state.user.lastName}
        </div>
        <div className="bio">Bio: {this.state.user.bio} </div>
        <img src={this.state.user.avatar} height="150" width="150 " />
        <div style={container}>
          {this.state.user.images.map(image => (
            <img style={imagesInUser} key={image._id} src={image.src} />
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
