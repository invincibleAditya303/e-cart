import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
      } = value

      let orderAmount

      orderAmount = cartList.map(
        eachProduct => eachProduct.product.price * eachProduct.qty,
      )


      const initialValue = 0
      const totalAmount = orderAmount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      )


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
