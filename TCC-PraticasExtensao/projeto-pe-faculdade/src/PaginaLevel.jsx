import { useState } from 'react';
import Desafio from './Desafio';
import './PaginaLevel.css';
import desafios from './desafios'
import { useParams, useNavigate,useLocation } from 'react-router-dom'

export default function PaginaLevel(){
    const { idFase} = useParams()
    const navigate = useNavigate()
    const location = useLocation() 
    const [desafioAtual,setDesafioAtual] = useState(1)
    const [xpGanhoTotal, setXpGanhoTotal] = useState(0)
    const xpMinimo = location.state?.xpMinimo

    function terminarFase(xpGanho) {
        console.log(xpMinimo)
        navigate('/home', { state: { id: location.state?.idUsuario, xpGanho, idFase } })
    }

    function TerminouDesafio(xpGanho){
        setXpGanhoTotal((prev)=>prev+xpGanho)
        proximoDesafio()
    }

    function proximoDesafio(valor){
        const proximoValor = desafioAtual + 1;
        
        if (proximoValor >= 1 && proximoValor <= 5) {
            setDesafioAtual(proximoValor);
        }else{
            terminarFase(xpGanhoTotal)
        }
    }
    
    return (
        <section id="paginaLevel">
            <button onClick={()=>(terminarFase())} className='terminarFase'>Cancelar Fase</button>
            <h1>LEVEL - {idFase}</h1>
            {desafios.filter((desafio) => desafio.id === desafioAtual).map((desafio) => <Desafio key={desafio.id} infoDesafio={desafio} onTerminouDesafio={TerminouDesafio}/>)}
        </section>
    )
} 