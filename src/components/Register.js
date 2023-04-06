import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";




const Register = () => {

  // const [values, setValues] = React.useState({
  //   name: '',
  //   password: '',
  //   confirmPassword: ''
  // });
  const [userName , setUserName] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPass , setConfirmPass] = useState("");
  const [submitted ,setSubmitted] = useState(false);
  const [error , setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const[apiLoading , setApiLoading] = useState(true);
  // const form = document.getElementsByClassName('form');
  // const formData = new FormData(form);

  // const handleUserName = (e) => {
  //   console.log("hii");

  //   setUserName(e.target.value);
  //   setSubmitted(false);
  // };
 
  // Handling the email change
  // const handleConfirmPassword = (e) => {
  //   // console.log("hii1");
  //    setConfirmPass(e.targt.value);
  //   setSubmitted(false);
  // };
 
  // Handling the password change
  // const handlePassword = (e) => {
  //   console.log("hii2");
  //   setPassword(e.target.value);
  //   setSubmitted(false);
  //   console.log(password);
  // };

  //Handling Submit Button
  // const handleSubmit = (e) => {
  //   setSubmitted(true);
  //  console.log("hii");
  // //  setUserName(document.getElementById("username").getValue());
  //  console.log(userName);
  // //  handlePassword(e);
  //   console.log(confirmPass);
  //   console.log(password);
  //  console.log(INPUT.UserName);

  // try{  

  //   // console.log(`${config.endpoint}/auth/register`);
  //   let request = `{"username": "${userName}","password": "${password}"}`;
  //   // console.log(request);
  //   axios.post(`${config.endpoint}/auth/register`,JSON.stringify(request)).then(response=>console.log(response));
    
  // }
  // catch(e){
  //   console.log("hii");

  // }


  // }
  


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function


// const Register = () => {
  // const { enqueueSnackbar } = useSnackbar();


  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    
    
   

    setSubmitted(true);
    if(validateInput(formData)){
      setApiLoading(false);
  //   console.log(formData);
  //  //  setUserName(document.getElementById("username").getValue());
  //   console.log(userName);
  //  //  handlePassword(e);
  //    console.log(confirmPass);
  //    console.log(password);
   //  console.log(INPUT.UserName);
 
   try{  
 
    //  console.log(`${config.endpoint}/auth/register`);
     //let request = `{username:userName,password:password}`;
     //console.log(request);
    //  console.log({username:userName,password:password});
     let response = await axios.post(`${config.endpoint}/auth/register`,{username:formData.username , password:formData.password});
      // console.log(response.data);
       setApiLoading(true);
      
      enqueueSnackbar("Registered Successfully", {variant:"success"});
   }
   catch(e){
    

    if(e.response){
    //  console.log(e.response.data.message);
     setApiLoading(true);
     enqueueSnackbar(e.response.data.message ,{variant:"error"});
    }

     else{
      // console.log("may be some probss");
       setApiLoading(true);
      enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant:"error"});
     }
   }


  }
  else{
    // setApiLoading(true);
    if(formData.username==="")enqueueSnackbar("Username is a required field" , {variant:"warning"});
    else if(formData.username.length <6) enqueueSnackbar("Username must be at least 6 characters" , {variant:"warning"});
    else if(formData.password==="") enqueueSnackbar("Password is a required field" , {variant:"warning"});
    else if(formData.password.length<6) enqueueSnackbar("Password must be at least 6 characters" , {variant:"warning"});
    else if(formData.password !== formData.confirmPassword) enqueueSnackbar("Passwords do not match" , {variant:"warning"});

  }
}

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {

    if(data.username==="")return false;
    else if(data.username.length <6) return false;
    else if(data.password==="")return false;
    else if(data.password.length<6)return false;
    else if(data.password !== data.confirmPassword) return false;
    else return true;
  };

  // const header= React.createElement("h1" , null , "learnByDoing");

  return (
    
    
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      
      <Box className="content">
        <Stack spacing={1} className="form">
          <h2 className="title">Register</h2>
          {/* <header/> */}
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            // value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            // value={values.name}
            fullWidth
          //  onchange={handleUserName}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            // value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            // value={values.password}
  
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            // onchange = {handlePassword()}
          />
          <TextField
            id="confirmPassword"
            // ref="password"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            // value={confirmPass}
            onChange={(event) => {
              setConfirmPass(event.target.value);
            }}
            
            // value = {values.confirmPassword}
            fullWidth
            // onchange = {()=>handleConfirmPassword}
          />
           {apiLoading?<Button className="button" variant="contained" onClick = {()=>register({username:userName ,password:password, confirmPassword:confirmPass} )}>
            Register Now
           </Button>: <Box sx={{ display: 'flex' , justifyContent:'center' }}><CircularProgress /></Box>}
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
