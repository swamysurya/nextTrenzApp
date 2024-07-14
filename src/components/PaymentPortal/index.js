import {useState, useContext} from 'react'

import './index.css'
import CartContext from '../../context/CartContext'

// options for radio input elements
const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const PaymentPortal = props => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const [selectedValue, setSelectedValue] = useState(paymentOptionsList[0].id)

  const updatePaymentMethod = event => {
    setSelectedValue(event.target.id)
  }

  const onPlaceOrder = () => {
    setIsOrderPlaced(true)
  }

  const {cartList} = useContext(CartContext)
  // for calculate the whole items price
  const totalCheckoutPrice = cartList.reduce(
    (total, eachProduct) => total + eachProduct.quantity * eachProduct.price,
    0,
  )
  const {close} = props
  return (
    <div className="popupContent">
      {isOrderPlaced ? (
        <p className="order-confirmation">
          Your order has been placed successfully
        </p>
      ) : (
        <>
          <button type="button" className="close" onClick={close}>
            &times;
          </button>
          <h2 className="payment-option-heading">Payment Options</h2>
          <p className="items-count">
            Number of items: <span id="popupItemCount">{cartList.length}</span>
          </p>
          <p className="total-price">
            Total price: $<span id="popupTotalPrice">{totalCheckoutPrice}</span>
          </p>

          <h1 className="payments-sub-heading">Select Payment Method: </h1>
          <ul className="payment-method-inputs">
            {paymentOptionsList.map(eachMethod => (
              <li
                key={eachMethod.id}
                className="payment-method-input-container"
              >
                <input
                  className="payment-method-input"
                  id={eachMethod.id}
                  type="radio"
                  name="paymentMethod"
                  disabled={eachMethod.isDisabled}
                  onChange={updatePaymentMethod}
                />
                <label
                  className={`payment-method-label ${
                    eachMethod.isDisabled ? 'disabled-label' : ''
                  }`}
                  htmlFor={eachMethod.id}
                >
                  {eachMethod.displayText}
                </label>
              </li>
            ))}
          </ul>

          <button
            id="confirmOrderButton"
            type="button"
            className="order-button"
            disabled={selectedValue !== paymentOptionsList[4].id}
            onClick={onPlaceOrder}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default PaymentPortal
