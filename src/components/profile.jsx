import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/profile.css';

const container = {
  display: 'flex',
  flex: 'wrap',
  background: 'white',
  padding: '5px',
  'justify-content': 'center',
};

const imagesInUser = {
  width: '80px',
  height: '80px',
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
        <div className="name">
          Name: {this.state.user.firstName} {this.state.user.lastName}
        </div>
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
