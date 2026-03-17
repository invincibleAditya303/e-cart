import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      

      return (
        <ul className="cart-list">
          {
            cartList.length > 0 && cartList.map(eachCartItem => (
              <CartItem key={eachCartItem._id} cartItemDetails={eachCartItem} />
            ))
          }
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView