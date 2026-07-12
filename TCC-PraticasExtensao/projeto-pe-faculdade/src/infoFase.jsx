import './infoFase.css'
import { useNavigate } from 'react-router-dom'

export default function InfoFaseSection(props){
    const fase = props.InformacoesFase
    const navigate = useNavigate()
    const idUsuario = props.idUsuario
    
    function fecharJanela(){
        props.onAbrirFecharInfo()
    }

    function iniciarFase(idFase) {
        navigate(`/fase/${idFase}`, { state: {idUsuario, xpMinimo:fase.xp} }) 
    }

    return(
        <>
            <section id="infoFase">
                <button id="botao-fechar" onClick={()=>(fecharJanela())}>Voltar</button>
                <h4>Fase {fase.id} - {fase.titulo}</h4>
                <p>{fase.descricao}</p>
                <p style={{textAlign:'Center'}}><i>Mínimo para concluir - {fase.xp}</i></p>
                <button onClick={()=>(iniciarFase(fase.id))} id="botao-iniciar">Iniciar</button>
            </section>
        </>
    )
}