const DEFAULT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutos
const DEFAULT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

/**
 * Rate limiter sencillo en memoria para mitigar abusos de la API.
 * No es apto para despliegues distribuidos sin un almacén centralizado.
 */
const requestTracker = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = DEFAULT_WINDOW_MS;
  const maxRequests = DEFAULT_MAX_REQUESTS;

  const requestLog = requestTracker.get(ip) || { count: 0, firstRequestTimestamp: now };

  // Reiniciar contador si la ventana ha expirado
  if (now - requestLog.firstRequestTimestamp > windowMs) {
    requestLog.count = 0;
    requestLog.firstRequestTimestamp = now;
  }

  requestLog.count += 1;
  requestTracker.set(ip, requestLog);

  if (requestLog.count > maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Has superado el número máximo de solicitudes permitidas. Inténtalo de nuevo más tarde.'
    });
  }

  return next();
};

module.exports = { rateLimiter };
