import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/joy/Button";
import { useFormik } from "formik";
import * as yup from "yup";

function Signuppage() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  let userSchema = yup.object({
    name: yup.string().required("Required"),
    newPassword: yup.string().min(5).required("Required"),
    password: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password doesnot match")
      .required("Required"),

  });
  const formik_signup = useFormik({
    initialValues: {
        name:"",
      email: `${email}`,
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const sendData = await fetch("http://localhost:4000/logindetails", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (sendData.status == 200) {
        const result = await sendData.json();
        navigate("/");
      } else if(sendData.status==400){
        setMessage(true);
      }
    },
  });
  // console.log(formik_signup.values.password);
  // console.log(formik_signup.errors.password);
  // console.log(email);
  return (
    <div className="signUpPage">
      <form className="formSection" onSubmit={formik_signup.handleSubmit}>
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
            <span>Name</span>
          <Input
            placeholder="User Name"
            variant="outlined"
            onChange={formik_signup.handleChange}
            onBlur={formik_signup.handleBlur}
            type="text"
            name="name"
          />
          {formik_signup.touched.name &&
          formik_signup.errors.name ? (
            <span style={{ color: "red" }}>
              {formik_signup.errors.name}
            </span>
          ) : (
            ""
          )}
          <span>Email</span>
          <Input
            placeholder="Type in here…"
            variant="outlined"
            onChange={formik_signup.handleChange}
            onBlur={formik_signup.handleBlur}
            type="email"
            name="email"
            disabled
            value={email}
          />

          <span>New Password</span>
          <Input
            placeholder="Type in here…"
            variant="outlined"
            onChange={formik_signup.handleChange}
            onBlur={formik_signup.handleBlur}
            type="password"
            name="newPassword"
          />
          {formik_signup.touched.newPassword &&
          formik_signup.errors.newPassword ? (
            <span style={{ color: "red" }}>
              {formik_signup.errors.newPassword}
            </span>
          ) : (
            ""
          )}
          <span>Confirm Password</span>
          <Input
            placeholder="Type in here…"
            variant="outlined"
            onChange={formik_signup.handleChange}
            onBlur={formik_signup.handleBlur}
            type="password"
            name="password"
          />
          {formik_signup.touched.password && formik_signup.errors.password ? (
            <span style={{ color: "red" }}>
              {formik_signup.errors.password}
            </span>
          ) : (
            ""
          )}
          {message == true ? (
            <span style={{ color: "red" }}>Invalid Credentials</span>
          ) : (
            ""
          )}
        </Box>
        <Button variant="plain" type="submit">
          SignUp
        </Button>
      </form>
    </div>
  );
}

export default Signuppage;
