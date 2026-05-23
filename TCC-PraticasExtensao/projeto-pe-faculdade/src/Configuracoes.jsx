import './Configuracao.css'
import BotaoConfiguracoes from './BotaoConfiguracoes.jsx'

export default function Configuracoes(props){
    return (
        <section id='configuracao'>
            <h1>Configuração:</h1>
            <BotaoConfiguracoes onAbrirFechar={props.onAbrirFechar}/>
        </section>
    )
}