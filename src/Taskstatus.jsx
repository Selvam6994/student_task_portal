import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Balancer from "react-wrap-balancer";

function Taskstatus() {
  const navWidth = useMediaQuery("(min-width:1135px)");
  const [taskStatus, setTaskStatus] = useState([]);
  const get_details = async () => {
    const getTaskData = await fetch(
      `http://localhost:4000/studentdetails/${sessionStorage.getItem(
        "email"
      )}/task`
    );
    const result = await getTaskData.json();
    setTaskStatus(result);
    console.log(result);
  };
  useEffect(() => {
    get_details();
  }, []);
  console.log(taskStatus);
  return (
    <div
      className={
        navWidth == true ? "taskStatusPageBefore" : "taskStatusPageAfter"
      }
    >
      <h3>Task Status</h3>
      {taskStatus.map((task) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 800,

              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            },
          }}
        >
          <Paper elevation={3}>
            <span>{task.taskname}</span>
            <span>{task.github}</span>
            <span>{task.frontend}</span>
            <span>{task.backend}</span>
            <span style={{ color: "orange" }}>Yet to be graded</span>
          </Paper>
        </Box>
      ))}
    </div>
  );
}

export default Taskstatus;
