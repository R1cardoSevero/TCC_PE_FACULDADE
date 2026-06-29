import iconConfig from './assets/engrenagem-icon.svg'

export default function BotaoConfiguracoes(props) {
    return (
        <div id="button-config" onClick={() => (props.onAbrirFechar())}>
            <img src={iconConfig} alt="" />
        </div>
    )
}