import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dropdown from "react-bootstrap/Dropdown";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link, Outlet } from "react-router-dom";

function Portal() {
  const sideNavOptions = [
    {
      name: "Dashboard",
    },
    {
      name: "Task Status",
    },
  
  ];

  const navWidth = useMediaQuery("(min-width:1135px)");
  return (
    <div>
      <Box>
        <Paper
          elevation={3}
          className="navBar"
          style={{ background: "#6d1b7b74", color: "aliceblue" }}
        >
          {navWidth == false ? (
            <div className="optionSection">
              <Dropdown className="dropDown">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{ backgroundColor: "#6d1b7bc5", border: "none" }}
                >
                  <IconButton aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                 
                    <Link  style={{textDecoration:"none"}} to="/portal">Home </Link>
                  </Dropdown.Item>

                  {sideNavOptions.map((option) => (
                    <Dropdown.Item key={option.name}>
                      <Link style={{textDecoration:"none"}} to={`/portal/${option.name}`}> {option.name} </Link>
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item>
                      <Link style={{textDecoration:"none"}} to={"/"}> Log Out </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            ""
          )}

          <div className="titleSection">
            <h1>Task Portal</h1>
          </div>
        </Paper>
      </Box>
      <div className="bodySection">
        {navWidth == true ? (
          <Paper elevation={8} className="sideNav">
            <ul className="optionsSection">
              <li className="options">
                <Link style={{textDecoration:"none"}}  to={"/portal"}>Home</Link>
              </li>
              {sideNavOptions.map((option) => (
                <li className="options" key={option.name}>
                  <Link style={{textDecoration:"none"}}  to={`/portal/${option.name}`}> {option.name}</Link>
                </li>
              ))}
               <li className="options">
                <Link style={{textDecoration:"none"}}  to={"/"}>Log Out</Link>
              </li>
            </ul>
          </Paper>
        ) : (
          ""
        )}

        <Outlet />
      </div>
    </div>
  );
}

export default Portal;
