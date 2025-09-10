import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <TaskProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />

              {/* Protected routes */}
              <Route
                path="tasks"
                element={
                  <PrivateRoute>
                    <TaskList />
                  </PrivateRoute>
                }
              />
              <Route
                path="tasks/:id"
                element={
                  <PrivateRoute>
                    <TaskDetails />
                  </PrivateRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </TaskProvider>
    </Router>
  );
}

export default App;
