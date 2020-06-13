import React, { useState, useEffect } from 'react'
import { loadCart } from '../helper/CartHelper';
import { cartEmpty } from '../helper/CartHelper';
import { Link } from 'react-router-dom';
import { getmeToken, processPayment } from '../helper/PaymentHelper';
import { createOrder } from '../helper/OrderHelper'
import { IsAuthenticated } from '../../auth/helper';
import DropIn from 'braintree-web-drop-in-react'

const BraintreePayment = ({ products, setReload = f => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = IsAuthenticated() && IsAuthenticated().user._id;
    const token = IsAuthenticated() && IsAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            if (info.error) {
                setInfo({ ...info, error: info.error });
            } else {
                const clientToken = info.clientToken;
                setInfo({ clientToken });
            }
        });
    };

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>
                            Buy
              </button>
                    </div>
                ) : (
                        <h3>Please login or add something to cart</h3>
                    )}
            </div>
        );
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({ ...info, success: response.success, loading: false });
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction_id,
                        amount: response.transaction_amount
                    };
                    console.log("PAYMENT SUCCESS");
                    createOrder(userId, token, orderData);
                    cartEmpty();
                    setReload(!reload);
                    //TODO: force reload
                })
                .catch(error => {
                    setInfo({ loading: false, success: false });
                    console.log(error)
                    console.log("PAYMENT FAILED");
                });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };

    return (
        <div>
            <h3>Your bill is {getAmount()} $</h3>
            {showbtdropIn()}
        </div>
    );
};

export default BraintreePayment;

