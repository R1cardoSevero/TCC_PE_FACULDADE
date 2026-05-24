import { useState, useEffect } from 'react';
import supabase from './supabase';
import './paginaUsuario.css'
import imagemDefaultUser from './assets/img_anon_user.png'
import UserInfo from './userInfo'
import UserXpInfo from './userXpInfo'
import Configuracoes from './Configuracoes';
import BotaoConfiguracoes from './BotaoConfiguracoes.jsx'
import AreaFases from './AreaFases.jsx';


export default function PaginaUsuario(props){
    const [dadosUsuario, setDadosUsuario] = useState("")
    const [abaConfiguracao, setAbaConfiguracao] = useState(false)

    function onEscolheuFase(){
        console.log("escolheu fase")
    }
    
    async function buscarUsuario(){
        const { data, error } = await supabase
            .from('usuarios')
            .select('id, user_password, username, xp')
            .eq('id', props.id)
            .single();

        if (error) console.error(error);
        else setDadosUsuario(data);
    }

    function trocandoUserName(novoUserName){
        setDadosUsuario(prev => ({ ...prev, username: novoUserName })) // ✅
    }

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [dadosUsuario])

    useEffect(() => {
        buscarUsuario();
    }, [props.id])

    function onAbrirFechar(){
        setAbaConfiguracao(prev => {
        const novoEstado = !prev
        document.body.style.overflow = novoEstado ? 'hidden' : ''
        return novoEstado
    })
    }

    return <>
        <main>
            <UserInfo userImage={imagemDefaultUser} userName={dadosUsuario.username} xp={dadosUsuario.xp}/>
            <BotaoConfiguracoes onAbrirFechar={onAbrirFechar}/>
            <AreaFases/>
            <UserXpInfo xp={dadosUsuario.xp}/>
            {abaConfiguracao && <Configuracoes onAbrirFechar={onAbrirFechar} dadosUsuario={dadosUsuario} onBuscarUsuario={buscarUsuario}  onTrocaUsername={trocandoUserName}/>}
        </main>
    </>
}