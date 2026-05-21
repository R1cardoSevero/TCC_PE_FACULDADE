import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaLogin from './PaginaLogin.jsx'
import PaginaPerfil from './PaginaPerfil.jsx'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaLogin />} />
                <Route path="/perfil/:id" element={<PaginaPerfil />} />
            </Routes>
        </BrowserRouter>
    )
}