import React from "react";
import "./AvailabilityForm.css";

const AvailabilityForm = () => {
  return (
    <>
      <h1>Set your availability here: </h1>
      <form action="">
        <ul className="availForm">
          {[...Array(24).keys()].map((hour) => (
            <li key={hour}>
              <div>
                <button>{hour}:00</button>
              </div>
              <div>
                <button>{hour}:30</button>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default AvailabilityForm;
