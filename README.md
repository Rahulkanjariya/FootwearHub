# FootwearHub

*FootwearHub* is an online shopping platform dedicated to providing a diverse range of shoes, footwear, and sandals for men, women, and children. Our platform offers a seamless shopping experience with user-friendly navigation, detailed product descriptions, secure payment options, and reliable delivery services.

## Features

- *User Management:* Register, login, and manage user accounts.
- *Product Catalog:* Browse and search a wide range of footwear categories and brands.
- *Wishlist:* Save favorite products for future purchase.
- *Order Processing:* Place orders and track their status.
- *Reviews:* Submit and read product reviews.
- *Admin Dashboard:* Manage products, categories, orders, users, and more.

## Technologies Used

- *Node.js:* For server-side logic and API development.
- *Express.js:* For building and managing routes and handling HTTP requests.
- *MongoDB:* For database management and storing user data, product information, and order details.
- *Mongoose:* For object modeling and schema management in MongoDB.
- *JWT:* For secure user authentication and authorization.
- *Expresss File-upload:* For handling file uploads, such as product images.
- *Express-Validator:* For input validation and error handling.
- *Nodemon:* For automatic server restarts during development.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Installation

1. *Clone the Repository:*
   bash
   git clone https://github.com/yourusername/footwearhub.git
   

2. *Navigate to the Project Directory:*
   bash
   cd footwearhub
   

3. *Install Dependencies:*
   bash
   npm install
   

4. *Set Up Environment Variables:*
   Create a `.env` file in the root directory and add the following variables:
   plaintext
   PORT=3000
   HOST=localhost
   BASE_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/footwearhub
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   MAIL_SMTP=smtp.example.com
   

## Configuration

1. *Database:*
   Ensure MongoDB is installed and running. Configure the `MONGODB_URI` variable to point to your MongoDB instance.

2. *Email Service:*
   Configure email service settings in the `.env` file to enable email notifications and confirmations.

3. *JWT Secret:*
   Set a strong `JWT_SECRET` for secure authentication.

## Usage

1. *Start the Server:*
   bash
   npm start
   

2. *Access the Application:*
   Open your browser and go to `http://localhost:3000`.

## Developed by Rahul Kanjariya
