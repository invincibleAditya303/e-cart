# e-cart App
This project is a full-stack e-commerce web application for a fictional clothing brand, 
built with the MERN stack. It allows registered users  to browse products, 
filter/search, add items to a cart, and checkout(disabled). 
On the backend, it uses secure user authentication (JWT) and persists data in MongoDB via Mongoose.

# Features
- User registration and login (with secure password hashing)
- JWT-based authentication and session management (via cookies)
- Product browsing: listing, viewing product details.
- Product search and filtering (by size, category, price, etc.)
- Simple, functional frontend UI — minimal styling required, focus on functionality and flow.

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

## Sample Login
email: john123@gmail.com
password: John@123
