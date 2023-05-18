import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import cookieParser from "cookie-parser";
// Import routes
import indexRouter from "./routes/index.js";
import aboutRouter from "./routes/about.js";
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";

// Read the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

// Error handling
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('pages/error');
});

export default app;
