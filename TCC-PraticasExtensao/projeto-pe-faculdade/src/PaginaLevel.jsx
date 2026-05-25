import { useParams, useNavigate } from 'react-router-dom'
export default function PaginaLevel(){
    const { idFase } = useParams()  // pega o id da URL
    const navigate = useNavigate()
    console.log(idFase)
    function terminarFase(xpGanho) {
        navigate('/home', { state: { id: location.state?.idUsuario, xpGanho } })
    }
    
    return (
        <section id="paginaLevel">
            <h1>LEVEL</h1>
            <button onClick={()=>(terminarFase(556))}>Terminar Fase</button>
        </section>
    )
} 