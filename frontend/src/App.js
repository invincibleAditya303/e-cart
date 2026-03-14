import { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

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
    const jwtToken = Cookies.get('userDetails')
  
    if (jwtToken) {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
         }
      }
  
      const response = await fetch(apiUrl, options)
      const data = await response.json()
  
      this.setState({cartList: data.items})
    } else {
      this.props.history.replace('/login')
    }
  }

  decrementCartItemQuantity = async (product) => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.props.history.replace('/login')
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/items/decrease`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(product)
      }
      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
      window.location.reload()
    }
  }

  incrementCartItemQuantity = async (product) => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.props.history.replace('/login')
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/items/increase`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(product)
      }
      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
      window.location.reload()
    }
  }

  removeAllCartItems = async () => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.props.history.replace('/login')
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/clear`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        method: 'DELETE'
      }

      const response = await fetch(apiUrl, options)
      if (response.ok) {
        console.log('Cart item deleted')
        window.location.reload()
      }
    }
  }

  removeCartItem = async productId => {
    const jwtToken = Cookies.get('userDetails')

    if (!jwtToken) {
      this.props.history.replace('/login')
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/remove`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({id: productId})
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()
      console.log(data)
      window.location.reload()
    }
  }

  addCartItem = async (product) => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.props.history.replace('/login')
    } else {
      console.log(product)
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/add`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(product)
      }
      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
      window.location.reload()
    }
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