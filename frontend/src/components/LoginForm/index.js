import {Component} from 'react'

import './index.css'
import { Link } from 'react-router-dom'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
 
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password, } = this.state
    const userDetails = {email, password}
    const url = `${process.env.REACT_APP_API_URL}/api/auth/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    const data = await response.json()
    
    if (data.success) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.message)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="email-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    )
  }

  render() {
    
            const {showSubmitError, errorMsg} = this.state

            return (
                <div className="login-form-container">
                    <img
                    src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1744568132/shopping-cart-3d-render-icon_gmd4xd.jpg"
                    className="login-website-logo-mobile-img"
                    alt="website logo"
                    />
                    <img
                    src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1757255972/member-log-membership-username-password-concept_aa6pe9.jpg"
                    className="login-img"
                    alt="website login"
                    />
                    <form className="form-container" onSubmit={this.submitForm}>
                    <img
                        src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1744568132/shopping-cart-3d-render-icon_gmd4xd.jpg"
                        className="login-website-logo-desktop-img"
                        alt="website logo"
                    />
                    <div className="input-container">{this.renderEmailField()}</div>
                    <div className="input-container">{this.renderPasswordField()}</div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                      <button type="button" className='login-button'>
                        <Link to='/register' className="login-button">
                          Register
                        </Link>
                      </button>
                    {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                    </form>
                </div>
            )
   
  }
}

export default LoginForm
