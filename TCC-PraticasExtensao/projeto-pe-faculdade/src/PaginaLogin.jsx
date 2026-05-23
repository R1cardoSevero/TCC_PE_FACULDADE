import { use, useState } from "react"
import './PaginaLogin.css'
import supabase from './supabase';
import PaginaUsuario from "./PaginaUsuario";

export default function PaginaLogin(){
    const [modo, setModo] = useState("modo-login")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [emailConfirmacao, setEmailConfirmacao] = useState("")
    const [idUsuario, setIdUsuario] = useState("")
    const [infoErro, setInfoErro] = useState("")
    const [logado, setLogado] = useState(false)

    async function Logar(e){
        e.preventDefault();
        setInfoErro("")
        if(email && senha){
            await buscarUsuario(email, senha)
        }else{
            setInfoErro("Insira ambos os campos")
        }
    }

    async function buscarUsuario(email, senha) {
        const { data, error } = await supabase.from('usuarios').select('id, user_password').eq('user_email', email).single();
        setInfoErro("")

        if(error){
            if (error.code == 'PGRST116') {
                setInfoErro("Nenhum usuario com esse email")
            }
        }

        if(senha == data.user_password){
            console.log("conseguiu logar")
            setIdUsuario(data.id)
            setLogado(prev=>!prev)
        }else{
            setInfoErro("Senha incorreta")
        }
    }

    async function inserir(){
        const { data, error } = await supabase.from('usuarios').insert({ user_email: email, user_password: senha });
        if(error){
            if (error.code === '23505') {
                setInfoErro("Usuário já cadastrado");
            } else {
                setInfoErro("Erro ao cadastrar, tente novamente");
            }
        }else{
            console.log("Dados inseridos com sucesso")
        }
    }

    async function Cadastrar(e){
        e.preventDefault();
        setInfoErro("")
        console.log("Cadastrando usuario")
        if(email && senha && emailConfirmacao){
            if(email == emailConfirmacao){
                await inserir()
            }else{
                setInfoErro("Emails não são iguais")
            }
        }else{
            setInfoErro("Insira ambos os campos")
        }
    }
 
    return <>
        {!logado?(modo=="modo-login"?<>
            <form onSubmit={Logar}>
                <label htmlFor="">Email:</label>
                <input type="text" name="email" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <label htmlFor="">Senha:</label>
                <input type="password" name="senha" id="senha" value={senha} onChange={e=>setSenha(e.target.value)}/>
                <h3>{infoErro}</h3>
                <button type="submit">Entrar</button>
                <a onClick={()=>{setModo("modo-cadastro"); setSenha("")}}>Não tenho conta</a>
            </form>
        </>:(modo=="modo-cadastro"?<>
            <form onSubmit={Cadastrar}>
                <label htmlFor="">Email:</label>
                <input type="text" name="email" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <label htmlFor="">Email Confirmação:</label>
                <input type="text" name="email-confirmacao" id="email-confirmacao" value={emailConfirmacao} onChange={e=>setEmailConfirmacao(e.target.value)}/>
                <label htmlFor="">Senha:</label>
                <input type="password" name="senha" id="senha" value={senha} onChange={e=>setSenha(e.target.value)}/>
                <h3>{infoErro}</h3>
                <button type="submit">Cadastrar</button>
                <a onClick={()=>{setModo("modo-login"); setSenha("")}}>Já tenho uma conta</a>
            </form>
        </>:null)):<PaginaUsuario id={idUsuario}/>}
    </>
}