export default function Fase(props){
    let infoFase = props.infoFase
    return (
        <div id={`fase-${infoFase.id}`} className="fase" onClick={()=>(props.onEscolheuFase(infoFase.id))}>
            <h1>{infoFase.id}</h1>
        </div>
    )
}