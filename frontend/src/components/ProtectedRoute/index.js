import { useEffect, useState } from "react"
import { Redirect, Route } from "react-router-dom"

const ProtectedRoute = ({component: Component, ...rest}) => {
    const [isAuth, setIsAuth] = useState(null)

    useEffect( () => {
        const verifyUser = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/api/auth/verify`
                const options = {
                method: 'GET',
                credentials: 'include',
                }

                const response = await fetch(url, options)

                if (response.ok) {
                    const data = await response.json()
                    setIsAuth(data.success)
                } else {
                    setIsAuth(false)
                }
            } catch (error) {
                setIsAuth(false)
            }
        }
        verifyUser()
    }, [])

    if (isAuth === null) {
        return <div>Loading...</div>
    }

    return (
        <Route 
            {...rest}
            render={props => isAuth ? <Component {...props}/> : <Redirect to='/login' />}
        />
    )
        
}

export default ProtectedRoute