import React from 'react';
import '../css/image.css';


const Image = ({ src }) => {
  return (
    <div className="imageDiv">
      <img src={src} className="image" />
    </div>
  );
};

export default Image;
