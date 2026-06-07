import { useState } from 'react'
import './desafio.css'

export default function Desafio(props){
    const infoFase = props.infoDesafio
    const alternativas = infoFase.alternativas
    const [alternativaEscolhida, setAlternativaEscolhida] = useState(null)
    const [acertou, setAcertou] = useState(null)
    console.log(acertou)

    function responderPergunta(){
        if(alternativaEscolhida == infoFase.correta){
            console.log("resposta certa")
            setAcertou(true)
        }else{
            console.log("resposta errada")
            setAcertou(false)
        }
    }

    return <div id="desafioArticle">
            <h1>Desafio</h1>
            {infoFase.texto_fase.map((texto)=>(<p>{texto}</p>))}
            <section id="alternativas">
                {alternativas.map((alternativa)=>(<label className={alternativaEscolhida==alternativa.id?'opcaoEscolhida':null}><input type="radio" name="alternativa_escolhida" value={alternativa.id} onChange={(e)=>(setAlternativaEscolhida(e.target.value))}/>{alternativa.id} - {alternativa.texto}</label>))}
                <button id='botaoResponder' disabled={!alternativaEscolhida} onClick={()=>(responderPergunta())}>Enviar Resposta</button>
                {(acertou != null && acertou == false)?<p className='dicaDesafio errou'>{infoFase.se_errar}</p>:(acertou == true?<p className='dicaDesafio acertou'>{infoFase.se_acertar}</p>:null)}
            </section>
        </div>
}