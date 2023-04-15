





/******************************************************************************REGISTER PAGE******************************************************************************** */








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
import {Redirect } from 'react-router-dom';







/***********************************************************************************REGISTER FUNCTIONALITY********************************************************************************** */







const Register = () => {

  const [userName , setUserName] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPass , setConfirmPass] = useState("");
  const [submitted ,setSubmitted] = useState(false);
  const [error , setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const[apiLoading , setApiLoading] = useState(true);
  const history = useHistory();

  





  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function


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











  /***************************************************************************************REGISTER BUTTON FUNCTION HANDLE******************************************************************************** */
  
  
  
  
  
  
  
  
  const register = async (formData) => { 
    
    /**************************ONLY AFTER CHECKING USERNAME PASSWORD BASIC CHECK PROCEED*********************************** */





    if(validateInput(formData)){
      setApiLoading(false);



    /******************************************TRY TO REGISTER USERNAME PASSWORD*************************************** */




      try{  
          await axios.post(`${config.endpoint}/auth/register`,{username:formData.username , password:formData.password});      
          setApiLoading(true);
          setSubmitted(true);      
          enqueueSnackbar("Registered Successfully", {variant:"success"});
          history.push("/login");
      
      }




      /******************************************************IF ANY ERROR OCCURS CATCH BLOCK HELPS******************************************* */



      catch(e){


          if(e.response){    
            setApiLoading(true);
            enqueueSnackbar(e.response.data.message ,{variant:"error"});
           }

         else{
     
          setApiLoading(true);
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant:"error"});
        }
      }


    }



    /*************************************************************************IF VALIDATION FAILS, SHOW CORRESPONDING WARNING DISPLAY*******************************************************************8 */






    else{
   
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














  /***********************************************************************************************************VALIDATE INPUT FUNCTION FOR BASIC USERNAME PASSWORD CHECKING********************************************************************************** */
  
  
  
  
  
  
  
  
  
  const validateInput = (data) => {


    if(data.username==="")return false;
    else if(data.username.length <6) return false;
    else if(data.password==="")return false;
    else if(data.password.length<6)return false;
    else if(data.password !== data.confirmPassword) return false;
    else return true;

  };

  





  return (
    
    
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header whichPage = "register" />




      {/* **************************************************************************BOX COMPONENT FOR REGISTRATION FORM******************************************************************8 */}
      




      <Box className="content">
        <Stack spacing={0.5} className="form">



          {/* ***************************HEADING IS REGISTER*************************** */}


          <h2 className="title">Register</h2>


          {/* ******************************USERNAME FEILD****************************** */}


          
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}           
            fullWidth
          />




          {/* *********************************PASSWORD FEILD****************************** */}




          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            />





         {/* ***************************************************CONFIRM PASSWORD FEILD**************************************** */}





          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={(event) => {
              setConfirmPass(event.target.value);
            }}
            fullWidth
            />




            {/* **********************************************************LOADING BUTTON ON BACKEND WORKING TIME********************************************* */}




           {apiLoading?
              <Button 
                  className="button" 
                  variant="contained" 
                  onClick = {()=>register({username:userName ,password:password, confirmPassword:confirmPass} )}
                  >
                  Register Now
              </Button>
              
              : 
              
              <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                <CircularProgress />
              </Box>}



          {/* **************************************************LOGIN BUTTON DISPLAY ON BOTTOM************************************************ */}




          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to = "/login">
              Login here
             </Link>
          </p>


        </Stack>

      </Box>


      {/* ************************************************************FOOTER ELEMENT********************************************************************** */}
      
      <Footer />
    </Box>
  );
};

export default Register;
