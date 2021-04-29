import React, { useState } from "react";
import "./PersonalizedTraining.css";
import AvailabilityForm from "../AvailabilityForm";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { updateDate } from "../../../store/calendar";

const PersonalizedTraining = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleCalendar = async (e) => {
    setDate(e);
    const date = await dispatch(updateDate(e));

    console.log(e);
  };
  return (
    <>
      <Calendar onChange={handleCalendar} value={date} />
      <AvailabilityForm />
    </>
  );
};

export default PersonalizedTraining;
