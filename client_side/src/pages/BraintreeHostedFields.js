// BraintreeHostedFields.js
import React, { useEffect, useRef, useState } from "react";
import braintree from "braintree-web";

const BraintreeHostedFields = ({ clientToken, onPaymentMethodReceived }) => {
    const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (clientToken) {
            braintree.client.create({
                authorization: clientToken,
            }, (err, clientInstance) => {
                if (err) {
                    console.error(err);
                    return;
                }
                braintree.hostedFields.create({
                    client: clientInstance,
                    styles: {
                        'input': {
                            'font-size': '14px',
                            'color': '#3a3a3a'
                        },
                        ':focus': {
                            'color': 'black'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#card-number',
                            placeholder: '4111 1111 1111 1111'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: '123'
                        },
                        expirationDate: {
                            selector: '#expiration-date',
                            placeholder: 'MM / YY'
                        }
                    }
                }, (err, instance) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    setHostedFieldsInstance(instance);
                });
            });
        }
    }, [clientToken]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (hostedFieldsInstance) {
            hostedFieldsInstance.tokenize((err, payload) => {
                if (err) {
                    console.error(err);
                    return;
                }
                onPaymentMethodReceived(payload.nonce);
            });
        }
    };

    return (
        <form id="payment-form" ref={formRef} onSubmit={handleSubmit}>
            <div id="card-number"></div>
            <div id="expiration-date"></div>
            <div id="cvv"></div>
            <button type="submit" className="btn btn-primary mt-3">Make Payment</button>
        </form>
    );
};

export default BraintreeHostedFields;
