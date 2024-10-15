import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const Shopcontext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const diliveryFee = 10;
    const [searchString, setSearchString] = useState('');
    const [showSearch, setShowsearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const FetchProductData = async () => {
        try {
            const response = await fetch(backendURL + "/api/product/all", {
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json',
                //     'token': token
                // },
                method: "GET",
            })
            const data = await response.json();
            if (data.sucess) {
                setProducts(data.productList)
            } else {
                toast.error("Failed to get the Product Data Try login again")
            }
        } catch (error) {
            console.error(error)
        }
    }
    const FetchCartData = async (token) => {
        try {
            const response = await fetch(backendURL + "/api/cart/getcart", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "POST",
                body: JSON.stringify({})
            })
            const data = await response.json();
            if (data.sucess) {
                setCartItems(data.cartData)
            } else {
                toast.error("Failed to get the Product Data Try login again")
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        FetchProductData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            FetchCartData(localStorage.getItem("token"));
        }
    }, [])




    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return null;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                const response = await fetch(backendURL + "/api/cart/addcart", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    },
                    body: JSON.stringify({ itemId, size })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Something went wrong');
                }

                const result = await response.json();

            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }

    }

    const getCartCount = () => {
        let totalcount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalcount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalcount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if (token) {
            try {
                const response = await fetch(backendURL + "/api/cart/updatecart", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    },
                    body: JSON.stringify({ itemId, size, quantity })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Something went wrong');
                }

                const result = await response.json();

            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }

    }
    const getcartamout = () => {
        let totoalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totoalAmount += itemInfo?.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
        return totoalAmount;
    }

    const value = {
        products, currency, diliveryFee, searchString, setSearchString, showSearch, setShowsearch, cartItems, addToCart, getCartCount, updateQuantity, getcartamout, navigate, backendURL, setToken, token, setCartItems
    }
    return (
        <Shopcontext.Provider value={value}>
            {props.children}
        </Shopcontext.Provider>
    )
}

export default ShopContextProvider;