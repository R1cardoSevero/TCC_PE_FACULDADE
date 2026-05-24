import './Configuracao.css'
import BotaoConfiguracoes from './BotaoConfiguracoes.jsx'
import { useRef, useEffect, useState } from 'react';
import supabase from './supabase';

export default function Configuracoes(props) {
    const [modoEdicao, setModoEdicao] = useState(false)
    const inputRef = useRef(null);
    let dadosUsuario = props.dadosUsuario;
    let [novoUsername, setNovoUsername] = useState(dadosUsuario.username);

    useEffect(() => {
        setNovoUsername(dadosUsuario.username);
    }, [dadosUsuario]);

    async function inserirUsername() {
        const { data, error } = await supabase.from('usuarios').update({ username: novoUsername }).eq('id', dadosUsuario.id);

        if (error) {
            console.error('Erro ao atualizar:', error.message);
        } else {
            setModoEdicao(false); 
            props.onBuscarUsuario();
        }
    }

    useEffect(() => {
        if (modoEdicao) {
            inputRef.current?.focus();
        }
    }, [modoEdicao]);

    return (
        <section id='configuracao'>
            <h1>Configuração:</h1>
            <article className='configuracao-section'>
                <h3>Nome de usuário atual</h3>
                {!modoEdicao ? <><h4>{novoUsername}<span onClick={() => (setModoEdicao(prev => !prev))}>✏️</span></h4></> : <><input ref={inputRef} value={novoUsername} onChange={(e) => setNovoUsername(e.target.value)} />
                    <span onClick={inserirUsername}>✅</span>
                    <span onClick={() => {
                        setNovoUsername(dadosUsuario.username); // restaura valor original
                        setModoEdicao(false);
                    }}>❌</span></>}
            </article>
            <BotaoConfiguracoes onAbrirFechar={props.onAbrirFechar} />
        </section>
    )
}