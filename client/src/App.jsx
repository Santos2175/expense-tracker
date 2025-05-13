import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/Signup';
import Home from '@/pages/dashboard/Home';
import Income from '@/pages/dashboard/Income';
import Expense from '@/pages/dashboard/Expense';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

const Root = () => {
  // Check if token is missing in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  //  Redirect to dashboad if authenticated, else to login
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  );
};
