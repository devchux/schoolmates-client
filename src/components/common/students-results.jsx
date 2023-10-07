import React from "react";
import ProfileImage from "./profile-image";

const StudentsResults = ({
  studentByClassAndSession,
  isLoading,
  studentData,
  onProfileSelect,
  idWithComputedResult
}) => {
  return (
    <div className="students-wrapper">
      {studentByClassAndSession?.map((x) => (
        <div
          key={x.id}
          onClick={() => {
            onProfileSelect?.(x);
          }}
          className="student"
        >
          <div
            className={`loader ${isLoading ? "is-loading" : ""} ${
              studentData.id === x.id ? "active" : ""
            }`}
          >
            <ProfileImage src={x?.image} alt={x.firstname} />
            {idWithComputedResult.includes(x.id) && (
              <div className="computed" />
            )}
          </div>
          <div>
            <p>{x.firstname}</p>
            <p>{x.surname}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentsResults;
