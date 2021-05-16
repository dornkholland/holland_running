import React, { useEffect } from "react";
import "./AvailabilityForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../../store/appointment";

const AvailabilityForm = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.calendar.date);
  const handleAvailability = async (e) => {
    e.preventDefault();
    const timezone = date.getTimezoneOffset() - (date.getTimezoneOffset() % 30);
    const data = await dispatch(addAppointment(date, e.target.value, timezone));
  };
  if (!date) return null;
  return (
    <>
      <h1>Set your availability here: </h1>
      <form action="">
        <ul className="availForm">
          {[...Array(24).keys()].map((hour) => (
            <li key={hour}>
              <div>
                <button onClick={handleAvailability} value={`${hour}:00`}>
                  {hour}:00
                </button>
              </div>
              <div>
                <button onClick={handleAvailability} value={`${hour}:30`}>
                  {hour}:30
                </button>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default AvailabilityForm;
