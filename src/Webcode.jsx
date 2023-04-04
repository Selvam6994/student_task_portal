import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Webcodecard from "./Webcodecard";

function Webcode() {
  const [webCode, setWebCode] = useState([]);

  const get_webcode = async () => {
    const data = await fetch("http://localhost:4000/webcode", {
      method: "GET",
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    });
    const webCodeTask = await data.json();
    setWebCode(webCodeTask);
  };
  useEffect(() => {
    get_webcode();
  }, []);

  const navWidth = useMediaQuery("(min-width:1135px)");
  return (
    <div
      className={navWidth == true ? "webCodePageBefore" : "webCodePageAfter"}
    >
      <Box>
        {webCode.map((ele) => (
          <Webcodecard cardContent={ele} />
        ))}
      </Box>
    </div>
  );
}

export default Webcode;
