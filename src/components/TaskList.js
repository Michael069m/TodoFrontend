import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TaskContext } from "../contexts/TaskProvider.js";

const TaskList = ({
  tasks,
  onTaskClick,
  onAddTask,
  addTaskButton,
  setAddTaskButton,
}) => {
  const { currTask, setCurrTask } = useContext(TaskContext);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  // console.log(typeof currTask.dueDate);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const newTask = {
        summary: newTaskTitle,
        list: "Personal", // Default list, can be modified
      };
      onAddTask(newTask);
      setNewTaskTitle(""); // Clear the input field after adding
    }
  };
  const handleCheckboxChange = () => {};
  // const { currTask, setCurrTask } = useContext(TaskContext);

  // const [summary, setSummary] = useState(currTask.summary || "");
  // const [description, setDescription] = useState(currTask.description || "");
  // const [start, setStart] = useState(currTask.start.dateTime || "");
  // const [end, setEnd] = useState(currTask.end.dateTime || "");
  // const [responseMessage, setResponseMessage] = useState("");
  // const [user, setUser] = useState(null);
  // const [eventId, setEventId] = useState(null);
  // const event = null;
  // const handleSave = async () => {
  //   event.preventDefault();
  //   if (!user) {
  //     setResponseMessage("User is not authenticated.");
  //     return;
  //   }

  //   const updatedTask = {
  //     summary,
  //     description,
  //     start: new Date(start).toISOString(),
  //     end: new Date(end).toISOString(),
  //   };

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/schedule-event`, // Assuming `currTask.id` is the task ID
  //       updatedTask,
  //       {
  //         params: { email: user.email },
  //       }
  //     );
  //     setResponseMessage(response.data.message || "Task updated successfully!");
  //     // onUpdateTask(updatedTask);
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //     setResponseMessage("Failed to update task. Please try again.");
  //   }
  // };

  // const handleDelete = async () => {
  //   if (!user || !currTask.id) {
  //     setResponseMessage("Cannot delete task. Please try again.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8000/tasks/${currTask.id}`,
  //       {
  //         params: { email: user.email },
  //       }
  //     );
  //     setResponseMessage(response.data.message || "Task deleted successfully!");
  //     // Optionally, clear the current task from context or UI
  //     setCurrTask(null);
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //     setResponseMessage("Failed to delete task. Please try again.");
  //   }
  // };

  // if (!currTask) {
  //   return (
  //     <div className="p-4 rounded-lg w-1/3">Select a task to view details</div>
  //   );
  // }
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState(null);
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie);
      console.log(userData);
      setUser(userData);
    } else {
      console.error("No user data found in cookies");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setResponseMessage("User is not authenticated.");
      return;
    }

    const eventData = {
      summary,
      description,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/schedule-event",
        eventData,
        {
          params: { email: user.email },
        }
      );
      console.log(response);
      setEventId(response.data.eventId);
      setResponseMessage(
        response.data.message || "Event scheduled successfully!"
      );
    } catch (error) {
      console.error("Error scheduling event:", error);
      setResponseMessage("Failed to schedule event. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!eventId) {
      setResponseMessage("No event ID found. Please schedule an event first.");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:8000/delete-event",
        {
          data: { eventId },
          params: { email: user.email },
        }
      );
      console.log(response);
      setEventId(null);
      setResponseMessage(response.data || "Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      setResponseMessage("Failed to delete event. Please try again.");
    }
  };
  // onUpdateTask
  return (
    <div className=" border-r-[2px] border-solid border-[rgb(228,224,138)]">
      <div className="p-4 h-full rounded-lg w-[40vw] ">
        <h2 className="text-[40px] font-bold mb-4">Tasks</h2>
        {/* <form className="mt-4" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Add new task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="p-2 border rounded-lg w-full"
          /> */}
        {/* <button
            onClick={handleAddTask}
            className="mt-2 p-2 bg-blue-500 text-white rounded-lg w-full"
          >
            Add Task
          </button> */}
        {/* </form> */}
        <button
          onClick={() => {
            setAddTaskButton(!addTaskButton);
          }}
        >
          {!addTaskButton ? "Cancel" : "Add Task"}
        </button>
        <form className={`${!addTaskButton ? "block" : "hidden"} `}>
          <div className="p-4 rounded-lg w-[100%]">
            <h2 className="text-[40px] font-bold mb-3">Task Details:</h2>

            <input
              value={summary}
              placeholder="Title"
              onChange={(e) => setSummary(e.target.value)}
              text="text"
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
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>

            {responseMessage && <p>{responseMessage}</p>}
          </div>
        </form>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <>
              <li
                key={task.id}
                className="cursor-pointer pl-8 relative p-2 border rounded-lg"
                onClick={() => onTaskClick(task)}
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  className="form-checkbox absolute left-2 h-5 w-5 bg-[rgb(91,98,255)] rounded"
                  checked={task.completed}
                  onChange={handleCheckboxChange}
                />
                {task.summary}
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
