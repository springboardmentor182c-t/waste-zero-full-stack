const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Waste Zero API',
      version: '1.0.0',
      description: 'API documentation for Waste Zero project'
    },
    servers: [
      {
        url: 'http://localhost:5000', 
      },
    ],
  },
  apis: [
    './routes/*.js',
    './src/**/*.js',
    
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec; 