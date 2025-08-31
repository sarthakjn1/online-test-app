import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Quiz from './components/Quiz';

import ProtectedRoute from './components/ProtectedRoute';
import Instructions from './components/Instructions';
<<<<<<< HEAD
import DisplayResult from './components/DisplayResult';
=======
import AnalyticsDashboard from "./components/AnalyticsDashboard";


>>>>>>> d83ccbcda3bbedc9033627f31df4931b6e7f6af6

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

<<<<<<< HEAD
        {/*Quiz pages*/}
        <Route path="/quiz/:categoryId" element={<Quiz />} />

        <Route path="/instructions" element={<Instructions />} />
        <Route path="/displayresult" element={<DisplayResult />} />
=======

        {/* Instructions page (user chooses category + instructions shown) */}
        <Route path="/instructions" element={<ProtectedRoute><Instructions /></ProtectedRoute>} />
        <Route path="/quiz/:categoryId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
>>>>>>> d83ccbcda3bbedc9033627f31df4931b6e7f6af6

        <Route path="/analytics" element={<AnalyticsDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
