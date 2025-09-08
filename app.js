const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// 主页端点
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker container!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API 示例端点
app.get('/api/info', (req, res) => {
  res.json({
    app: 'Docker Build Demo',
    version: '1.0.0',
    description: 'A sample Node.js app for Docker build and ACR deployment',
    endpoints: {
      health: '/health',
      home: '/',
      info: '/api/info'
    }
  });
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});