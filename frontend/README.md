# e-Cart App
This project is a full-stack e-commerce web application for a fictional clothing brand, 
built with the MERN stack. It allows registered users  to browse products, 
filter/search, add items to a cart, and checkout(disabled). 
On the backend, it uses secure user authentication (JWT) and persists data in MongoDB via Mongoose.

## Features
- User registration and login (with secure password hashing)
- User authentication and session management (JWT + HTTP-only cookies)
- Product browsing: listing, viewing product details.
- Product search and filtering (by size, category, price, etc.)
- Simple, functional frontend UI — minimal styling required, focus on functionality and flow.
- REST API with Express.js.
- Secure cookie handling.

## Tech Stack

### Frontend
- React.js
- React Router
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

### Security
- JWT Authentication
- HTTP-only Cookies
- CORS Configuration
- Input validation

## Run the application
  ### Start backend server:
    - cd backend
    - npm run dev

  ### Start frontend:
    - cd frontend
    - npm start

## Project Structure
```
e-cart/
├── backend/
│   ├── .gitignore
│   ├── app.http
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── node_modules/
│   │   
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   └── productRoutes.js
│   ├── seedProducts.js
│   └── server.js
└── frontend/
    ├── .env.prodcution
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── README.md
    └── src/
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── components/
        │   ├── AllProducts/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── Cart/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── CartItem/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── CartListView/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── CartSummary/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── EmptyCartView/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── FiltersGroup/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── Header/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── LoginForm/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── ProductCard/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── ProductItemDetails/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── ProductsHeader/
        │   │   ├── index.css
        │   │   └── index.js
        │   ├── ProtectedRoute/
        │   │   └── index.js
        │   └── RegisterForm/
        │       ├── index.css
        │       └── index.js
        ├── context/
        │   └── CartContext.js
        ├── index.css
        ├── index.js
        ├── reportWebVitals.js
        └── setupTests.js

```

## Authentication Flow
1. User logs in
2. Server generates JWT
3. JWT stored in HTTP-only cookie
4. Frontend send requests with `credentials: include`

## Screenshots
<img width="1366" height="671" alt="Screenshot 2026-03-15 015820" src="https://github.com/user-attachments/assets/2ade9ea4-47c1-4479-a935-44efd220078e" />
<img width="1366" height="679" alt="Screenshot 2026-03-15 015802" src="https://github.com/user-attachments/assets/3ccc9647-95d6-4961-bb66-aea968c01e46" />
<img width="1366" height="675" alt="Screenshot 2026-03-15 015746" src="https://github.com/user-attachments/assets/846121bb-0169-4460-88ea-6ef17a10c9cc" />
<img width="1366" height="673" alt="Screenshot 2026-03-15 015733" src="https://github.com/user-attachments/assets/4471088d-d4f2-4ff6-8170-f8585cc82c9f" />
<img width="1366" height="667" alt="Screenshot 2026-03-15 015657" src="https://github.com/user-attachments/assets/3498697b-c0cf-4123-82ed-becc24aa2fd6" />
<img width="1366" height="679" alt="Screenshot 2026-03-15 015555" src="https://github.com/user-attachments/assets/73247437-7e9e-4bdb-a387-2ea8d81a01da" />


## Sample Login
email: john123@gmail.com
password: John@123

## Security Practices
- HTTP-only cookies
- JWT verification middleware
- Input validation for all APIs
- MongoDB query sanitization
- CORS configured with credentials
- Environment-based cookie settings

## Future Improvements
- Order management
- Product reviews
- Responsive UI enhancements
