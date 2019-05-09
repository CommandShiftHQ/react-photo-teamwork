import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import '../css/image-browser.css';

// library.add(faComment, faHeart);
library.add(fas, far);

const URL = 'http://mcr-codes-image-sharing-api.herokuapp.com/images';

class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      error: false,
    };
  }

getImages = () => {
  axios.get(URL)
    .then(response => {
      this.setState({ images: response.data });
      console.log(this.state);
    })
    .catch(() => {
      this.setState({ error: true });
      alert('Error. Please try again');
    });
};

componentDidMount() {
  this.getImages();
}

render() {
  return (
    <div className="image-grid">
      {this.state.images.map(image => {
        return (
          <div key={image._id} className="thumbnail-image">
            <div className="image-frame">
              <img src={image.thumb} />
            </div>
            <Link to={`/image/${image._id}`} key={image._id}>
              <div className="thumbnail-stats">
                <span>
                  <FontAwesomeIcon icon={['fas', 'comment']} className="icon" />
                  {image.comments.length}
                </span>
                <span>
                  <FontAwesomeIcon icon={['fas', 'heart']} className="icon" />
                  {image.likes}
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
}

export default ImageBrowser;
