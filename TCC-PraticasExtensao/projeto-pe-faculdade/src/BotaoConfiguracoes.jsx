import iconConfig from './assets/engrenagem-icon.svg'

export default function BotaoConfiguracoes(props) {
    return (
        <div id="button-config">
            <img src={iconConfig} onClick={() => (props.onAbrirFechar())} alt="" />
        </div>
    )
}