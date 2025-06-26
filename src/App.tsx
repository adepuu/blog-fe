import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PostPage from './feature/post/page/postPage'
import ProtectedRoutes from './routes/ProtectedRoutes'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './feature/auth/page/LoginPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/post/:slug" element={<PostPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

export default App
