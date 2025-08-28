# Microservices Web Application

A simple microservices-based web application with three Node.js microservices and a React frontend.

## Architecture

- **Login Service**: Port 3001 - Handles authentication
- **Orders Service**: Port 3002 - Manages orders
- **Profile Service**: Port 3003 - Handles user profiles
- **React Frontend**: Port 3000 - Communicates with all services

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)

### Environment Variables

The frontend uses environment variables for service URLs. Create a `.env` file in the `frontend/` directory:

```bash
# Frontend Environment Variables
REACT_APP_LOGIN_URL=http://localhost:3001
REACT_APP_ORDERS_URL=http://localhost:3002
REACT_APP_PROFILE_URL=http://localhost:3003
```

**Note**: In React, environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

### Using Docker (Recommended)

1. **Build and run all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Login Service: http://localhost:3001
   - Orders Service: http://localhost:3002
   - Profile Service: http://localhost:3003

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

### Local Development

1. **Install dependencies for each service:**
   ```bash
   cd login-service && npm install
   cd ../orders-service && npm install
   cd ../profile-service && npm install
   cd ../frontend && npm install
   ```

2. **Start services (in separate terminals):**
   ```bash
   # Terminal 1 - Login Service
   cd login-service && npm run dev
   
   # Terminal 2 - Orders Service
   cd orders-service && npm run dev
   
   # Terminal 3 - Profile Service
   cd profile-service && npm run dev
   
   # Terminal 4 - Frontend
   cd frontend && npm start
   ```

   **Important**: Make sure to create the `.env` file in the `frontend/` directory before starting the frontend service.

## API Endpoints

Each microservice provides:
- `GET /` - Service status and information
- `GET /health` - Health check endpoint

## Frontend Routes

- `/` - Home page with service overview
- `/login` - Login service status
- `/orders` - Orders service status
- `/profile` - Profile service status

## Docker Commands

### Build individual services:
```bash
docker build -t login-service ./login-service
docker build -t orders-service ./orders-service
docker build -t profile-service ./profile-service
docker build -t frontend ./frontend
```

### Run individual containers:
```bash
docker run -p 3001:3001 login-service
docker run -p 3002:3002 orders-service
docker run -p 3003:3003 profile-service
docker run -p 3000:80 frontend
```

## Project Structure

```
react-api-proj/
├── login-service/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── orders-service/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── profile-service/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Features

- **Real-time Service Monitoring**: Frontend automatically checks service health every 10 seconds
- **Responsive Design**: Modern, clean UI with service status indicators
- **Service Isolation**: Each microservice runs independently
- **Docker Support**: Easy deployment and scaling with Docker containers
- **Health Checks**: Built-in health monitoring for all services

## Customization

To modify service behavior:
1. Edit the respective `server.js` file
2. Rebuild the Docker image: `docker-compose build <service-name>`
3. Restart: `docker-compose up <service-name>`

To change frontend:
1. Modify files in `frontend/src/`
2. Rebuild: `docker-compose build frontend`
3. Restart: `docker-compose up frontend`

## Troubleshooting

- **Service not accessible**: Check if the service is running and the port is correct
- **Frontend can't connect**: Ensure all microservices are running before starting the frontend
- **Docker issues**: Try `docker-compose down` and `docker-compose up --build`

## Next Steps

This is a basic implementation. Consider adding:
- Database integration
- Authentication middleware
- API rate limiting
- Logging and monitoring
- Load balancing
- Service discovery
- Message queues
