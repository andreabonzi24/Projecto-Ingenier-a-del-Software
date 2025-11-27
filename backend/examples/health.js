/**
 * Health Check Endpoint Example
 * 
 * This file demonstrates a minimal Express health endpoint
 * for the Medical Appointments Platform.
 * 
 * Usage:
 * - Copy this pattern to create health check routes
 * - The health endpoint is useful for monitoring and load balancers
 */

const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Returns the health status of the API
 */
router.get('/health', (req, res) => {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  };

  res.status(200).json(healthStatus);
});

/**
 * GET /api/health/detailed
 * Returns detailed health information including memory usage
 */
router.get('/health/detailed', (req, res) => {
  const memoryUsage = process.memoryUsage();
  
  const detailedHealth = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    memory: {
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB',
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB',
      rss: Math.round(memoryUsage.rss / 1024 / 1024) + ' MB'
    },
    nodeVersion: process.version
  };

  res.status(200).json(detailedHealth);
});

module.exports = router;

/*
 * Example usage in main server.js:
 * 
 * const healthRoutes = require('./examples/health');
 * app.use('/api', healthRoutes);
 * 
 * Then access:
 * - GET http://localhost:3000/api/health
 * - GET http://localhost:3000/api/health/detailed
 */
