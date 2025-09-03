import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { lazy, Suspense } from 'react';
import BulkQuestionForm from './components/BulkQuestionForm';

const Home = lazy(() => import('./components/Home'));
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const Quiz = lazy(() => import('./components/Quiz'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Instructions = lazy(() => import('./components/Instructions'));
const DisplayResult = lazy(() => import('./components/DisplayResult'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));





function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Home />} />

          {/* Auth pages */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />


          {/* Instructions page (user chooses category + instructions shown) */}
          <Route path="/instructions" element={<ProtectedRoute><Instructions /></ProtectedRoute>} />
          <Route path="/quiz/:categoryId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/displayresult" element={<DisplayResult />} />

          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/bulkquestionadd" element={<BulkQuestionForm />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
