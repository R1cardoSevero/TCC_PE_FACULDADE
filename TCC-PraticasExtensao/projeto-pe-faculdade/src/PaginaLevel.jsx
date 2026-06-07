import { useState } from 'react';
import Desafio from './Desafio';
import './PaginaLevel.css';
import desafios from './desafios'
import { useParams, useNavigate,useLocation } from 'react-router-dom'

export default function PaginaLevel(){
    const { idFase } = useParams()
    const navigate = useNavigate()
    const location = useLocation() 
    const [desafioAtual,setDesafioAtual] = useState(1)

    function terminarFase(xpGanho) {
        navigate('/home', { state: { id: location.state?.idUsuario, xpGanho } })
    }

    function trocandoDesafio(valor){
        console.log("TROCANDO DESAFIO")
        console.log(valor)
        
        const proximoValor = desafioAtual + valor;
        
        if (proximoValor >= 1 && proximoValor <= 5) {
            setDesafioAtual(proximoValor);
        }
    }
    
    return (
        <section id="paginaLevel">
            <h1>LEVEL - {idFase}</h1>
            {desafios.filter((desafio) => desafio.id === desafioAtual).map((desafio) => <Desafio key={desafio.id} infoDesafio={desafio} />)}
            <span><button className='botaoNavegarDesafios' onClick={()=>(trocandoDesafio(-1))}>Voltar</button><button onClick={()=>(terminarFase(556))} className='terminarFase'>Terminar Fase</button><button className='botaoNavegarDesafios' onClick={()=>(trocandoDesafio(+1))}>Próximo</button></span>
        </section>
    )
} 