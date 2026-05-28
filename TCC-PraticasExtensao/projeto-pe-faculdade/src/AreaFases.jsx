
import IconFase from './IconFase.jsx'
import './areaFases.css'
import supabase from './supabase.js'
import { useEffect,useState } from 'react'
import InfoFaseSection from './infoFase.jsx'

export default function AreaFases(props){
    const [faseInfoSection, setFaseInfoSection] = useState(false)
    const [faseEscolhida, setFaseEscolhida] = useState(null)
    const [fasesBD, setFasesBD] = useState(null)
    const fasesConcluidas = props.fasesConcluidas
    console.log(props)
    console.log(fasesConcluidas)

    function escolheuFase(idFase){
        
        if(faseEscolhida){
            setFaseInfoSection(prev => faseEscolhida.id==idFase?!prev:prev)
        }else{
            setFaseInfoSection(prev => !prev)
        }
        setFaseEscolhida(fasesBD.find(f => f.id === idFase))
    }
    
    function abrirFecharInfo(){
        setFaseInfoSection(prev => !prev)
    }

    async function buscarFases(){
        const { data, error } = await supabase.from('fases').select('*').order('id', { ascending: true });
        
        if (error) console.error(error);
        else setFasesBD(data);
    }

    useEffect(() => {
        buscarFases();
    },[])

    return (<>
        <section id="areaFases">
            {fasesBD && fasesBD.map((infoFase)=>(<IconFase key={infoFase.id} infoFase={infoFase} onEscolheuFase={escolheuFase} FaseConcluida={fasesConcluidas.includes(infoFase.id)}/>))}
        </section>

        {faseInfoSection?<>
            <InfoFaseSection InformacoesFase={faseEscolhida} idUsuario={props.idUsuario} onAbrirFecharInfo={abrirFecharInfo}/>
            </>:null}
        </>
    )
}