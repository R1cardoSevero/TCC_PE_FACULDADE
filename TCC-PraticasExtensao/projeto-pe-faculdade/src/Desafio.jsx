import { useState, useEffect } from 'react'
import './desafio.css'
import somAcerto from './sounds/efeito-sonoro-acerto.mp3';


export default function Desafio(props){
    const infoFase = props.infoDesafio
    const alternativas = infoFase.alternativas
    const [alternativaEscolhida, setAlternativaEscolhida] = useState(null)
    const [acertou, setAcertou] = useState(null)
    const [xpGanho, setXpGanho] = useState(infoFase.xp)
    const efeitoSonoroAcertou = new Audio(somAcerto);
    efeitoSonoroAcertou.preload = 'auto';

    function responderPergunta(){
        if(alternativaEscolhida == infoFase.correta){
            console.log("resposta certa")
            setAcertou(true)
            efeitoSonoroAcertou.play()
        }else{
            console.log("resposta errada")
            setXpGanho((prev)=>Math.round(prev - prev/2))
            setAcertou(false)
        }
    }

    useEffect(() => {
    if (acertou === true) {
        const timer = setTimeout(() => {
            props.onTerminouDesafio(xpGanho)
        }, 1500)

        return () => clearTimeout(timer)
    }
}, [acertou])

    return <div id="desafioArticle" className='acertou'>
            <h1>Desafio</h1>
            {infoFase.texto_fase.map((texto)=>(<p>{texto}</p>))}
            <section id="alternativas">
                <h3 id='xpGanhoPeloDesafio'>XP {xpGanho}</h3>
                {alternativas.map((alternativa)=>(
                    <label className={alternativaEscolhida == alternativa.id && !acertou ? 'opcaoEscolhida' : (acertou && infoFase.correta == alternativa.id ? 'labelAcertou' : '')}>
                        <input type="radio" 
                        name="alternativa_escolhida" 
                        value={alternativa.id} 
                        disabled={acertou}
                        onChange={(e)=>(setAlternativaEscolhida(e.target.value))}/>
                        {alternativa.id} - {alternativa.texto}</label>))}
                <button id='botaoResponder' disabled={!alternativaEscolhida} onClick={()=>(responderPergunta())}>Responder</button>
                {(acertou != null && acertou == false)?<p className='dicaDesafio errou'>{infoFase.se_errar}</p>:null}
            </section>
        </div>
}