import Popup from 'reactjs-popup'
import {Component} from 'react'
import PaymentPortal from '../PaymentPortal'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const totalCheckoutPrice = cartList.reduce(
            (total, eachProduct) =>
              total + eachProduct.quantity * eachProduct.price,
            0,
          )
          return (
            <div className="cart-summary-container">
              <div>
                <h1 className="order-total-heading">
                  Order Total:
                  <span className="span-total">Rs {totalCheckoutPrice}/-</span>
                </h1>
                <p className="item-count-para">
                  {cartList.length} items in cart
                </p>
                <Popup
                  trigger={
                    <button className="checkout-btn button" type="button">
                      Checkout
                    </button>
                  }
                  modal
                  nested
                >
                  {close => <PaymentPortal close={close} />}
                </Popup>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
