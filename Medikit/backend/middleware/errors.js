export function notFound(req, res) {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} was not found.` })
}

export function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  if (error?.name === 'CastError') return res.status(404).json({ message: 'Resource not found.' })
  if (error?.code === 11000) return res.status(409).json({ message: 'A record with that value already exists.' })
  console.error(error)
  return res.status(500).json({ message: 'An unexpected server error occurred.' })
}
