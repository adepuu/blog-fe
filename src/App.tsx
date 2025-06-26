import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PostPage from './feature/post/page/postPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:slug" element={<PostPage />} />
    </Routes>
  )
}

export default App
