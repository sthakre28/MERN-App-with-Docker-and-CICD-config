export const notFound = (request, response) => {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.originalUrl}` });
};

export const errorHandler = (error, request, response, next) => {
  console.error(error);
  const statusCode = error.name === 'ValidationError' || error.name === 'CastError' ? 400 : error.statusCode || 500;
  const message = error.code === 11000 ? 'Employee ID or email already exists.' : error.message || 'Internal server error.';
  response.status(statusCode).json({ message });
};
