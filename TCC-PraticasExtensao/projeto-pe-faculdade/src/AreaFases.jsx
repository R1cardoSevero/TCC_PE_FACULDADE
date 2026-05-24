import fases from './fases'
import Fase from './Fase.jsx'
import './areaFases.css'
import { useState } from 'react'
import InfoFaseSection from './infoFase.jsx'

export default function AreaFases(){
    const [faseInfoSection, setFaseInfoSection] = useState(false)
    const [faseEscolhida, setFaseEscolhida] = useState(null)

    function escolheuFase(idFase){
        
        if(faseEscolhida){
            setFaseInfoSection(prev => faseEscolhida.id==idFase?!prev:prev)
        }else{
            setFaseInfoSection(prev => !prev)
        }
        setFaseEscolhida(fases.find(f => f.id === idFase))
    }

    return (<>
        <section id="areaFases">
            {fases.map((infoFase)=>(<Fase key={infoFase.id} infoFase={infoFase} onEscolheuFase={escolheuFase}/>))}
        </section>

        {faseInfoSection?<>
            <InfoFaseSection InformacoesFase={faseEscolhida}/>
            </>:null}
        </>
    )
}