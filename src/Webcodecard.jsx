import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import Paper from "@mui/material/Paper";
import Balancer from "react-wrap-balancer";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Webcodecard({ cardContent }) {
  const [submitField, setSubmitField] = useState(false);
  return (
    <div>
      <Paper
        className="statusDisplay"
        elevation={3}
        style={{ margin: "40px 40px" }}
      >
        <h1>{cardContent.name}</h1>
        <Balancer>
          <h4>{cardContent.task}</h4>
        </Balancer>

        <IconButton
          style={{ margin: "10px" }}
          variant="outlined"
          onClick={() => {
            submitField == false ? setSubmitField(true) : setSubmitField(false);
          }}
        >
          {submitField == false ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </IconButton>
        {submitField == true ? (
          <Box
            sx={{
              py: 2,
              display: "grid",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
              width: "80%",
            }}
          >
            {cardContent.submission.gitrepo == true ? (
              <Textarea
                name="Outlined"
                placeholder="GitHub URL..."
                variant="outlined"
              />
            ) : (
              ""
            )}
            {cardContent.submission.frontend == true ? (
              <Textarea
                name="Outlined"
                placeholder="Front End Deployed URL..."
                variant="outlined"
              />
            ) : (
              ""
            )}
            {cardContent.submission.backend == true ? (
              <Textarea
                name="Outlined"
                placeholder="Back End Deployed URL..."
                variant="outlined"
              />
            ) : (
              ""
            )}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button type="submit" variant="outlined">
                Submit
              </Button>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
}

export default Webcodecard;
