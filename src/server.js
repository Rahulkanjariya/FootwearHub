const express = require("express");
const http = require("http");
require("dotenv").config(); 
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./helpers/swaggerConnection");
const { dbConnect } = require("./helpers/dbConnection");

const app = express();
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Set the view engine to EJS and define views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files (CSS, JS, images) from the public directory
app.use(express.static('public'));

// Serve uploaded files (like brand logos)
app.use('/uploads/brand-logo', express.static('uploads/brand-logo'));

// Admin Panel Routes
const adminRoutes = require('./routes/Api/v1/backend/common/adminRoute');
app.use(adminRoutes);

// Authentication API Routes
app.use("/api/v1/auth", require("./routes/Api/v1/auth/authRoute"));

// Admin API Routes
app.use("/api/admin", require("./routes/Api/v1/admin/userRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/addressRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/categoryRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/subCategoryRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/brandRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/productRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/reviewRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/couponRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/orderRoute"));
app.use("/api/admin", require("./routes/Api/v1/admin/shipmentRoute"));

// User API Routes
app.use("/api/v1/user", require("./routes/Api/v1/user/userRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/addressRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/categoryRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/subCategoryRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/brandRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/productRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/wishlistRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/reviewRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/couponRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/orderRoute"));
app.use("/api/v1/user", require("./routes/Api/v1/user/shipmentRoute"));

// Connect to the database
global.clientConnection = dbConnect();

// Create an HTTP server using the express app
const server = http.createServer(app);

// Start the server and listen on the provided PORT
server.listen(process.env.PORT, () => {
    console.log(`----------------------------------------------------`);
    console.log(`Listening on ${process.env.BASE_URL}`);
    console.log(`Admin URL :- ${process.env.BASE_URL}/admin`);
    console.log(`Swagger URL :- ${process.env.BASE_URL}/api-docs`);
    console.log(`----------------------------------------------------`);
});

module.exports = app;

