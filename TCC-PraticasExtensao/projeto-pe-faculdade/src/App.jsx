import { Routes, Route } from 'react-router-dom'
import PaginaLogin from './PaginaLogin'
import PaginaLevel from './PaginaLevel'
import PaginaUsuario from './PaginaUsuario'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaLogin />} />
       <Route path="/home" element={<PaginaUsuario />} />
      <Route path="/fase/:idFase" element={<PaginaLevel />} />
    </Routes>
  )
}