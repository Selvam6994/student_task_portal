import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Loginpage() {
  const navigate = useNavigate();
  const [wrongPassword, setWrongPassword] = useState(false);

  sessionStorage.clear()

  let userSchema = yup.object({
    email: yup.string().email().required("Required"),
    password: yup.string().min(5).required("Required"),
  });
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
        const userData = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (userData.status == 200) {
          const result = await userData.json();
          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("email", result.email.id);
          navigate("/portal");
        } else {
          setWrongPassword(true);
        }
      },
    });

  //   console.log(values.password);
  // console.log(errors);
  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit} className="formSection">
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span>Email</span>
          <Input
            className="errorIndiction"
            value={values.email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            variant="outlined"
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <span style={{ color: "red" }}>{errors.email}</span>
          ) : (
            ""
          )}
          <span>Password</span>
          <Input
            value={values.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            type="password"
            variant="outlined"
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <span style={{ color: "red" }}>{errors.password}</span>
          ) : (
            ""
          )}
          {wrongPassword == true ? (
            <span style={{ color: "red" }}>Wrong Password</span>
          ) : (
            ""
          )}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            <Button type="submit" variant="plain">
              Login
            </Button>
            <Link style={{textDecoration:"none"}} to="/signup">
              <Button variant="plain">New student?</Button>
            </Link>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Loginpage;
