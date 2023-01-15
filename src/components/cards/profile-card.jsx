import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import defaultImage from "../../assets/images/placeholder.png";
import { roleMap } from "../../utils/constants";

const ProfileCard = () => {
  const { user } = useAppContext();
  return (
    <div className="profile-card-wrapper">
      <div className="profile-card-image">
        <img src={user.image || defaultImage} alt="" />
      </div>
      <div className="profile-card-content">
        <div>
          <h3>Full Name:</h3>
          <p>
            {user.firstname} {user.surname} {user.middlename}
          </p>
        </div>
        <div>
          <h3>Username:</h3>
          <p>{user.username}</p>
        </div>
        <div>
          <h3>Email:</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Designation Name:</h3>
          <p>{roleMap[user.designation_name]}</p>
        </div>
        <div>
          <h3>Phone Number:</h3>
          <p>{user.phoneno}</p>
        </div>
        <div>
          <h3>Status:</h3>
          <p>{user.status}</p>
        </div>
        <div>
          <h3>Department:</h3>
          <p>{user.department}</p>
        </div>
        <div>
          <h3>Address:</h3>
          <p>{user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
