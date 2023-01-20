import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import defaultImage from "../../assets/images/placeholder.png";
import { roleMap } from "../../utils/constants";

const TeacherProfileCard = () => {
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
            teacher
          </p>
        </div>
        <div>
          <h3>Username:</h3>
          <p>teacher</p>
        </div>
        <div>
          <h3>Email:</h3>
          <p>email</p>
        </div>
        <div>
          <h3>Designation Name:</h3>
          <p>name</p>
        </div>
        <div>
          <h3>Phone Number:</h3>
          <p>phone</p>
        </div>
        <div>
          <h3>Status:</h3>
          <p>status</p>
        </div>
        <div>
          <h3>Department:</h3>
          <p>department</p>
        </div>
        <div>
          <h3>Address:</h3>
          <p>address</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileCard;
