// src/components/Calendar.js

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from "js-cookie";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get email from cookies
    const userCookie = Cookies.get("userData");
    const userData = userCookie ? JSON.parse(userCookie) : null;
    const email = userData ? userData.email : null;

    if (!email) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    // Fetch events from your backend
    fetch(
      `http://localhost:8000/google-calendar-events?email=${encodeURIComponent(email)}`,
      {
        credentials: "include", // Include cookies in the request
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default MyCalendar;
