import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Quiz from './components/Quiz';

import ProtectedRoute from './components/ProtectedRoute';
import Instructions from './components/Instructions';
import AnalyticsDashboard from "./components/AnalyticsDashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        {/* Instructions page (user chooses category + instructions shown) */}
        <Route path="/instructions" element={<ProtectedRoute><Instructions /></ProtectedRoute>} />
        <Route path="/quiz/:categoryId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />

        <Route path="/analytics" element={<AnalyticsDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
