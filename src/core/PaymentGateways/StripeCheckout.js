// import React, { useState, useEffect } from 'react'
// import { IsAuthenticated } from '../../auth/helper';
// import { cartEmpty, loadCart } from '../helper/CartHelper';
// import { Link } from 'react-router-dom';


// const StripeCheckout = ({
//     products,
//     setReload = f => f,
//     reload = undefined
// }) => {

//     const token = IsAuthenticated() && IsAuthenticated().token
//     const userId = IsAuthenticated() && IsAuthenticated().user._id

//     const [data, setData] = useState({
//         loading: false,
//         success: false,
//         error: "",
//         address: ""

//     })

//     const getFinalPrice = () => {
//         let amount = 0;
//         products.map(product => {
//             amount += product.price;
//         })
//         return amount;
//     }

//     const showStripeButton = () => {
//         return IsAuthenticated() ? (
//             <button className="btn btn-success">Pay</button>
//         ) : (<Link to="/signIn">
//             <button className="btn btn-warning">Login</button>
//         </Link>)
//     }

//     return (
//         <div className="text-white">
//             <h1>chekout loaded{getFinalPrice()}<br />{showStripeButton()}</h1>
//         </div>
//     )
// }
// export default StripeCheckout;