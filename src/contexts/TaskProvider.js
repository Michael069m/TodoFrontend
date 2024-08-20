import React, { createContext, useState } from "react";
const TaskContext = createContext(null);
const TaskProvider = ({ children }) => {
  const [currTask, setCurrTask] = useState({
    id: 1,
    completed: false,
    summary: "Research content ideas",
    desription: "hii",
    priority: false,
    dueDate: "",
    start: {
      dateTime: "2024-08-22",
    },
    end: {
      dateTime: "2024-09-22",
    },
  });
  const [tasks, setTasks] = useState([
    {
      id: 1,
      completed: false,
      summary: "Research content ideas",
      desription: "",
      priority: false,
      dueDate: "",
      start: {
        dateTime: "2024-08-22",
      },
      end: {
        dateTime: "2024-09-22",
      },
    },
    {
      id: 2,
      completed: false,
      summary: "Create a database of guest authors",
      desription: "",
      priority: true,
      start: {
        dateTime: "",
      },
      end: {
        dateTime: "",
      },
    },
    {
      id: 3,
      completed: true,
      summary: "Renew driver’s license",
      desription: "",
      priority: false,
      dueDate: "2024-08-22",
      start: {
        dateTime: "2024-08-22",
      },
      end: {
        dateTime: "2024-09-22",
      },
    },
    {
      id: 4,
      completed: false,
      summary: "Consult accountant",
      desription: "",
      priority: false,
      start: {
        dateTime: "",
      },
      end: {
        dateTime: "",
      },
    },
    {
      id: 5,
      completed: false,
      summary: "Print business card",
      desription: "",
      priority: false,
      start: {
        dateTime: "",
      },
      end: {
        dateTime: "",
      },
    },
  ]);
  return (
    <TaskContext.Provider value={{ currTask, setCurrTask, tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
export { TaskProvider, TaskContext };
