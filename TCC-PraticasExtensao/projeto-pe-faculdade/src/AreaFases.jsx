
import IconFase from './IconFase.jsx'
import './areaFases.css'
import supabase from './supabase.js'
import { useEffect,useState } from 'react'
import InfoFaseSection from './infoFase.jsx'

export default function AreaFases(){
    const [faseInfoSection, setFaseInfoSection] = useState(false)
    const [faseEscolhida, setFaseEscolhida] = useState(null)
    const [fasesBD, setFasesBD] = useState(null)
   

    function escolheuFase(idFase){
        
        if(faseEscolhida){
            setFaseInfoSection(prev => faseEscolhida.id==idFase?!prev:prev)
        }else{
            setFaseInfoSection(prev => !prev)
        }
        setFaseEscolhida(fasesBD.find(f => f.id === idFase))
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
            {fasesBD && fasesBD.map((infoFase)=>(<IconFase key={infoFase.id} infoFase={infoFase} onEscolheuFase={escolheuFase}/>))}
        </section>

        {faseInfoSection?<>
            <InfoFaseSection InformacoesFase={faseEscolhida}/>
            </>:null}
        </>
    )
}