import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/dashboard/Home';
import Income from './pages/dashboard/Income';
import Expense from './pages/dashboard/Expense';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
      <div className='container mx-auto'>
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

      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          },
        }}
      />
    </UserProvider>
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
