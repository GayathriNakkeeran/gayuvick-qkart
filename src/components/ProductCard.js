
/***************************************************************************PRODUCT CARD PAGE******************************************************************************* */

import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Grid
} from "@mui/material";
import React from "react";
import "./ProductCard.css";




/*************************************************************************ORIGINAL EXPORTING PRODUCT CARD CONTENT************************************************************** */







const ProductCard = (
  { product,
    handleAddToCart
   }) => {




  return(

     product.map((character)=>(

      <Grid 
          item key = {character._id}
          className = "individualProduct"
          xs={6} 
          md = {3} >
       
         <Card className="card">


{/* ***************************************************CARD MEDIA TO SHOW IMAGE*****************************************************************8 */}




     
            <CardMedia
               component="img"
               image = {character.image}
               alt= "product-image"
             >

            </CardMedia>




{/* ******************************************************CARD CONTENT TO SHOW CONTENT OF CARD******************************************************** */}



            <CardContent>


          {/* ***************************NAME OF PRODUCT************************* */}



                <Typography component="div">
                      {character.name}
                </Typography>


          {/* *****************************COST OF PRODUCT************************* */}



                <Typography >
                  <strong>${character.cost}</strong>            
                </Typography>


          {/* ********************************STAR RATING FOR PRODUCT******************* */}



                <Rating name="read-only" value={character.rating} readOnly />



          {/* **********************************ADD TO CART BUTTON FOR PRODUCT********************************** */}





                <Typography variant="button">

                  <Button 
                    className = "card-button" 
                    onClick = {
                      ()=> {handleAddToCart( "" ,[] , [], character._id , 1 ,{preventDuplicate:true})}}>
                        ADD TO CART
                  </Button>
                  
                </Typography>


                

            {/* ***********************************CARD CONTENT ENDS************************************************* */}

            </CardContent>

     
         </Card>


      </Grid>))
  );
};

export default ProductCard;
