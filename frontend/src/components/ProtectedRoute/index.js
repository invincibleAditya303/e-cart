import { Redirect, Route } from "react-router-dom"
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
    const jwtToken = Cookies.get('userDetails')

    if (!jwtToken) {
        return <Redirect to="/login" />
    }

    return <Route {...props} />
        
}

export default ProtectedRoute