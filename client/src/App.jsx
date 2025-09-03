import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import('./components/usermgmt/Home'));
const Register = lazy(() => import('./components/usermgmt/Register'));
const Login = lazy(() => import('./components/usermgmt/Login'));
const Quiz = lazy(() => import('./components/quizapp/Quiz'));
const ProtectedRoute = lazy(() => import('./components/usermgmt/ProtectedRoute'));
const Instructions = lazy(() => import('./components/quizapp/Instructions'));
const DisplayResult = lazy(() => import('./components/quizapp/DisplayResult'));
const AnalyticsDashboard = lazy(() => import('./components/analytics/AnalyticsDashboard'));
const BulkQuestionForm = lazy(() => import('./components/quizapp/BulkQuestionForm'))
const InstructorHome = lazy(() => import('./components/quizapp/InstructorHome'))




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
          <Route path="/displayresult" element={<ProtectedRoute><DisplayResult /></ProtectedRoute>} />


          <Route path="/instructor-home" element={<ProtectedRoute><InstructorHome /></ProtectedRoute>}></Route>
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
          <Route path="/bulkquestionadd" element={<ProtectedRoute><BulkQuestionForm /></ProtectedRoute>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
