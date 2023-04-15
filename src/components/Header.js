/*******************************************************************HEADER PAGE****************************************************************************8 */

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { config } from "../App";
import axios from "axios";
import { Avatar, Button, Stack,TextField , InputAdornment  } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";




/**********************************************************************EXPORTING HEADER FUNCTION STARTS***************************************************** */





const Header = (
  { 
    children,
    hasHiddenAuthButtons ,
    whichPage  , 
    loggedInUser
  }

  ) =>
   {  
  
      const history = useHistory(); 
      const exploreButton = ()=>
      {
        history.push("/")    
      } 









    return (
      <Box className="header">
          <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
          </Box>



          {/* ******************************************************CHILDRE PROP HERE IS SEARCH BAR FOR MOBILE,,,,,,IF IT IS PRESENT THEN DISPLAY************************************************************************************* */}
      
          {children}  







          {/* **************************************************IF IT IS PRODUCU PAGE(INITIAL PAGE , IF USER LOGGED IN =====>  SHOW USER LOGO ,NAME , LOGOUT BUTTON***********************************************************************
           {****************************************************NOT LOGGED IN =====> SHOW LOGIN REGISTER BUTTON**************************************************************************************************************************                                                    
          **********************************************************IF LOGIN OR REGISTER PAGE=====> SHOW  BACK TO EXPLORE BUTTON********************************************************************************************************) */}








          {whichPage=="product"?
                                hasHiddenAuthButtons?
                                                     <Stack direction="row" spacing={2} alignItems = "center">
         
                                                        <Avatar src = "avatar.png" alt = {loggedInUser}>   </Avatar>

                                                        <span>  {loggedInUser}  </span>

                                                        <Button
                                                               className="explore-button logoutProductHeader"
                                                                variant = "text"
                                                                onClick = {
                                                                            ()=>{   history.push("/");
                                                                                    window.localStorage.removeItem("username");
                                                                                    window.localStorage.removeItem("balance") ; 
                                                                                    window.localStorage.removeItem("token")
                                                                                  }
                                                                           }
                                                         >LOGOUT
                                                           
                                                          
                                                        </Button>


                                                    </Stack>
                                                    
                                                    
                                                    :
                                                    
                                                      <Stack direction="row"> 
                                                          <Button 
                                                                  className = "explore-button loginProductHeader"
                                                                  variant = "text"
                                                                  onClick = {()=>{history.push("/login")}} >

                                                                  LOGIN
                                                          </Button>

                                                          <Button 
                                                                className = "explore-button registerHeaderButton"
                                                                variant = "text"
                                                                onClick = {
                                                                            ()=>{
                                                                                  history.push("/register")
                                                                                  }
                                                                          } >
                                                                REGISTER
                                                          </Button>
                                                      </Stack>
                                                    
                                 : 
                                                    
                                                    
                                <Button
                                        className="explore-button"
                                        startIcon={<ArrowBackIcon />}
                                        variant="text"
                                        onClick = {
                                          ()=>{
                                          exploreButton()
                                        
                                        }
                                      }

                                      >
                                      Back to explore
                                </Button>}    
          </Box>
    );
};

export default Header;
