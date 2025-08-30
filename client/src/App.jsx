import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Quiz from './components/Quiz';

import Instructions from './components/Instructions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/:categoryId" element={<Quiz />} />

        {/* Instructions page (user chooses category + instructions shown) */}
        <Route path="/instructions" element={<Instructions />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
