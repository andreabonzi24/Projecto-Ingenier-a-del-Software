/**
 * Example: Health Check Endpoint for Express.js
 *
 * This file demonstrates how to implement a health check endpoint
 * for the Medical Appointments Platform backend.
 *
 * Usage:
 *   const { healthRouter, healthCheck } = require('./health');
 *   app.use('/api', healthRouter);
 *
 * Or integrate directly:
 *   app.get('/api/health', healthCheck);
 */

const express = require('express');

const router = express.Router();

/**
 * Basic health check handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'medical-appointments-api',
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime()
  });
};

/**
 * Deep health check with database connectivity
 * Use for Kubernetes readiness probes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} mongoose - Mongoose instance (optional)
 */
const deepHealthCheck = async (req, res, mongoose = null) => {
  const checks = {
    server: 'ok',
    database: 'unknown',
    memory: {
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  };

  try {
    // Check database if mongoose is provided
    if (mongoose && mongoose.connection) {
      const state = mongoose.connection.readyState;
      checks.database = state === 1 ? 'connected' : 'disconnected';

      if (state === 1) {
        await mongoose.connection.db.admin().ping();
        checks.database = 'healthy';
      }
    }

    const allHealthy = checks.database !== 'disconnected';

    res.status(allHealthy ? 200 : 503).json({
      status: allHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      service: 'medical-appointments-api',
      checks
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'Health check failed',
      error: error.message
    });
  }
};

// Routes
router.get('/health', healthCheck);

// Export for use in other files
module.exports = {
  healthRouter: router,
  healthCheck,
  deepHealthCheck
};
