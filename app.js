import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import cookieParser from "cookie-parser";
// Import routes
import aboutRouter from "./routes/about.route.js";
import ordersRouter from "./routes/orders.route.js";
import productsRouter from "./routes/products.route.js";
import authRouter from "./routes/auth.route.js";

// Read the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', authRouter);
app.use('/about', aboutRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

// Error handling
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('pages/error', { title: 'Development Error Page' });
});

export default app;
