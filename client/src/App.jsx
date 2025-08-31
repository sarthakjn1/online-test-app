import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Quiz from './components/Quiz';

import Instructions from './components/Instructions';
import DisplayResult from './components/DisplayResult';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/*Quiz pages*/}
        <Route path="/quiz/:categoryId" element={<Quiz />} />

        <Route path="/instructions" element={<Instructions />} />
        <Route path="/displayresult" element={<DisplayResult />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
