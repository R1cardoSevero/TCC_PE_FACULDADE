import { useState, useEffect, useRef } from 'react'
import './desafio.css'
import somAcerto from './sounds/efeito-sonoro-acerto.mp3';
import somErro from './sounds/efeito-sonoro-errou.mp3';


export default function Desafio(props){
    const infoFase = props.infoDesafio
    const alternativas = infoFase.alternativas
    const [alternativaEscolhida, setAlternativaEscolhida] = useState(null)
    const [acertou, setAcertou] = useState(null)
    const [xpGanho, setXpGanho] = useState(infoFase.xp)
    const somAcertoRef = useRef(null)
    const somErroRef = useRef(null)

    // cria o Audio uma vez só (antes era recriado a cada render) e ignora
    // a rejeição do play() quando o navegador bloqueia o autoplay
    function tocarSom(ref, src){
        if (!ref.current) {
            ref.current = new Audio(src)
            ref.current.preload = 'auto'
        }
        ref.current.currentTime = 0
        ref.current.play().catch(() => {})
    }

    function responderPergunta(){
        if(alternativaEscolhida == infoFase.correta){
            console.log("resposta certa")
            setAcertou(true)
            tocarSom(somAcertoRef, somAcerto)
        }else{
            console.log("resposta errada")
            setXpGanho((prev)=>Math.round(prev - prev/2))
            setAcertou(false)
            tocarSom(somErroRef, somErro)
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
            {infoFase.texto_fase.map((texto, i)=>(<p key={i}>{texto}</p>))}
            <section id="alternativas">
                <h3 id='xpGanhoPeloDesafio'>XP {xpGanho}</h3>
                {alternativas.map((alternativa)=>(
                    <label key={alternativa.id} className={alternativaEscolhida == alternativa.id && !acertou ? 'opcaoEscolhida' : (acertou && infoFase.correta == alternativa.id ? 'labelAcertou' : '')}>
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