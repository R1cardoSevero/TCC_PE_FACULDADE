import './infoFase.css'
import { useNavigate } from 'react-router-dom'

export default function InfoFaseSection(props){
    const fase = props.InformacoesFase
    const navigate = useNavigate()

    function iniciarFase(idFase) {
        navigate(`/fase/${idFase}`, { state: { idUsuario: 23 } }) //NUMERO FIXO
    }

    return(
        <>
            <section id="infoFase">
                <h4>Fase {fase.id} - {fase.titulo}</h4>
                <p>{fase.descricao}</p>
                <button onClick={()=>(iniciarFase(fase.id))}>Iniciar</button>
            </section>
        </>
    )
}