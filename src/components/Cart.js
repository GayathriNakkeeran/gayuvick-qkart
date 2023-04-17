/***************************************************************************CART FUNCTINALITY***************************************************************/






/******************************************************************************REQUIRED IMPORTS*********************************************************************************/
/**************************************************************************WHY THESE IMPORTS??   NOT KNOWN :( ********************************************************************/ 






import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";








// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */








/********************************GENERATE CART ITEMS FROM METHOD---> TO GENERATE CARTDISPLAY FROM CARTLIST(ID,QTY) && PRODUCT LIST ************************************/










export const generateCartItemsFrom = (cartData, productsData) => { 

  /***VARIABLE DECLARATION TO STORE OUTPUT***/
  let cardItem=[]
  /*FOR EACH LOOP WONT WORK HERE...USE FOR OF LOOP*/
  for(const item of cartData){
    productsData.forEach((product)=>
    { 
      if(item.productId === product._id)
      {

        /*******ONLY PRODUCT ID AND QUANTITY IS PRESENT , WE HAVE TO DEFINE ALL OTHER ATTRIBUTES BY MATCHING WITH ALREADY AVAILABLE DATA*******/

        item["name"] = product.name;
        item["category"] = product.category;
        item["cost"] = product.cost;
        item["rating"] = product.rating;
        item["image"] = product.image;
        cardItem.push(item);

      }
    }
    )
  }  
  return cardItem;
};



/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */






/**********************************************************GET TOTAL CART VALUE********************************************************************************/









export const getTotalCartValue = (items) => {

  let cost = 0;

  /*TOTAL COST CALCULATED BY MULTIPLYTING EVERY ITEM QUANTITY BY ITS COST AND SUM ALTOGETHER*/
  items.forEach((item)=> cost+=(item.qty * item.cost));
  return cost;

};







/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */








/**************************************************************************ITEM QUANTITY METHOD--> TO DISPLAY INDIVIDUAL ITEM QUANTITY AND + - BUTTON IN CART ****************************************************** */






const ItemQuantity = (
  /*INPUT PARAMETERS FOR THIS METHOD*/
  /*ID IS NOT GIVVEN IN DEFINATION*/
  /*HANDLE ADD DELETE IS GIVEN AS PROPS FORM WHERE ITEM QUANTITY IS CALLED*/
  {
    isReadOnly,
   value,
   handleAdd,
   handleDelete,
   id
  }
  ) => {
    if(isReadOnly){
      return(
        <Box padding="0.5rem" data-testid="item-qty">
          Qty:{value}
        </Box>
      )
    }

  return(  
    
    <Stack direction="row" alignItems="center">
      
      <IconButton size="small" color="primary" onClick={()=>{handleAdd("" , [] , [] , id , value-1 , {preventDuplicate:false})}}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={()=>{handleDelete("" , [] , [] , id , value+1 , {preventDuplicate:false})}}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};





/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */









/**********************************************************************getTotalCartItems***************************************************************************************** */






export const getTotalItems = (cartItem)=>{

  let totalItem = 0;
  cartItem.forEach((item)=>{
    totalItem+=1;

  })
  return totalItem;
}









/******************************************************************ORIGINAL EXPORTING CART COMPONENT********************************************************************* */









const Cart = (
  {
   isReadOnly,
   products,
   items,
   handleQuantity,
}) => {
  

       const history = useHistory();
       if (!items.length) 
       {
        return (
            <Box className="cart empty">
               <ShoppingCartOutlined className="empty-cart-icon" />
              <Box color="#aaa" textAlign="center">
                  Cart is empty. Add more items to the cart to checkout.
              </Box>
            </Box>
           );
       }


       /*ELSE CONDITION */
       return(   
          <>
            <Box className="cart">
                {items.map((wishlist) => (
      
                    <Box display="flex" alignItems="flex-start" padding="1rem" key = {wishlist.productId}>

                        <Box className="image-container">

                           <img
                              // Add product image
                              src={wishlist.image}
                              // Add product name as alt eext
                              alt={wishlist.name}
                              width="100%"
                              height="100%"
                            />
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="6rem"
                            paddingX="1rem"
                         >

                            <div>{wishlist.name}</div>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                             >

                             

                              <ItemQuantity
                                        isReadOnly={isReadOnly} value={wishlist.qty}  handleAdd={handleQuantity} handleDelete={handleQuantity} id = {wishlist.productId}
                                        // Add required props by checking implementation
                                />
                                
                
                                <Box padding="0.5rem" fontWeight="700">
                                  ${wishlist.cost}
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                      )
     
                     )
                  }
       
        
            <Box
              padding="1rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
             >
                <Box color="#3C3C3C" alignSelf="center">
                  Order total
                </Box>

                <Box
                  color="#3C3C3C"
                  fontWeight="700"
                  fontSize="1.5rem"
                  alignSelf="center"
                  data-testid="cart-total"
                 >
                  ${getTotalCartValue(items)}
                  

                  {/* ${generateCartItemsFrom(items,products)} */}
                </Box>
            </Box>

           {isReadOnly? null:
                <Box display="flex" justifyContent="flex-end" className="cart-footer">
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  className="checkout-btn"
                  onClick = {()=>{history.push("/checkout") }}
                 >
                  Checkout
                </Button>
            </Box>} 

          </Box>

         </>
    
  );
};



export default Cart;
