import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";
import {screen} from '@testing-library/dom'

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userNameLog , setUserNameLog] = useState("");
  const [passwordLog , setPasswordLog] = useState("");
  // const [confirmPass , setConfirmPass] = useState("");
  const[apiLoadingLog , setApiLoadingLog] = useState(true);
  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    



    
    // setSubmitted(true);
    if(validateInput(formData)){
      setApiLoadingLog(false);
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
     
     let response = await axios.post(`${config.endpoint}/auth/login`,{username:formData.username , password:formData.password});
      //  console.log(response.data.username);
      //  window.localStorage.setItem("name" ,response.data.username);
      persistLogin(response.data.username ,response.data.balance , response.data.token);
       setApiLoadingLog(true);
       
      
      enqueueSnackbar("Logged in successfully", {variant:"success"});
      // persistLogin(response.data.username , response.data.balance , response.data.token);
      history.push("/");
   }
   catch(e){
    

    if(e.response){
    //  console.log(e.response.data.message);
     setApiLoadingLog(true);
     enqueueSnackbar(e.response.data.message ,{variant:"error"});
    }

     else{
      // console.log("may be some probss");
       setApiLoadingLog(true);
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
    // else if(formData.password !== formData.confirmPassword) enqueueSnackbar("Passwords do not match" , {variant:"warning"});

  }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if(data.username==="")return false;
    else if(data.username.length <6) return false;
    else if(data.password==="")return false;
    else if(data.password.length<6)return false;
    // else if(data.password !== data.confirmPassword) return false;
    else return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (username , balance,token) => {

    window.localStorage.setItem("username" , username);
    window.localStorage.setItem('balance' , balance);
    window.localStorage.setItem("token" , token);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header whichPage = "login"/>
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
        <TextField
            id="usernamelog"
            label="username"
            variant="outlined"
            title="usernamelog"
            name="username"
            placeholder="Enter Username"
            
            onChange={(event) => {
              setUserNameLog(event.target.value);
            }}
            
            fullWidth          
          />

          <TextField
              id="passwordlog"
              label = "password"
              variant="outlined"
              title = "passwordlog"
              name = "password"
              placeholder = "Enter password"
              onChange={(event) => {
                setPasswordLog(event.target.value);
              }}

              fullWidth/>

             

{apiLoadingLog?<Button className="button" variant="contained" onClick = {()=>login({username:userNameLog ,password:passwordLog} )}>
            LOGIN TO QKART
           </Button>: <Box sx={{ display: 'flex' , justifyContent:'center' }}><CircularProgress /></Box>}


{/* <Button className="button" variant="contained" onClick = {()=>login({username:userName ,password:password, confirmPassword:confirmPass} )}>Register Now</Button> */}
 {/* /* onClick = {()=>register({username:userName ,password:password, confirmPassword:confirmPass} )}> */} 
            
           
           {/* : <Box sx={{ display: 'flex' , justifyContent:'center' }}><CircularProgress /></Box>} */}

           <p className="secondary-action">
            Don't have an account?{" "}
             <Link className="link" to = "/register">
              Register now
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
      {/* {console.log(screen.getByLabelText(/username/i))} */}
    </Box>
  );
};

export default Login;
