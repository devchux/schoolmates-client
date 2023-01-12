import React from "react";
import defaultImage from "../../assets/images/placeholder.png";

const ProfileImage = ({ src, alt, wrapperClassName }) => {
  return (
    <div className={`profile-image-wrapper ${wrapperClassName || ""}`}>
      <img src={src || defaultImage} alt={alt || ""} />
    </div>
  );
};

export default ProfileImage;
