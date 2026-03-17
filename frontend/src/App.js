import { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import AllProducts from './components/AllProducts'
import ProductItemDetails from './components/ProductItemDetails'
import CartContext from './context/CartContext'
import Cart from './components/Cart'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {
    cartList: [],
    paymentMethod: '',
    displayMessage: false,
  }

  componentDidMount() {
    this.fetchCartDetails()
  }
  
  fetchCartDetails = async () => {  
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
  
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      this.setState({cartList: data.cart.items})
    }
     
  }

  decrementCartItemQuantity = async (product, size) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/items/decrease`
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({productId: product._id, size}),
      credentials: 'include'
    }

    const response = await fetch(apiUrl, options)
    await response.json()

    window.location.reload()
    
  }

  incrementCartItemQuantity = async (product, size) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/items/increase`
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({productId: product._id, size}),
      credentials: 'include'
    }
  
    const response = await fetch(apiUrl, options)
    await response.json()
   
    window.location.reload()
  }


  removeAllCartItems = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/clear`
    const options = {
      credentials: 'include',
      method: 'DELETE'
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      
      window.location.reload()
    }
    
  }

  removeCartItem = async (productId, size) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/remove`
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({id: productId, size}),
      credentials: 'include'
    }

    const response = await fetch(apiUrl, options)
    await response.json()
   
    window.location.reload()
    
  }

  addCartItem = async (product) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/add`
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(product),
      credentials: 'include'
    }

    const response = await fetch(apiUrl, options)
    await response.json()
   
    window.location.reload()
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <ProtectedRoute exact path='/' component={AllProducts} />
          <ProtectedRoute exact path='/products/:id' component={ProductItemDetails} />
          <ProtectedRoute exact path='/cart' component={Cart} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/register' component={RegisterForm} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default withRouter(App)