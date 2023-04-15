
/**********************************************************************************PRODUCT PAGE********************************************************************************** */





import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Button
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import Cart from "./Cart"
import "./Products.css";
import ProductCard from "./ProductCard";
import { Typography } from "@mui/material";
import { generateCartItemsFrom } from "./Cart";
import { ScriptElementKindModifier } from "typescript";





/**********************************************************************************************************PRODUCT FUNCTION DEFINATION**************************************************************************************** */







const Products = () => {




  const [productList , setProductList] = useState([]);
  const {enqueueSnackbar} = useSnackbar(); 
  const [firstRender , setFirstRender] = useState(true);
  const[productApiLoading , setProductApiLoading] = useState(true);
  const[isSearching , setIsSearching] = useState(false);  
  const[searchList , setSearchList] = useState([]);
  const [sadEmoji , setSadEmoji] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  const [cartItems , setCartItems] = useState([]);
  const[cardItems , setCardItems] = useState([]);



  // let productList = 
  //   {
  //   "name":"Tan Leatherette Weekender Duffle",
  //   "category":"Fashion",
  //   "cost":150,
  //   "rating":4,
  //   "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  //   "_id":"PmInA797xJhMIPti"
  //   };






/*********************************************************CHECK IF USER IS LOGGED IN OR NOT******************************************************* */




  let isLoggedIn = false;
  const loggedInUser = window.localStorage.getItem("username");
  if(loggedInUser!==null)
  {   
      isLoggedIn =true
  }




  /************************************************USE EFFECT FUNCTION FOR PRODUCT LIST LOADING********************************************************* */
 useEffect(()=>{ 
                (async()=>{
                            performAPICall() ; 
                            let result = await fetchCart(window.localStorage.getItem("token"));
                            setCartItems(result)})()
                } , []);








/**************************************************************GIVEN DEFINATIONS*************************************************************************** */

     
  
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


// const Products = () => {

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */










/*****************************************************************************PERFORM API CALL TO GET PRODUCT LIST*********************************************************************** */







const performAPICall = async () => {


    setProductApiLoading(true);
    await axios.get(`${config.endpoint}/products`)  
      .then((response) => {
                            if(firstRender){                 /*FIRST RENDER IS USED IN USE EFFECT*/
                              setFirstRender(false);
                              setProductList(response.data);    
                           }
                           setProductApiLoading(false);
                          })
      .catch((error) =>{
                        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant:"error"});
                       })

};









  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */













  /*********************************************************************************SEARCH BAR IMPPLEMENTATION************************************************************************ */












  const performSearch = async (text) => {

    
    setIsSearching(true);
    axios.get(`${config.endpoint}/products/search?value=${text}`)
     .then((response)=>{
      
                        setSearchList(response.data);
                       })
     .catch((error)=>{      
                        setSearchList([])
                        setSadEmoji(true);
      
                      })
  };










  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */














  /****************************************************************************DEBOUNCE SEARCH METHOD TO REDUCE NUMBER OF API CALLS******************************************************************************** */
  







  const debounceSearch = (event, debounceTimeout) => { 

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      }


    let timeOut = setTimeout(() => {performSearch(event);}, 1000);    
    setDebounceTimeout(timeOut)
    

  
  };

  
 





  const printProductList =(productList)=>{
    // console.log(productList);
  }





 


  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */











/****************************************************************************FETCH CART FUNCTION TO SHOW ADDED ITEMS TO CART************************************************************************* */
 










  const fetchCart = async (token) => {
    
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      
      /*ONLY AUTHORIZED USER CAN ADD PRODUCT TO CART>>>>>>>>>THEREFORE AUTHORIZATION HEADER REQUIRED*/

      let response = await axios.get(`${config.endpoint}/cart` , {headers:{'Authorization': `Bearer ${token}`}});     
      return response.data
      
    }
    catch (e) {
         if (e.response && e.response.status === 400) {
            enqueueSnackbar(e.response.data.message, 
              { variant: "error" });
           } 
         else {       
            enqueueSnackbar( "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
                {
                  variant: "error"
                });
           }
      return null;
    }

  };












  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */










  /************************************************************************WHEN GIVING ADD TO CAR CHECK IF ALREADY IN CART OR NOT***************************************************************************** */
  
  
  
  
  
  
  
  
  
  const isItemInCart = (items, productId) => {

    var isInCart = false;

    items.forEach((item)=>{       
      if(productId===item.productId){      
        isInCart = true;        
      }

    })

    return isInCart;

  };













  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */














  /*************************************************************************************************ADD TO CART BUTTON FUNCTION AND +- BUTTON IMPLEMENTATION************************************************************************ */
  
  
  
  
  
  
  
  
  
  
  
  
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false },
    
  ) => {



    /***************TAKE VALUES FOR ALL DUMMY VARIABLES FIRST ******************************************/



    items =  cartItems;
    token = window.localStorage.getItem("token");
    products =  productList;




        /*******************************************CHECK WHICH HANDLE****************************************************************
         * **************************************OPTIONS==TRUE: ADD TO CART BUTTON***************************************************
         * *****************************************OPTION S==FALSE INCREMENT DECREMENT BUTTON*******************************************
         * 
       */




    if(options.preventDuplicate && !isLoggedIn){    
      enqueueSnackbar("Login to add an item to the Cart" , {variant:"warning"})
      return ;
    }

  
    

    if( options.preventDuplicate && isItemInCart(items , productId)){
      enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item." , {variant:"warning"});
      return ;
   }

    

     
    await axios.post(
         `${config.endpoint}/cart`,
          { productId: productId, qty: qty },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      
      .then((response)=>{
        setCartItems(response.data);
        setCardItems(generateCartItemsFrom(cartItems , products))
      })
      
      .catch((error)=>{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant:"error"});
      })

  }








//       @typedef {Object} CartItem -  - Data on product added to cart
//  * 
//  * @property {string} name - The name or title of the product in cart
//  * @property {string} qty - The quantity of product added to cart
//  * @property {string} category - The category that the product belongs to
//  * @property {number} cost - The price to buy the product
//  * @property {number} rating - The aggregate rating of the product (integer out of five)
//  * @property {string} image - Contains URL for the product image
//  * @property {string} productId - Unique ID for the product
      
   

    





  return (



    <div>



      {/* **************************************************HEADER COMPONENT********************************************************* */}
     




      <Header hasHiddenAuthButtons={isLoggedIn} whichPage = "product"  loggedInUser = {loggedInUser}>


          <TextField
            className="search-desktop"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}

            placeholder="Search for items/categories"
            name="search"
            onChange = {(event)=>debounceSearch(event.target.value,debounceTimeout)}
          />
        

      </Header>





      {/* *********************************************************SEARCH BAR FOR MOBILE****************************************************** */}

    



      <TextField
        className="search-mobile "
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange = {(event)=>debounceSearch(event.target.value , debounceTimeout)}
      />







      {/* *****************************************************************PRODUCT PAGE DISPLAY BASED ON LOGGEDIN OR LOGGED OUT>>>>LOGGED IN===>(CART DISPLAY)*********************************************************************** */}







    

      {isLoggedIn? 




/*****************************************************LOGGED IN DISPLAY OF PRODUCT PAGE******************************************* */




          (<Grid container spacing={2}>

{/* *************************************************OVERALL CONTAINER GRID FOR PRODUCT CARDS AND CART*********************************** */}



              <Grid container className = "overallContainer" item xs={12} sm={12} md={9}>


 {/* *************************************************PRODUCT GRID FOR PRODUCT CARDS AND TOP PICTURES************************************************* */}




                  <Grid item className = "product-grid"  >


                    {/* **************************************BOX COMPONENT CONTAINER BACKGROUND IMAGE,TEXT AND ALL******************************************************** */}
                    
                    
                    
                    
                    <Box className="hero">
                        <p className="hero-heading">
                          India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                          to your door step
                        </p>
                    </Box>
                    

                  </Grid>




                  {/* ************************************AFTER TEXTS.....IF LOGGED IN ON PRODUCT LOADING TIME............LOADING BUTTON WITH TEXT SHOULD BE DISPLAYED********************************************************* */}




                
              
                
        
                {isSearching? 
                    <ProductCard  product={searchList} />
                    :
                    productApiLoading?         
                          <Box className = "loading" >
                            <CircularProgress />
                            <div className = "loadingText">
                              Loading Products...
                            </div>
                          </Box>
                         :
                          <ProductCard product={productList} handleAddToCart={addToCart} />
                          
                 }






                 {/* ***********************************************WHEN SEARCHING SOMETIMES PRODUCTS MAY NOT PRESENT...........SAD EMOTICON DISPLAY FUNCTION********************************************** */}








                {sadEmoji?
                    <Box class="loading">
                       <SentimentDissatisfied />
                       <div>
                        No products found
                        </div>
                    </Box>
                    :
                    null
                 }
                  
              
              </Grid>






{/* *************************************************************************GRID FOR PRODUCTS ENDS************************************************************************* */}



{/* **********************************************************************GRID FOR CART DISPLAY******************************************************************* */}







             <Grid  item  className = "cartGrid" md={3}  >
             
                <Cart
                 products = {productList} 
                 items={generateCartItemsFrom(cartItems , productList)} 
                 handleQuantity={addToCart} 
                 className="card" />
            </Grid>






{/* *******************************************************************OVERALL GRID ENDS***************************************************************************** */}
            
          </Grid>)
          
          
      :




/*****************************************************************************************SAME FUNCTIONALITY FOR NOT LOGGED IN USER ......................WITHPOUT CART GRID*********************************************************** */








       (
       
       <Grid container className = "overallContainer" spacing={2}>
        
          <Grid item className="product-grid" >
              <Box className="hero">
                <p className="hero-heading">
                  India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                  to your door step
                </p>
              </Box>
            {/* <Grid/> */}
          </Grid>
          

          
          
           
          {isSearching?  
                <ProductCard product={searchList} />
                :
                productApiLoading?         
                    <Box className = "loading" >
                        <CircularProgress />
                        <div className = "loadingText">
                          Loading Products...
                        </div>
                      </Box>
                      :
                      <ProductCard product={productList} handleAddToCart = {addToCart} />
          }

          
          {sadEmoji?
              <Box class="loading"> 
                  <SentimentDissatisfied />
                  <div>
                    No products found
                  </div>
              </Box>
              :
              null
          }
  
       
        </Grid>)
       }








{/* ******************************************************************FINALLY FOOTER INCLUDED********************************************************** */}






       <Footer/>



     </div>
  );
};

export default Products;
