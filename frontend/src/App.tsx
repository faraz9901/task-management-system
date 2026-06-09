import { Route, Routes } from 'react-router';
import LoginPage from './features/auth/components/LoginPage';
import { useMe } from './features/auth/hooks/useAuth';


function App() {

  useMe();

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>

  )
}

export default App
