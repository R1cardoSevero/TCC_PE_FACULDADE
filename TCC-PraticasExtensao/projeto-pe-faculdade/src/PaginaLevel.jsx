import { useState } from 'react';
import Desafio from './Desafio';
import './PaginaLevel.css';
import desafios from './desafios'
import supabase from './supabase';
import { useParams, useNavigate, useLocation } from 'react-router-dom'

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

export default function PaginaLevel(){
    const { idFase } = useParams()
    const navigate = useNavigate()
    const location = useLocation() 
    const [indiceAtual, setIndiceAtual] = useState(0)
    const [xpGanhoTotal, setXpGanhoTotal] = useState(0)
    const [desafiosEmbaralhados] = useState(() => embaralhar(desafios));
    const xpMinimo = location.state?.xpMinimo
    const idUsuario = location.state?.idUsuario

    console.log(`xpMinimo:${xpMinimo}`)
    console.log(`idUsuario:${idUsuario}`)

    function terminarFase(xpGanho) {
        console.log(`XpGanho:${xpGanho}`)
        if(xpGanho >= xpMinimo){
            adicionarFaseConcluida(idUsuario, idFase)
        }else{
            console.log("menor")
        }
        navigate('/home', { state: { id: idUsuario, xpGanho, idFase } })
    }

    async function adicionarFaseConcluida(userId, novaFase) {
    const { data: usuario, error: fetchError } = await supabase
        .from('usuarios')
        .select('fases_concluidas')
        .eq('id', userId)
        .single();

    const fasesAtuais = usuario.fases_concluidas || [];

    if (fasesAtuais.includes(novaFase)) {
        console.log('Fase já concluída');
        return;
    }

    const novasFases = [...fasesAtuais, novaFase];

    const { data, error } = await supabase
        .from('usuarios')
        .update({ fases_concluidas: novasFases })
        .eq('id', userId);

    if (error) {
        console.error('Erro ao atualizar:', error);
    } else {
        console.log('Fase adicionada com sucesso!');
    }
    }

    function TerminouDesafio(xpGanho){
        setXpGanhoTotal((prev) => prev + xpGanho)
        proximoDesafio()
    }

    function proximoDesafio(){
        const proximoIndice = indiceAtual + 1;
        
        if (proximoIndice < desafiosEmbaralhados.length) {
            setIndiceAtual(proximoIndice);
        } else {
            terminarFase(xpGanhoTotal)
        }
    }
    
    const desafioAtual = desafiosEmbaralhados[indiceAtual]

    return (
        <section id="paginaLevel">
            <button onClick={() => terminarFase()} className='terminarFase'>Cancelar Fase</button>
            <h1>LEVEL - {idFase}</h1>
            {desafioAtual && (<Desafio key={desafioAtual.id} infoDesafio={desafioAtual} onTerminouDesafio={TerminouDesafio}/>)}
        </section>
    )
}