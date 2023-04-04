import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";

function Dashboard() {
  const navWidth = useMediaQuery("(min-width:1135px)");
  const [taskData, setTaskData] = useState([]);
  const [assignedTask, getAssignedTask] = useState([]);

  const get_details = async () => {
    const getTaskData = await fetch(
      `http://localhost:4000/studentdetails/${sessionStorage.getItem(
        "email"
      )}/task`
    );
    const result = await getTaskData.json();
    setTaskData(result);
    console.log(result);
  };

  const assigned_details = async () => {
    const getTasks = await fetch("http://localhost:4000/", {
      method: "GET",
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    });
    const tasks = await getTasks.json();
    getAssignedTask(tasks);
    console.log(tasks);
  };

  useEffect(() => {
    get_details();
    assigned_details();
  }, []);

  console.log(taskData.length)
  console.log(assignedTask.length)
const totalTasks = assignedTask.length;
const submittedTasks = taskData.length;
const pendingTasks = assignedTask.length - taskData.length

  return (
    <div
      className={
        navWidth == true ? "dashBoardPageBefore" : "dashBoardPageAfter"
      }
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            margin: "20px 30px",
            width: "300px",
            height: "300px",
          },
        }}
      >
        <Paper className="statusDisplay" elevation={3}>
        <h3>Total Tasks : {totalTasks}</h3>
          <h3>Submitted Task : {submittedTasks}</h3>
          <h3>Pending Task : {pendingTasks}</h3>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="outlined">Task Status</Button>
          </Box>
        </Paper>
        <Paper className="statusDisplay" elevation={3}>
          <h3>Submitted WebCode : </h3>
          <h3>Pending WebCode : </h3>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="outlined">Task Status</Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Dashboard;