import React from "react";
import { useSelector } from "react-redux";

const AppointmentContainer = () => {
  const booked = useSelector((state) => state.appointment.appointments.booked);

  if (!booked) return null;
  else
    return (
      <>
        <h1>Booked Appointments:</h1>
        <ul>
          {Object.values(booked).map((time) =>
            Object.values(time).map((appointment) => (
              <li>
                <h1>{appointment.date_time}</h1>
                <h1>{appointment.user.first_name}</h1>
                <h1>{appointment.user.last_name}</h1>
              </li>
            ))
          )}
        </ul>
      </>
    );
};

export default AppointmentContainer;
