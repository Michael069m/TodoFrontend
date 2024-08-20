import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { gapi } from "gapi-script";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const start = () => {
      gapi.client
        .init({
          apiKey: "AIzaSyDyfHzuH46tkvwH80dkpNne6pAXbAVndrQ",
          clientId:
            "240347850224-0b8eqqe5csjqm07ev4orlrmqlifaie5o.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar.events.readonly",
        })
        .then(() => {
          gapi.auth2.getAuthInstance().signIn().then(loadCalendarEvents);
        });
    };
    gapi.load("client:auth2", start);
  }, []);

  const loadCalendarEvents = () => {
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
        const events = response.result.items.map((event) => ({
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
          title: event.summary,
        }));
        setEvents(events); // Update the state with the fetched events
      });
  };

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default GoogleCalendar;
