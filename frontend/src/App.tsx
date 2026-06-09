import { Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import NavWidget from './components/NavWidget';
import LoginPage from './features/auth/components/LoginPage';
import { useMe } from './features/auth/hooks/useAuth';
import Home from './features/dashboard/pages/Home';
import Tasks from './features/tasks/pages/Tasks';
import Users from './features/users/pages/Users';


function App() {

  useMe();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster richColors />
      <NavWidget />
    </>
  )
}

export default App
