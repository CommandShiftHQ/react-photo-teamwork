import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      clickImage: false,
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
      // console.log(this.state.user.images);
    });
  };

  componentDidMount() {
    this.getProfileInfo();
  }

  clickedImage = () => {
    // console.log('this is being called');
    this.setState({ clickImage: true });
  };

  render() {
    // console.log(this.state.clickImage);
    return (
      <div className="profile-info">
        <div className="Name">
          Name: {this.state.user.firstName} {this.state.user.lastName}
        </div>
        <div className="bio">Bio: {this.state.user.bio} </div>
        <img src={this.state.user.avatar} height="150" width="150 " />
        <div style={container}>
          {this.state.user.images.map(image => (
            <Link to={`/image/${image._id}`} key={image._id}>
              <img style={imagesInUser} src={image.src} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
