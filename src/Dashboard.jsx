import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { api } from "./global";

function Dashboard() {
  const navWidth = useMediaQuery("(min-width:1135px)");
  const [taskData, setTaskData] = useState([]);
  const [assignedTask, getAssignedTask] = useState([]);

  const get_details = async () => {
    const getTaskData = await fetch(
      `${api}/${sessionStorage.getItem(
        "email"
      )}/task`
    );
    const result = await getTaskData.json();
    setTaskData(result);
    // console.log(result);
  };

  const assigned_details = async () => {
    const getTasks = await fetch(`${api}`, {
      method: "GET",
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    });
    const tasks = await getTasks.json();
    getAssignedTask(tasks);
    // console.log(tasks);
  };

  useEffect(() => {
    get_details();
    assigned_details();
  }, []);

  // console.log(taskData.length)
  // console.log(assignedTask.length)
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
           <Link style={{textDecoration:"none"}} to={"/portal/Task Status"}> <Button variant="outlined">Task Status</Button></Link>
          </Box>
        </Paper>
       
      </Box>
    </div>
  );
}

export default Dashboard;
