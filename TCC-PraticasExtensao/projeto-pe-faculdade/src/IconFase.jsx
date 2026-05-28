export default function Fase(props){
    let infoFase = props.infoFase
    let concluida = props.FaseConcluida
    console.log(props.FaseConcluida)

    return (
        <div style={concluida?{backgroundColor:'green',boxShadow:'0px 12px 0px #004700'}:null} id={`fase-${infoFase.id}`} className="fase" onClick={()=>(props.onEscolheuFase(infoFase.id))}>
            <h1>{infoFase.id}</h1>
        </div>
    )
}