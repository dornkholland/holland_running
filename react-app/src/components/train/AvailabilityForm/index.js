import React, { useEffect } from "react";
import "./AvailabilityForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addAvailability,
  removeAvailability,
} from "../../../store/appointment";

const AvailabilityForm = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.calendar.date);
  const formattedDate = date.toISOString().substring(0, 10);

  const available = useSelector(
    (state) => state.appointment.appointments.available
  );
  const booked = useSelector((state) => state.appointment.appointments.booked);
  const timezone = date.getTimezoneOffset() - (date.getTimezoneOffset() % 30);
  const handleAvailability = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      addAvailability(date, e.target.value, timezone)
    );
  };
  const handleRemoval = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      removeAvailability(date, e.target.value, timezone)
    );
  };
  const handleBooked = async (e) => {
    e.preventDefault();
  };

  if (!date || available === null || booked === null) return null;
  return (
    <>
      <h1>Set your availability here: </h1>
      <form action="">
        <ul className="availForm">
          {[...Array(24).keys()].map((hour) => (
            <li key={hour}>
              {(booked[formattedDate] &&
                booked[formattedDate][`0${hour}:00`]) ||
              (booked[formattedDate] && booked[formattedDate][`${hour}:00`]) ? (
                <button className="blue" onClick={handleBooked}>
                  {hour}:00
                </button>
              ) : (
                <div>
                  {available[`0${hour}:00`] || available[`${hour}:00`] ? (
                    <button
                      onClick={handleRemoval}
                      value={`${hour}:00`}
                      style={{ color: "green" }}
                      className="green"
                    >
                      {hour}:00
                    </button>
                  ) : (
                    <button
                      onClick={handleAvailability}
                      value={`${hour}:00`}
                      className="red"
                    >
                      {hour}:00
                    </button>
                  )}
                </div>
              )}
              {(booked[formattedDate] &&
                booked[formattedDate][`0${hour}:30`]) ||
              (booked[formattedDate] && booked[formattedDate][`${hour}:30`]) ? (
                <button className="blue" onClick={handleBooked}>
                  {hour}:30
                </button>
              ) : (
                <div>
                  {available[`0${hour}:30`] || available[`${hour}:30`] ? (
                    <button
                      onClick={handleRemoval}
                      value={`${hour}:30`}
                      className="green"
                    >
                      {hour}:30
                    </button>
                  ) : (
                    <button
                      onClick={handleAvailability}
                      value={`${hour}:30`}
                      className="red"
                    >
                      {hour}:30
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default AvailabilityForm;
