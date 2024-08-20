import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TaskContext } from "../contexts/TaskProvider.js";

const TaskDetails = ({ onUpdateTask }) => {
  const { currTask, setCurrTask } = useContext(TaskContext);

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie);
      setUser(userData);
    } else {
      console.error("No user data found in cookies");
    }
  }, []);

  useEffect(() => {
    if (currTask) {
      setSummary(currTask.summary || "");
      setDescription(currTask.description || "");
      setStart(
        currTask.start.dateTime || new Date().toISOString().slice(0, 10)
      ); // Format for date input
      setEnd(currTask.end.dateTime || new Date().toISOString().slice(0, 10));
    }
  }, [currTask]);

  const handleSave = async (event) => {
    event.preventDefault();

    if (!user) {
      setResponseMessage("User is not authenticated.");
      return;
    }

    // Ensure currTask has an eventId before proceeding
    if (!currTask.eventId) {
      setResponseMessage("Event ID is missing.");
      return;
    }

    const updatedTask = {
      eventId: currTask.eventId, // Ensure this is the correct ID
      summary,
      description,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/update-event`,
        updatedTask,
        {
          params: { email: user.email },
        }
      );

      setResponseMessage(response.data || "Event updated successfully!");
      setCurrTask(updatedTask);
      onUpdateTask(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      setResponseMessage("Failed to update event. Please try again.");
    }
  };

  const handleDelete = async () => {
    // Check if user is authenticated and if there is a current task with an ID
    if (!user || !currTask.eventId) {
      setResponseMessage("Cannot delete task. Please try again.");
      return;
    }

    try {
      // Make a DELETE request to the backend to delete the event
      const response = await axios.delete(
        "http://localhost:8000/delete-event",
        {
          data: { eventId: currTask.eventId }, // Send the event ID in the request body
          params: { email: user.email }, // Send the user's email as a query parameter
        }
      );

      // Handle the response from the server
      setResponseMessage(response.data.message || "Task deleted successfully!");
      setCurrTask(null); // Clear the current task from the context
    } catch (error) {
      console.error("Error deleting task:", error);
      setResponseMessage("Failed to delete task. Please try again.");
    }
  };

  if (!currTask) {
    return (
      <div className="p-4 rounded-lg w-1/3">Select a task to view details</div>
    );
  }

  return (
    <div className="p-4 rounded-lg w-1/3">
      <h2 className="text-[40px] font-bold mb-3">Task Details:</h2>

      <input
        value={summary}
        placeholder="Title"
        onChange={(e) => setSummary(e.target.value)}
        type="text"
        className="text-xl font-medium pl-2 mb-4 w-[100%] bg-gray-50"
      />

      <div className="mb-4">
        <textarea
          className="w-full p-2 border bg-gray-50 rounded-lg"
          placeholder="Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Start date</label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Due date</label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={handleDelete}
        >
          Delete Task
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          onClick={handleSave}
        >
          Save changes
        </button>
      </div>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default TaskDetails;
