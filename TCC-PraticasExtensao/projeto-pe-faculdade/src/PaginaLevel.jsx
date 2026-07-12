import { useState } from 'react';
import Desafio from './Desafio';
import './PaginaLevel.css';
import desafios from './desafios'
import supabase from './supabase';
import { useParams, useNavigate, useLocation } from 'react-router-dom'

export default function PaginaLevel(){
    const { idFase } = useParams()
    const navigate = useNavigate()
    const location = useLocation() 
    const [indiceAtual, setIndiceAtual] = useState(0)
    const [xpGanhoTotal, setXpGanhoTotal] = useState(0)
    const desafiosDaFase = pegarDesafiosDaFase(desafios, idFase);
    const [desafiosEmbaralhados] = useState(() => embaralhar(desafiosDaFase));
    const xpMinimo = location.state?.xpMinimo
    const idUsuario = location.state?.idUsuario

    console.log(`xpMinimo:${xpMinimo}`)
    console.log(`idUsuario:${idUsuario}`)

    function pegarDesafiosDaFase(desafios, idFase) {
        return desafios.filter((desafio) => desafio.id_fase === Number(idFase));
    }

    function embaralhar(array) {
        const copia = [...array];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }

    async function terminarFase(xpGanho) {
        if(xpGanho >= xpMinimo){
            await adicionarFaseConcluida(idUsuario, idFase)
        }

        await adicionarNovoXp(idUsuario, xpGanho)
        navigate('/home', { state: { id: idUsuario, xpGanho, idFase } })
    }

    async function adicionarNovoXp(userId, xpGanho){
        const { data: usuario, error: fetchError } = await supabase
        .from('usuarios')
        .select('xp')
        .eq('id', userId)
        .single();

        let novoXp = usuario.xp + xpGanho

        const { data, error } = await supabase
            .from('usuarios')
            .update({ xp: novoXp })
            .eq('id', userId);

        if (error) {
            console.error('Erro ao atualizar:', error);
        } else {
            console.log('Xp adicionado com sucesso!');
        }
    }

    async function adicionarFaseConcluida(userId, novaFase) {
    const { data: usuario, error: fetchError } = await supabase
        .from('usuarios')
        .select('fases_concluidas')
        .eq('id', userId)
        .single();

    const fasesAtuais = usuario.fases_concluidas || [];

    if (fasesAtuais.includes(Number(novaFase))) {
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
        let novoXpGanho = xpGanhoTotal + xpGanho
        setXpGanhoTotal(novoXpGanho)
        proximoDesafio(novoXpGanho)
    }

    function proximoDesafio(novoXpGanho){
        const proximoIndice = indiceAtual + 1;
        
        if (proximoIndice < desafiosEmbaralhados.length) {
            setIndiceAtual(proximoIndice);
        } else {
            terminarFase(novoXpGanho)
        }
    }
    
    const desafioAtual = desafiosEmbaralhados[indiceAtual]

    return (
        <section id="paginaLevel">
            <button onClick={() => terminarFase()} className='terminarFase'>Cancelar Fase</button>
            <h1>LEVEL - {idFase}</h1>
            {desafioAtual && (<Desafio key={desafioAtual.id} infoDesafio={desafioAtual} onTerminouDesafio={TerminouDesafio}/>)}
            <h3 style={{padding:'10px', color:xpGanhoTotal<xpMinimo?'rgb(147, 5, 5)':'rgb(8, 99, 8)'}}>{xpGanhoTotal}/{xpMinimo}</h3>
        </section>
    )
}