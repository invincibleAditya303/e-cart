import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
      } = value

      const jwtToken = Cookies.get('userDetails')

      let orderAmount

      if (jwtToken) {
         orderAmount = cartList.map(
          eachProduct => eachProduct.product.price * eachProduct.qty,
        )
      } else {
        orderAmount = cartList.map(
          eachProduct => eachProduct.price * eachProduct.qty
        )
      }

      console.log(orderAmount)

      const initialValue = 0
      const totalAmount = orderAmount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      )

      console.log(totalAmount)


      const orderQuantity = cartList.length
      return (
        <div className="cart-summary-container">
          <h1 className="order-heading">
            Order Total:
            <span className="order-amount">Rs {totalAmount}/-</span>
          </h1>
          <p className="order-quantity">{orderQuantity} items in cart</p>
          <button className="checkout-button" type="button">
              Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
