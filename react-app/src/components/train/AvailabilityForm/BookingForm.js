import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AvailabilityForm.css";
import { bookAppointment } from "../../../store/appointment";

const BookingForm = () => {
  const available = useSelector(
    (state) => state.appointment.appointments.available
  );
  const dispatch = useDispatch();

  const date = useSelector((state) => state.calendar.date);
  const timezone = date.getTimezoneOffset() - (date.getTimezoneOffset() % 30);
  const handleBooking = async (e) => {
    e.preventDefault();
    await dispatch(bookAppointment(date, e.target.value, timezone));
  };

  if (!available) return null;
  return (
    <div className="availability">
      <h1 className="availability__header">
        To book an appointment, choose an date from a calendar with an available
        appointment, and click the appointment time below to book!
      </h1>
      <ul className="availForm">
        {Object.keys(available).length ? (
          ((
            <li>Book your appointments here, just click an available slot.</li>
          ),
          Object.keys(available).map((appointment) => (
            <li>
              <button
                className="green"
                onClick={handleBooking}
                value={appointment}
              >
                {appointment}
              </button>
            </li>
          )))
        ) : (
          <h1>Sorry, no available times. Please check another day.</h1>
        )}
      </ul>
    </div>
  );
};

export default BookingForm;
