import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons , whichPage  , loggedInUser}) => {
  // console.log(hasHiddenAuthButtons);
  // const isLoggedIn = hasHiddenAuthButtons.isLoggedIn;
  // console.log(hasHiddenAuthButtons);
  
  
  // console.log(whichPage);
  const history = useHistory();
  
  const exploreButton = ()=>{
    history.push("/")
    // console.log("hii");
    
    // window.location.href= "/";
  }
 
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
       {whichPage=="product"?
        hasHiddenAuthButtons?
       <Stack direction="row" spacing={2} alignItems = "center">
            <Avatar src = "avatar.png" alt = {loggedInUser}></Avatar>
             <span>{loggedInUser}</span>
            <Button className="explore-button logoutProductHeader"
            variant = "text"
            onClick = {()=>{history.push("/"); window.localStorage.removeItem("username");
                      window.localStorage.removeItem("balance") ; window.localStorage.removeItem("token")}}
            > LOGOUT</Button>
            </Stack>:<Stack direction="row"> <Button 
          className = "explore-button loginProductHeader"
          variant = "text"
          onClick = {()=>{history.push("/login")}} >
          LOGIN
          </Button>
          <Button 
          className = "explore-button registerHeaderButton"
          variant = "text"
          onClick = {()=>{history.push("/register")}} >
          REGISTER
          </Button></Stack>: <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick = {()=>{exploreButton()}}

        >
         Back to explore
        </Button>}

       
          

          {/* </Stack><Button className = "explore-button logoutProductHeader"
          variant = "text"
          onClick = {} */}
          
          
          
          
         
      </Box>
    );
};

export default Header;
