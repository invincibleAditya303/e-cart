const jwt = require('jsonwebtoken')

const authenticationToken = (request, response, next) => {
    const token = request.cookies?.token

    if (!token) {
        return response.status(401).json({
            success: false,
            message: 'Authentication required'
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return response.status(401).json({
                success: false,
                message: 'Invalid JWT token'
            })
        }
        
        request.payload = payload
        next()  
    })
}

module.exports = authenticationToken