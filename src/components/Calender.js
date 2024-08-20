import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { gapi } from "gapi-script";
import GoogleCalendar from "./GoogleCalendar";

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: "AIzaSyDCuH5XBveBgB45qdESi8YnrT3cgBInuxA",
        clientId:
          "912276168470-rfufd4953c67dundn7vh0nbibrsdp7ch.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events.readonly",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        console.log("loading calendar");
        loadCalendar();
      });
  };

  const loadCalendar = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        console.log("Events:", events);
        setEvents(events); // Store the events in state
      });
  };

  return (
    <div className="w-screen h-screen bg-[rgb(228,224,138)] p-9">
      <div className="rounded-lg shadow-md bg-gray-100 flex justify-evenly relative h-full">
        <Sidebar highlight={2} />
        <div className="w-[80vw]">
          <button onClick={handleAuthClick}>Sign in & Load Calendar</button>
          {/* Conditionally render the GoogleCalendar component based on the events */}
          {events.length > 0 && <GoogleCalendar events={events} />}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
