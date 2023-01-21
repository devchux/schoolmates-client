import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import defaultImage from "../../assets/images/placeholder.png";

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
            okere christian
          </p>
        </div>
        <div>
          <h3>Assigned Class:</h3>
          <p>Basic 3 </p>
        </div>
        <div>
          <h3>Sub-Class:</h3>
          <p>Ruby</p>
        </div>
        <div>
          <h3>Class Population:</h3>
          <p>25</p>
        </div>
        <div>
          <h3>Campus:</h3>
          <p>Penny International College</p>
        </div>
        <div>
          <h3>Period:</h3>
          <p>Second Half/Second Term 2022/2023</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileCard;
