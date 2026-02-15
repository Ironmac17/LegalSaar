const errorMiddleware = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  // Log error with context
  console.error({
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    error: {
      message: err.message,
      stack: isDevelopment ? err.stack : undefined,
      name: err.name,
    },
  });

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let isOperational = err.isOperational || false;

  // Handle validation errors from express-validator
  if (err.array && typeof err.array === "function") {
    const errors = err.array();
    statusCode = 400;
    message = "Validation Error";
    return res.status(statusCode).json({
      success: false,
      message,
      errors: errors.map((e) => ({
        field: e.path || e.param,
        message: e.msg,
      })),
    });
  }

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = `Duplicate field: ${Object.keys(err.keyValue)[0]}`;
    isOperational = true;
  }

  // Handle MongoDB validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    isOperational = true;
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  // Handle MongoDB cast errors
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.kind}: ${err.value}`;
    isOperational = true;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    isOperational = true;
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
    isOperational = true;
  }

  // Development error response (more detailed)
  if (isDevelopment && !isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
      error: {
        name: err.name,
        stack: err.stack,
        details: err,
      },
    });
  }

  // Production error response (safe)
  res.status(statusCode).json({
    success: false,
    message: isOperational ? message : "Something went wrong",
  });
};

module.exports = errorMiddleware;
