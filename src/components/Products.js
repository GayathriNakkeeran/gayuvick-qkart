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
import "./Products.css";
import ProductCard from "./ProductCard";
import { Typography } from "@mui/material";



const Products = () => {
  const [productList , setProductList] = useState([]);
  const {enqueSnackBar} = useSnackbar();
  useEffect(()=>performAPICall() , []);
  const [firstRender , setFirstRender] = useState(true);
  const[productApiLoading , setProductApiLoading] = useState(true);
  const[isSearching , setIsSearching] = useState(false);  
  const[searchList , setSearchList] = useState([]);
  const [sadEmoji , setSadEmoji] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(0);

  // let productList = 
  //   {
  //   "name":"Tan Leatherette Weekender Duffle",
  //   "category":"Fashion",
  //   "cost":150,
  //   "rating":4,
  //   "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  //   "_id":"PmInA797xJhMIPti"
  //   };
  let isLoggedIn = false;
  const loggedInUser = window.localStorage.getItem("username");

  if(loggedInUser!==null){
    // console.log(loggedInUser)
      isLoggedIn =true}
 
  
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
  const performAPICall = async () => {
    setProductApiLoading(true);
    await axios.get(`${config.endpoint}/products`)
    // console.log(productList);
    
  .then((response) => {
    if(firstRender){
    setFirstRender(false);
    
    
    
    // console.log("render")
    setProductList(response.data);
    // console.log("render");
  }
  setProductApiLoading(false);
  }).catch((error) =>{
    console.log(error);
    enqueSnackBar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant:"error"});
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
  const performSearch = async (text) => {
    // console.log(`${config.endpoint}/products/search?value=${text}`);
    setIsSearching(true);

    axios.get(`${config.endpoint}/products/search?value=${text}`)
    .then((response)=>{
      console.log("fetcing")
    setSearchList(response.data);
    
     
    // console.log(productList)
  })
    .catch((error)=>{
      console.log("error")
      
    
      setSearchList([])
      setSadEmoji(true);
      // enqueSnackBar("Nothing to display");
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
  
  const debounceSearch = (event, debounceTimeout) => {
    // console.log(debounceTimeout)

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      
      

      }
    let timeOut = setTimeout(() => {
             performSearch(event);}, 1000);
    // console.log(timeOut+"timeout")
    // console.log(debounceTimeout+"debounce")
    setDebounceTimeout(timeOut)
    //  setDebounceTimeout(timeOut)

    
      //  let timeout;

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  

    // The callback function to be executed after 
    // the debounce time has elapsed
    // const later = setTimeout(()=>performSearch(event) , debounceTimeout) 
    // clearTimeout(later);
      // null timeout to indicate the debounce ended
      // timeout = null;
      
      // Execute the callback
      // performSearch(event);
    // };
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the 
    // inside of the previous setTimeout  
    // clearTimeout(timeout);
    
    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    // timeout = setTimeout(later, debounceTimeout);
  
  };

  
  // performAPICall();

  const printProductList =(productList)=>{
    console.log(productList);
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
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
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
  const isItemInCart = (items, productId) => {
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
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
  };


  return (
    <div>
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

      {/* <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}

      {/* </Header> */} 

      {/* Search view for mobiles */}
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
        onChange = {(event)=>debounceSearch(event.target.value , 500)}
      />
       <Grid container spacing={2}>
         <Grid item className="product-grid" >
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
           </Grid>
           {/* <Button onClick={()=>{printProductList()}}>Click me</Button> */}
           
         {isSearching?  <ProductCard product={searchList} />:productApiLoading?         
       <Box className = "loading" ><CircularProgress /><div className = "loadingText">Loading Products...</div></Box>:
       <ProductCard product={productList} />}
       {sadEmoji?<Box class="loading"> <SentimentDissatisfied /><div>No products found</div></Box>:null}
       </Grid>
      <Footer />
    </div>
  );
};

export default Products;
