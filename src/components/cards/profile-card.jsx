import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import defaultImage from "../../assets/images/placeholder.png";
import { roleMap } from "../../utils/constants";

const ProfileCard = ({ type = "super-admin" }) => {
  const { user } = useAppContext();
  return (
    <div className="profile-card-wrapper">
      <div className="profile-card-image">
        <img src={user.image || defaultImage} alt="" />
      </div>
      {type === "teacher" && (
        <div className="profile-card-content">
          <div>
            <h3>Full Name:</h3>
            <p>
              {user?.firstname} {user?.surname} {user?.middlename}
            </p>
          </div>
          <div>
            <h3>Assigned Class:</h3>
            <p>{user?.class_assigned}</p>
          </div>
          <div>
            <h3>Sub-Class:</h3>
            <p>{user?.sub_class}</p>
          </div>
          <div>
            <h3>Class Population:</h3>
            <p>{user?.class_population}</p>
          </div>
          <div>
            <h3>Campus:</h3>
            <p>{user?.school?.schname}</p>
          </div>
          <div>
            <h3>Period:</h3>
            <p>
              {user?.period}/{user?.term} {user?.session}
            </p>
          </div>
        </div>
      )}
      {type === "super-admin" && (
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
      )}
      {type === "principal" && (
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
      )}

      {type === "student-home" && (
        <div className="profile-card-content">
          <div>
            <h3>Full Name:</h3>
            <p>
              {user?.firstname} {user?.surname} {user?.middlename}
            </p>
          </div>
          <div>
            <h3>Assigned Class:</h3>
            <p>{user?.present_class}</p>
          </div>
          <div>
            <h3>State:</h3>
            <p>{user?.state}</p>
          </div>
          <div>
            <h3>Admission Number:</h3>
            <p>{user?.admission_number}</p>
          </div>
          <div>
            <h3>Gender:</h3>
            <p>{user?.gender}</p>
          </div>
          <div>
            <h3>Session:</h3>
            <p>{user?.session_admitted}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
