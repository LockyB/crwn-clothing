import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishablekey = 'pk_test_51IRKzlB98NKv9GekLAsttq9a4G3iNO1lu2sHFERyNvOoVWDbM61yixIHLsKMBY0pSSHVsxgVPJlCvRfmQzljsHls002nm02pF3'

  const onToken = token => {
    console.log(token);
    return alert('Payment Successful');
  }

  //check https://github.com/azmenak/react-stripe-checkout
  return (
    <StripeCheckout
      label='Pay Now'
      name='Fake Clothing Ltd.'
      billingAddress
      shippingAddress
      image='http://svgshare.com/i/CUz.svg'
      description={`Your total is £${price}`}
      amount={priceForStripe}
      currency='GBP'
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishablekey}
    />
  )
};

export default StripeCheckoutButton;