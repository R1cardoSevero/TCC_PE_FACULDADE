import { useParams, useNavigate } from 'react-router-dom'
export default function PaginaLevel(){
    const { idFase } = useParams()  // pega o id da URL
    const navigate = useNavigate()

    function terminarFase(xpGanho) {
        navigate('/', { state: { xpGanho } })  // volta passando o xp
    }
    

    return (
        <section id="paginaLevel">
            <h1>LEVEL</h1>
            <button onClick={()=>(terminarFase())}>Terminar Fase</button>
        </section>
    )
} 