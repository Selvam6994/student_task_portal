import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [otpField, setOtpField] = useState(false);
  const [formState, setFormState] = useState(false);
  const [errorMessage,setErrorMesasage]=useState(false);
  const navigate = useNavigate();
  const userSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email().required("Required"),
  });
  const formik_mail =
    useFormik({
      initialValues: {
        name: "",
        email: "",
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
        const postData = await fetch("http://localhost:4000/signupdetails", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (postData.status == 400) {
          setFormState(true);
        } else {
          setOtpField(true);
          const result = postData.json()
        }
      },
    });

  const formik_otp = useFormik({
    initialValues: {
      otp: "",
    
    },
    onSubmit: async (values) => {
      const get_otp = await fetch("http://localhost:4000/verifyOTP", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (get_otp.status == 200) {
        const result = await get_otp.json();
        // localStorage.setItem("otptoken", result.token);
        navigate(`/${formik_mail.values.email}/signUpPage`);
      } else {
        setErrorMesasage("Invalid credentials");
      }
    },
  });
console.log(formik_mail.values.email)


  return (
    <div className="signUpPage">
      <form className="formSection" onSubmit={formik_mail.handleSubmit}>
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
            placeholder="Name"
            variant="outlined"
            onChange={formik_mail.handleChange}
            onBlur={formik_mail.handleBlur}
            type="text"
            name="name"
          />
          {formik_mail.touched.name && formik_mail.errors.name ? (
            <span style={{ color: "red" }}>{formik_mail.errors.name}</span>
          ) : (
            ""
          )}
          <span>Email</span>
          <Input
            placeholder="Email"
            variant="outlined"
            onChange={formik_mail.handleChange}
            onBlur={formik_mail.handleBlur}
            type="email"
            name="email"
          />
          {formik_mail.touched.email && formik_mail.errors.email ? (
            <span style={{ color: "red" }}>{formik_mail.errors.email}</span>
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
            <Button variant="plain" type="submit">
              Send OTP
            </Button>
            {formState == true ? <span style={{color:"red"}}>Invalid Credentials</span> : ""}
          </Box>
        </Box>
      </form>
      {otpField == true ? (
          
          <Box
            sx={{
              py: 2,
              display: "grid",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
              <form onSubmit={formik_otp.handleSubmit}>
            <span>OTP</span>
            <Input
              placeholder="Enter OTP"
              variant="outlined"
              name="otp"
              onChange={formik_otp.handleChange}
            />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <Button variant="plain" type="submit">
                Verify
              </Button>
              <span style={{color:"red"}}>{errorMessage}</span>
            </Box>
            </form>
          </Box>
       
      ) : (
        ""
      )}
    </div>
  );
}

export default Signup;
