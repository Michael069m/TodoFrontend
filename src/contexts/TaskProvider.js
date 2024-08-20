import React, { createContext, useState } from "react";
const TaskContext = createContext(null);
const TaskProvider = ({ children }) => {
  const [currTask, setCurrTask] = useState({
    id: 1,
    completed: false,
    summary: "Research content ideas",
    desription: "hii",
    priority: false,
    start: {
      dateTime: "2024-08-22",
    },
    end: {
      dateTime: "2024-09-22",
    },
  });
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     completed: false,
  //     summary: "Research content ideas",
  //     desription: "",
  //     priority: false,
  //     dueDate: "",
  //     start: {
  //       dateTime: "2024-08-22",
  //     },
  //     end: {
  //       dateTime: "2024-09-22",
  //     },
  //   },
  //   {
  //     id: 2,
  //     completed: false,
  //     summary: "Create a database of guest authors",
  //     desription: "",
  //     priority: true,
  //     start: {
  //       dateTime: "",
  //     },
  //     end: {
  //       dateTime: "",
  //     },
  //   },
  // ]);
  return (
    <TaskContext.Provider value={{ currTask, setCurrTask }}>
      {children}
    </TaskContext.Provider>
  );
};
export { TaskProvider, TaskContext };
