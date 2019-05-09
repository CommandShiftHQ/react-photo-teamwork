import React from 'react';
import '../css/profile-name.css';

const ProfileName = (props) => {
  return (
    <div className="profile-name">
      <div className="name">{props.user.firstName} {props.user.lastName}</div>
    </div>
  );
};
export default ProfileName;
