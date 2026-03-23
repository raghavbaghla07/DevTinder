import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm my-11">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p> {age + " , " + gender}</p>}
        <p>{about}</p>

        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary bg-blue-500">ignore</button>
          <button className="btn btn-secondary bg-pink-600">interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
