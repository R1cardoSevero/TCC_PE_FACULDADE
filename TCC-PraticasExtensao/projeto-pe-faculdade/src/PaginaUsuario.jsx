import { useState, useEffect } from 'react';
import supabase from './supabase';
import './paginaUsuario.css'
import imagemDefaultUser from './assets/img_anon_user.png'
import UserInfo from './userInfo'
import UserXpInfo from './userXpInfo'
import Configuracoes from './Configuracoes';
import BotaoConfiguracoes from './BotaoConfiguracoes.jsx'
import AreaFases from './AreaFases.jsx';
import { useLocation } from 'react-router-dom'
import InfoTerminoDeFase from './InfoTerminoDeFase.jsx'


export default function PaginaUsuario(props){
    const [dadosUsuario, setDadosUsuario] = useState("")
    const [abaConfiguracao, setAbaConfiguracao] = useState(false)
    const location = useLocation()
    const id = location.state?.id
    const xpGanho = location.state?.xpGanho;
    const idFase = location.state?.idFase;
    const [InfoTerminoFase,setInfoTerminoFase] = useState(false)

    function onAbrirFecharInfoTerminoDeFase(){
        setInfoTerminoFase((prev)=>!prev)
    }
    
    async function buscarUsuario(){
        const { data, error } = await supabase.from('usuarios').select('*').eq('id', id).single();

        if (error) console.error(error);
        else setDadosUsuario(data);
    }

    function trocandoUserName(novoUserName){
        setDadosUsuario(prev => ({ ...prev, username: novoUserName })) // ✅
    }

    function trocandoAvatar(avatar_url){
        setDadosUsuario(prev => ({ ...prev, avatar_url: avatar_url }))
    }

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [dadosUsuario])

    useEffect(() => {
        buscarUsuario();
    }, [id])
    

    function onAbrirFechar(){
        setAbaConfiguracao(prev => {
        const novoEstado = !prev
        document.body.style.overflow = novoEstado ? 'hidden' : ''
        return novoEstado
    })
    }

    

    return <>
        <main>
            <UserInfo userImage={dadosUsuario.avatar_url?dadosUsuario.avatar_url:imagemDefaultUser} userName={dadosUsuario.username} xp={dadosUsuario.xp}/>
            <BotaoConfiguracoes onAbrirFechar={onAbrirFechar}/>
            <AreaFases idUsuario={id} fasesConcluidas={dadosUsuario.fases_concluidas?dadosUsuario.fases_concluidas:[]}/>
            <UserXpInfo xp={dadosUsuario.xp}/>
            <Configuracoes fechadoAberto={abaConfiguracao?'aberto':'fechado'} onAbrirFechar={onAbrirFechar} dadosUsuario={dadosUsuario} onBuscarUsuario={buscarUsuario}  onTrocaUsername={trocandoUserName} onTrocaAvatar={trocandoAvatar}/>
            {InfoTerminoFase && <InfoTerminoDeFase/>}
        </main>
    </>
}