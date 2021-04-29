import React, { useState } from "react";
import "./PersonalizedTraining.css";
import AvailabilityForm from "../AvailabilityForm";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "../../../store/calendar";

const PersonalizedTraining = () => {
  const dispatch = useDispatch();
  const handleCalendar = async (e) => {
    const date = await dispatch(updateDate(e));
    console.log(e);
  };

  const date = useSelector((state) => state.calendar.date);

  return (
    <>
      <Calendar onChange={handleCalendar} value={date} />
      <AvailabilityForm />
    </>
  );
};

export default PersonalizedTraining;
