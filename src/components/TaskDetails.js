// import React, { useState, useEffect, useContext } from "react";
// import { TaskContext } from "../contexts/TaskProvider.js";

// const TaskDetails = ({ onUpdateTask }) => {
//   const { currTask, setCurrTask } = useContext(TaskContext);
//   console.log(typeof currTask.dueDate);
//   console.log(currTask.dueDate);

//   const [isChecked, setIsChecked] = useState(false);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   // const handleSave = () => {
//   // Here you would send the updated currTask to the backend
//   // onUpdateTask(currTask);
//   // };
//   useEffect(() => {
//     onUpdateTask(currTask);
//   }, [currTask]);

//   if (!currTask) {
//     return (
//       <div className="p-4 rounded-lg  w-1/3">
//         Select a currTask to view details
//       </div>
//     );
//   }
//   return (
//     <div className="p-4 rounded-lg w-1/3">
//       <h2 className="text-[40px] font-bold mb-3">Task Details:</h2>

//       <input
//         value={currTask.summary}
//         placeholder="Title"
//         onChange={(e) => {
//           setCurrTask({ ...currTask, summary: e.target.value });
//         }}
//         text="text"
//         className="text-xl font-medium pl-2 mb-4 w-[100%] bg-gray-50"
//       />

//       <div className="mb-4">
//         <textarea
//           className="w-full p-2 border bg-gray-50 rounded-lg"
//           placeholder="Description"
//           rows="3"
//           value={currTask.description || ""}
//           onChange={(e) =>
//             setCurrTask({ ...currTask, description: e.target.value })
//           }
//         ></textarea>
//       </div>
//       {/* <div className="mb-4">
//         <label className="block text-gray-700">List</label>
//         <select
//           className="w-full p-2 border rounded-lg"
//           value={currTask.list}
//           onChange={(e) => setCurrTask({ ...currTask, list: e.target.value })}
//         >
//           <option value="Personal">Personal</option>
//           <option value="Work">Work</option>
//           <option value="List 1">List 1</option>
//         </select>
//       </div> */}
//       <div className="mb-4">
//         <label className="block text-gray-700">Start date</label>
//         <input
//           type="date"
//           className="w-full p-2 border rounded-lg"
//           value={currTask.start.dateTime || ""}
//           onChange={(e) =>
//             setCurrTask({
//               ...currTask,
//               start: {
//                 // ...currTask.end, // Spread the existing properties of 'end'
//                 dateTime: e.target.value, // Update the 'dateTime' property
//               },
//             })
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Due date</label>
//         <input
//           type="date"
//           className="w-full p-2 border rounded-lg"
//           value={currTask.end.dateTime || ""}
//           onChange={(e) =>
//             setCurrTask({
//               ...currTask,
//               end: {
//                 // ...currTask.end, // Spread the existing properties of 'end'
//                 dateTime: e.target.value, // Update the 'dateTime' property
//               },
//             })
//           }
//         />
//       </div>
//       <div className="flex items-center mb-4">
//         <input
//           type="checkbox"
//           id="checkbox"
//           className="form-checkbox h-5 w-5 bg-[rgb(91,98,255)] rounded"
//           checked={isChecked}
//           onChange={handleCheckboxChange}
//         />
//         <label htmlFor="checkbox" className="ml-2 text-gray-700">
//           Sync with google calendar
//         </label>
//       </div>
//       {/* <div className="mb-4">
//         <label className="block text-gray-700">Tags</label>
//         <div className="flex space-x-2">
//           {(currTask.tags || []).map((tag, index) => (
//             <span key={index} className="px-3 py-1 bg-gray-200 rounded-lg">
//               {tag}
//             </span>
//           ))}
//           <button className="px-3 py-1 border rounded-lg">+ Add Tag</button>
//         </div>
//       </div> */}

//       <div className="flex justify-between">
//         <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
//           Delete Task
//         </button>
//         <button
//           className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
//           onClick={() => onUpdateTask(currTask)}
//         >
//           Save changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskDetails;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TaskContext } from "../contexts/TaskProvider.js";

const TaskDetails = ({ onUpdateTask }) => {
  const { currTask, setCurrTask } = useContext(TaskContext);

  const [summary, setSummary] = useState(currTask.summary || "");
  const [description, setDescription] = useState(currTask.description || "");
  const [start, setStart] = useState(currTask.start.dateTime || "");
  const [end, setEnd] = useState(currTask.end.dateTime || "");
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState(null);
  const [eventId, setEventId] = useState(null);

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
    setCurrTask({
      ...currTask,
      summary: summary,
      description: description,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    });
  }, [summary, description, start, end]);

  const handleSave = async () => {
    event.preventDefault();
    if (!user) {
      setResponseMessage("User is not authenticated.");
      return;
    }

    const updatedTask = {
      summary,
      description,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/schedule-event`, // Assuming `currTask.id` is the task ID
        updatedTask,
        {
          params: { email: user.email },
        }
      );
      setResponseMessage(response.data.message || "Task updated successfully!");
      onUpdateTask(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      setResponseMessage("Failed to update task. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!user || !currTask.id) {
      setResponseMessage("Cannot delete task. Please try again.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/tasks/${currTask.id}`,
        {
          params: { email: user.email },
        }
      );
      setResponseMessage(response.data.message || "Task deleted successfully!");
      // Optionally, clear the current task from context or UI
      setCurrTask(null);
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
