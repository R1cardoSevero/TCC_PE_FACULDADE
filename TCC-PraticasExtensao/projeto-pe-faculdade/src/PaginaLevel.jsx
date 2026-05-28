import './PaginaLevel.css';

import { useParams, useNavigate,useLocation } from 'react-router-dom'

export default function PaginaLevel(){
    const { idFase } = useParams()
    const navigate = useNavigate()
    const location = useLocation() // ← falta isso

    function terminarFase(xpGanho) {
        navigate('/home', { state: { id: location.state?.idUsuario, xpGanho } })
    }
    
    return (
        <section id="paginaLevel">
            <h1>LEVEL - {idFase}</h1>
            <button onClick={()=>(terminarFase(556))}>Terminar Fase</button>
        </section>
    )
} 