import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useFormik } from "formik";
import { api } from "./global";

function Taskpage() {
  const [taskAsigned, setAsignedTask] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const taskDescription = useParams();
  const taskArray = [];
  taskAsigned.map((ele) => {
    if (ele.name === taskDescription.Task) {
      taskArray.push(ele);
    }
  });

  console.log(taskDescription.Task);

  const formik_task = useFormik({
    initialValues: {
      github: "",
      frontend: "",
      backend: "",
    },

    onSubmit: async (values) => {
      const submitTask = await fetch(
        `${api}/studentdetails/${sessionStorage.getItem(
          "email"
        )}/${taskDescription.Task}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (submitTask.status == 401) {
        setErrorMsg(true);
      } else {
        const result = submitTask.json();
      }
    },
  });

  const navWidth = useMediaQuery("(min-width:1135px)");

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

  // console.log(sessionStorage.getItem("email"));

  return (
    <div className={navWidth == true ? "taskPageBefore" : "taskPageAfter"}>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Box className="taskContent">
          <Paper elevation={3}>
            <div className="closeButton">
              <IconButton aria-label="back" size="large">
                <Link style={{textDecoration:"none"}} to={"/portal"}>
                  <ArrowBackIcon fontSize="inherit" style={{ color: "red" }} />
                </Link>
              </IconButton>
            </div>
            {taskArray.map((ele) => {
              const buttonCondition = () => {
                if (
                  ele.submission.gitrepo &&
                  ele.submission.frontend &&
                  ele.submission.backend 
                ) {
                  if (
                    formik_task.values.github ||
                    formik_task.values.frontend ||
                    formik_task.values.backend == ""
                  ) {
                    return true;
                  }
                } else if (
                  ele.submission.gitrepo &&
                  ele.submission.frontend
                ) {
                  if (
                    formik_task.values.github =="" ||
                    formik_task.values.frontend == ""
                  ) {
                    return true;
                  }
                } else if( ele.submission.gitrepo){
                 if( formik_task.values.github ==""){
                  return true;
                 }
                }
              };
              return (
                <div
                  className="taskSubmission"
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  <h1 style={{ margin: "0 0 0 20px" }}>{ele.name}</h1>

                  <h5>
                    {" "}
                    <Balancer>{ele.task}</Balancer>
                  </h5>
                  <form onSubmit={formik_task.handleSubmit}>
                    <Box
                      sx={{
                        py: 2,
                        display: "grid",
                        gap: 2,
                        alignItems: "center",
                        flexWrap: "wrap",
                        margin: "0 20px 0 20px",
                      }}
                    >
                      {ele.submission.gitrepo == true ? (
                        <Box
                          sx={{
                            py: 2,
                            display: "grid",
                            gap: 2,
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Input
                            name="github"
                            placeholder="Github Link"
                            variant="outlined"
                            type="url"
                            onChange={formik_task.handleChange}
                            onBlur={formik_task.handleBlur}
                          />

                        </Box>
                      ) : (
                        ""
                      )}
                      {ele.submission.frontend == true ? (
                        <Box
                          sx={{
                            py: 2,
                            display: "grid",
                            gap: 2,
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Input
                            name="frontend"
                            placeholder="Front-end Deployed URL"
                            variant="outlined"
                            type="url"
                            onChange={formik_task.handleChange}
                            onBlur={formik_task.handleBlur}
                          />

                         
                        </Box>
                      ) : (
                        ""
                      )}
                      {ele.submission.backend == true ? (
                        <Box
                          sx={{
                            py: 2,
                            display: "grid",
                            gap: 2,
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Input
                            name="backend"
                            placeholder="Back-end Deployed URL"
                            variant="outlined"
                            type="url"
                            onChange={formik_task.values.handleChange}
                          />
                        
                        </Box>
                      ) : (
                        ""
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexWrap: "wrap",
                          margin: "0 0 0 20px",
                        }}
                      >
                          {errorMsg == true ? (
                            <span style={{ color: "red" }}>
                              Task Already Submitted
                            </span>
                          ) : (
                            ""
                          )}
                        <Button variant="outlined" type="submit" disabled={buttonCondition()}>
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </div>
              );
            })}
          </Paper>
        </Box>
      </motion.div>
    </div>
  );
}

export default Taskpage;
