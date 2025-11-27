# Health Endpoint Documentation

## Overview

The `/health` endpoint is a standard health check endpoint used to verify that the server is running and responsive. This is essential for:

- **Load balancers**: To determine if the server can receive traffic
- **Monitoring systems**: To alert when the service is down
- **Container orchestration**: Kubernetes liveness/readiness probes
- **CI/CD pipelines**: To verify deployment success

## Endpoint Specification

### Request

```
GET /api/health
```

### Response

**Success (200 OK)**:
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "service": "medical-appointments-api",
  "version": "1.0.0"
}
```

**Error (503 Service Unavailable)**:
```json
{
  "status": "error",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "message": "Service is not healthy"
}
```

## Implementation Examples

### Node.js / Express

See `examples/backend/health.js` for a complete implementation example.

Basic implementation:

```javascript
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'medical-appointments-api'
  });
});
```

### Advanced Health Check

For production systems, consider checking:

1. **Database connectivity**
2. **External service dependencies**
3. **Memory usage**
4. **Disk space**

```javascript
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    await mongoose.connection.db.admin().ping();
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'connected',
        memory: process.memoryUsage().heapUsed
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: error.message
    });
  }
});
```

## Best Practices

1. **Keep it simple**: The basic health endpoint should respond quickly
2. **Separate deep health checks**: Use `/health/deep` for detailed checks
3. **Don't expose sensitive data**: Never include credentials or internal details
4. **Use appropriate HTTP status codes**: 200 for healthy, 503 for unhealthy
5. **Include version information**: Helps with debugging and deployment verification

## Related Files

- `examples/backend/health.js` - Express implementation
- `backend/src/server.js` - Current backend implementation (already has `/api/health`)
