import React from 'react'

const ResultHeader = ({ user }) => {
  return (
    <div className="school-details">
      <div className="image">
        {user?.school?.schlogo && (
          <img src={user?.school?.schlogo} alt="school" />
        )}
      </div>
      <div className="text">
        <h3 className="name">{user?.school?.schname}</h3>
        {user?.school?.schnmotto && (
          <p className="motto">({user?.school?.schnmotto})</p>
        )}

        <p className="address">{user?.school?.schaddr}</p>
        <p className="tel">Tel: {user?.school?.schphone}</p>
        <p className="email">Email: {user?.school?.schemail}</p>
        <p className="web">Website: {user?.school?.schwebsite}</p>
      </div>
    </div>
  )
}

export default ResultHeader