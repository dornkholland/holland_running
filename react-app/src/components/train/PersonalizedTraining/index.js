import React, { useState } from "react";
import "./PersonalizedTraining.css";
import AvailabilityForm from "../AvailabilityForm";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PersonalizedTraining = () => {
  const [date, setDate] = useState(new Date());
  const handleCalendar = (e) => {
    setDate(e);
    console.log(e);
  };
  return (
    <>
      <div className="navbar__buffer"></div>
      <Calendar onChange={handleCalendar} value={date} />
      <AvailabilityForm />
    </>
  );
};

export default PersonalizedTraining;
