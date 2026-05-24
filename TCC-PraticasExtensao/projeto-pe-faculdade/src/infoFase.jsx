import './infoFase.css'

export default function InfoFaseSection(props){
    const fase = props.InformacoesFase
    return(
        <>
            <section id="infoFase">
                <h4>Fase {fase.id} - {fase.titulo}</h4>
                <p>{fase.descricao}</p>
                <button>Iniciar</button>
            </section>
        </>
    )
}