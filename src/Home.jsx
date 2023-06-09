import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./global";

function Home() {
  // const [taskPage, setTaskPage] = useState(false);
  const navWidth = useMediaQuery("(min-width:1135px)");
  const [taskAsigned, setAsignedTask] = useState([]);

  const task = async () => {
    const getData = await fetch(`${api}`, {
      method: "GET",
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    });
    const task = await getData.json();
    // console.log(task);
    setAsignedTask(task);
  };
  useEffect(() => {
    task();
  }, []);

  return (
    <div
      className={navWidth == true ? "homeSectionBefore" : "homeSectionAfter"}
    >
      <div className="displayedTasks">
        {taskAsigned.map((task) => (
          <div className="taskBubble" key={task.name}>
            <Link style={{textDecoration:"none"}} to={`/portal/${task.name}`}> {task.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
