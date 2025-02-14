# Trendy Shop Website

## Introduction

This project is the final project for the "Introduction to Software Engineering" course. It is a fully functional trendy shop website that leverages modern web technologies for both the frontend and backend. The frontend is built using **React**, while the backend is powered by **ExpressJS**. **MongoDB** is used as the database service, interfaced through **Mongoose**.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

The backend is implemented using Node.js and Express.js. It provides a RESTful API for the frontend to interact with.


#### Key Files and Directories

- **config/db.config.js**: Contains the database configuration.
- **controllers/**: Contains the controllers for handling requests related to categories, feedback, orders, products, users, and vouchers.
- **models/**: Contains the Mongoose models for the database collections.
- **middleware.js**: Contains middleware functions used in the application.
- **routes/**: Contains the route definitions for the API endpoints.
- **server.js**: The main entry point of the backend application.

#### Dependencies

The backend uses the following key dependencies:

- **bcrypt**: For hashing passwords.
- **cors**: For enabling Cross-Origin Resource Sharing.
- **express**: For building the RESTful API.
- **jsonwebtoken**: For handling JSON Web Tokens.
- **mongoose**: For interacting with MongoDB.
- **nodemon**: For automatically restarting the server during development.

### Frontend

The frontend is implemented using React. It provides a user-friendly interface for interacting with the shop.


#### Key Files and Directories

- **index.html**: The main HTML file.
- **src/**: Contains the source code for the React application.
- **public/**: Contains public assets.
- **tailwind.config.js**: Configuration for Tailwind CSS.
- **vite.config.js**: Configuration for Vite, the build tool.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/Trendy-Shop-Website.git
cd Trendy-Shop-Website
```

2. Install backend dependencies:
```sh
cd backend
npm install
```

3. Install frontend dependencies:
```sh
cd ../frontend
npm install
```

### Running the Application

1. Start the MongoDB server.
2. Start the backend server:
```sh
cd backend
npm start
```

3. Start the frontend development server:
```sh
cd ../frontend
npm run dev
```

4. Open your browser and navigate to http://localhost:3000 to view the application.

## Features
- User authentication and authorization
- Product listing and details
- Shopping cart functionality
- Order management
- Feedback and reviews
- Voucher and discount management

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## Author
This project was developed by **SoftWear Team**