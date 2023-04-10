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

const ProductCard = ({ product, handleAddToCart }) => {
  return (

     product.map((character)=>(
      <Grid item className = "individualProduct" xs={6} md = {3} >
    <Card className="card">
      {/* <CardActions> */}
        <CardMedia
        component="img"
        image = {character.image}
        alt= "product-image"
        >

        </CardMedia>
        <CardContent>
          <Typography component="div">
            {character.name}
          </Typography>
          <Typography >
            <strong>${character.cost}</strong>
            
          </Typography>
          <Rating name="read-only" value={character.rating} readOnly />
          <Typography variant="button">
            <Button className = "card-button">ADD TO CART</Button></Typography>
        </CardContent>

      {/* </CardActions> */}
    </Card>
    </Grid>))
  );
};

export default ProductCard;
