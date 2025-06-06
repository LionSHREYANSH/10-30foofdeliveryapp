
import React, { useContext, useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { contextapi } from '../Contextapi';

const FoodProducts = () => {
    const [product, setProduct] = useState([]);
      const [message , setMessage] = useState("")
      const [showLoginAlert, setShowLoginAlert] = useState(false);
      const [inputtext, setInputtext] = useState("");  // State for login prompt

      const { cart, setCart, loginname, setUser } = useContext(contextapi);
    //   console.log(setUser)

    useEffect(()=>{
        fetch("/api/usershowlist").then((res)=>{return res.json()}).then((data)=>{
            // console.log(data)
            if (data.status === 200) {
                setProduct(data.apiData);
              } else {
                setMessage(data.message);
              }
        })
    } , [])

    //-----------------------------------------------------------------


    function handlecart(e, productid) {
    
        // Check if the user is logged in before adding the product to the cart
        if (!loginname) {
          // If the user is not logged in, show the login alert
          setShowLoginAlert(true);
          return;
        }
    
        let _cart = { ...cart };
        console.log(_cart)
    
        if (!_cart.items) {
          _cart.items = {};
          // console.log(_cart.items)
        }
    
        if (!_cart.items[productid]) {
          _cart.items[productid] = 1;
        } else {
          _cart.items[productid] += 1;
        }
    
        if (!_cart.totalitems) {
          _cart.totalitems = 1;
        } else {
          _cart.totalitems += 1;
        }
    
        setCart(_cart); // Update the cart context
        console.log(_cart);
         localStorage.setItem("cart",JSON.stringify(_cart));
       }


       const inputhandler = (e) => {
        setInputtext(e.target.value.toLowerCase());
      };

    

    //----------------------------------------------------------------
    return (
        <div>
           <MDBContainer>
             <input id="search"
        type="search"
        className="form-control rounded mt-3"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={inputhandler}
        value={inputtext} // Use 'value' instead of 'val'
      />
      </MDBContainer>
            <MDBContainer>
                <MDBRow>
                    {product
                     .filter((el) => el.PName.toLowerCase().includes(inputtext))
                    .map((product , key)=>(
                                    <MDBCol size='md-4 mt-2'>
                                    <MDBCard>
                                        <MDBCardImage src={`upload/${product.PImg}`} style={{ height: "20rem" }}  position='top' alt='...' />
                                        <MDBCardBody>
                                            <MDBCardTitle>{product.PName}</MDBCardTitle>
                                            <MDBCardText>{product.PDesc}
                                            <MDBCardTitle><i class="bi bi-currency-rupee"></i> {product.PPrice}</MDBCardTitle>
                                                </MDBCardText>
                                            <MDBBtn href='#' onClick={(e) => handlecart(e, product._id)}>Add To Cart</MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                    ))}
                
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default FoodProducts