import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Service URLs pointing to nginx proxy
// const SERVICE_URLS = {
//   login: 'http://3.80.70.170/login',
//   orders: 'http://3.80.70.170/orders',
//   profile: 'http://3.80.70.170/profile'
// };

const SERVICE_URLS = {
  login: process.env.REACT_APP_LOGIN_URL || 'http://localhost:3001',
  orders: process.env.REACT_APP_ORDERS_URL || 'http://localhost:3002',
  profile: process.env.REACT_APP_PROFILE_URL || 'http://localhost:3003'
};

// Navigation component
function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
        Login Service
      </Link>
      <Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>
        Orders Service
      </Link>
      <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
        Profile Service
      </Link>
    </nav>
  );
}

// FIXED Service Status component with proper CORS handling
function ServiceStatus({ serviceName, serviceUrl }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkService = async () => {
      try {
        setLoading(true);
        
        // Properly configured fetch request for CORS
        const response = await fetch(serviceUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Explicitly enable CORS
          credentials: 'omit', // Don't send credentials for simple requests
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setStatus(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${serviceName} service:`, err);
        setError(err.message);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    checkService();
    const interval = setInterval(checkService, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [serviceUrl, serviceName]);

  if (loading) {
    return <div className="loading">Checking service status...</div>;
  }

  if (error) {
    return (
      <div className="service-card">
        <h2>{serviceName} Service</h2>
        <div className="service-status status-error">
          Service Unavailable: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="service-card">
      <h2>{serviceName} Service</h2>
      <div className="service-status status-success">
        {status?.message || 'Service Running'}
      </div>
      <p><strong>Service:</strong> {status?.service}</p>
      <p><strong>Timestamp:</strong> {status?.timestamp}</p>
    </div>
  );
}

// Home component
function Home() {
  return (
    <div className="container">
      <h1>Microservices Web Application</h1>
      <p>Welcome to the microservices demo application. This frontend communicates with three separate microservices:</p>
      
      <div className="service-card">
        <h3>Services Overview</h3>
        <ul>
          <li><strong>Login Service:</strong> Handles authentication and user sessions</li>
          <li><strong>Orders Service:</strong> Manages order processing and tracking</li>
          <li><strong>Profile Service:</strong> Handles user profile information</li>
        </ul>
      </div>

      <div className="service-card">
        <h3>Service Status</h3>
        <ServiceStatus serviceName="Login" serviceUrl={SERVICE_URLS.login} />
        <ServiceStatus serviceName="Orders" serviceUrl={SERVICE_URLS.orders} />
        <ServiceStatus serviceName="Profile" serviceUrl={SERVICE_URLS.profile} />
      </div>
    </div>
  );
}

// Service page components
function LoginPage() {
  return (
    <div className="container">
      <h1>Login Service</h1>
      <ServiceStatus serviceName="Login" serviceUrl={SERVICE_URLS.login} />
    </div>
  );
}

function OrdersPage() {
  return (
    <div className="container">
      <h1>Orders Service</h1>
      <ServiceStatus serviceName="Orders" serviceUrl={SERVICE_URLS.orders} />
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="container">
      <h1>Profile Service</h1>
      <ServiceStatus serviceName="Profile" serviceUrl={SERVICE_URLS.profile} />
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
