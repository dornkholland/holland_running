import React from "react";
import { useSelector } from "react-redux";
import "./AppointmentContainer.css";

const AppointmentContainer = () => {
  const booked = useSelector((state) => state.appointment.appointments.booked);

  if (!booked) return null;
  else
    return (
      <div>
        <h1 className="booked__header">Booked Appointments:</h1>
        <ul>
          {Object.values(booked).map((time) =>
            Object.entries(time).map(([timeKey, appointment]) => (
              <li key={appointment.id} className="booked">
                <h1>
                  Appointment with {appointment.user.first_name}{" "}
                  {appointment.user.last_name}
                </h1>
                <h2>
                  {appointment.date_time.split(" ").slice(0, 4).join(" ")}
                </h2>
                <h2>{timeKey}</h2>
              </li>
            ))
          )}
        </ul>
      </div>
    );
};

export default AppointmentContainer;
