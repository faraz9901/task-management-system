import { Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import LoginPage from './features/auth/components/LoginPage';
import { useMe } from './features/auth/hooks/useAuth';
import Home from './features/dashboard/pages/Home';


function App() {

  useMe();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster richColors />
    </>
  )
}

export default App
