import React, { useEffect } from "react";
import "./PersonalizedTraining.css";
import AvailabilityForm from "../AvailabilityForm";
import AppointmentContainer from "../AppointmentContainer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "../../../store/calendar";
import { getAvailability } from "../../../store/appointment";
import BookingForm from "../AvailabilityForm/BookingForm";

const PersonalizedTraining = () => {
  const dispatch = useDispatch();
  const handleCalendar = async (e) => {
    const date = await dispatch(updateDate(e));
    console.log(e);
  };
  const date = useSelector((state) => state.calendar.date);
  const user = useSelector((state) => state.auth.user);
  const tDate = new Date();
  const timezone = tDate.getTimezoneOffset() - (tDate.getTimezoneOffset() % 30);

  useEffect(async () => {
    if (date) {
      await dispatch(getAvailability(date, timezone));
    }
  }, [date]);

  return (
    <>
      <Calendar
        onChange={handleCalendar}
        value={date}
        minDate={new Date(tDate.getTime() + 86400000 * 2)}
      />
      {user.role === "owner" ? <AvailabilityForm /> : <BookingForm />}
      <AppointmentContainer />
    </>
  );
};

export default PersonalizedTraining;
