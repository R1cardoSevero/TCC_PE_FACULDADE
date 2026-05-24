import { useState, useEffect } from 'react';
import supabase from './supabase';
import './paginaUsuario.css'
import imagemDefaultUser from './assets/img_anon_user.png'
import UserInfo from './userInfo'
import UserXpInfo from './userXpInfo'
import Configuracoes from './Configuracoes';
import BotaoConfiguracoes from './BotaoConfiguracoes.jsx'


export default function PaginaUsuario(props){
    const [dadosUsuario, setDadosUsuario] = useState("")
    const [abaConfiguracao, setAbaConfiguracao] = useState(false)
    
    async function buscarUsuario(){
        const { data, error } = await supabase
            .from('usuarios')
            .select('id, user_password, username, xp')
            .eq('id', props.id)
            .single();

        if (error) console.error(error);
        else setDadosUsuario(data);
    }

    useEffect(() => {
        buscarUsuario();
    }, [props.id])

    function onAbrirFechar(){
        setAbaConfiguracao(prev=>!prev)
    }

    return <>
        <main>
            <UserInfo userImage={imagemDefaultUser} userName={dadosUsuario.username} xp={dadosUsuario.xp}/>
            <UserXpInfo xp={dadosUsuario.xp}/>
            <BotaoConfiguracoes onAbrirFechar={onAbrirFechar}/>
            {abaConfiguracao && <Configuracoes onAbrirFechar={onAbrirFechar} dadosUsuario={dadosUsuario} onBuscarUsuario={buscarUsuario}/>}
        </main>
    </>
}