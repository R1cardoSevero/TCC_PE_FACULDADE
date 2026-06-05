import { useState } from "react"
import './PaginaLogin.css'
import supabase from './supabase';
import PaginaUsuario from "./PaginaUsuario";
import { useNavigate } from 'react-router-dom'

export default function PaginaLogin() {
  const navigate = useNavigate() 
  const [modo, setModo] = useState("modo-login")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [emailConfirmacao, setEmailConfirmacao] = useState("")
  const [idUsuario, setIdUsuario] = useState("")
  const [infoErro, setInfoErro] = useState("")
  const [logado, setLogado] = useState(false)

  async function Logar(e) {
    e.preventDefault()
    setInfoErro("")
    if (email && senha) {
      await buscarUsuario(email, senha)
    } else {
      setInfoErro("Preencha e-mail e senha para continuar.")
    }
  }

  async function buscarUsuario(email, senha) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, user_password')
      .eq('user_email', email)
      .single()
    setInfoErro("")

    if (error) {
      if (error.code === 'PGRST116') {
        setInfoErro("Nenhuma conta encontrada com esse e-mail.")
      }
      return
    }

    if (senha === data.user_password) {
      setIdUsuario(data.id)
      navigate('/home', { state: { id: data.id } })  // ← substitui o setLogado(true)
    } else {
      setInfoErro("Senha incorreta. Tente novamente.")
    }

  }

  async function inserir() {
    const { error } = await supabase
      .from('usuarios')
      .insert({ user_email: email, user_password: senha })

    if (error) {
      if (error.code === '23505') {
        setInfoErro("Esse e-mail já está cadastrado.")
      } else {
        setInfoErro("Erro ao cadastrar. Tente novamente.")
      }
    }else{
        alert("Cadastrado com sucesso")
        setModo("modo-login")
    }
  }

  async function Cadastrar(e) {
    e.preventDefault()
    setInfoErro("")
    if (email && senha && emailConfirmacao) {
      if (email === emailConfirmacao) {
        await inserir()
      } else {
        setInfoErro("Os e-mails informados não coincidem.")
      }
    } else {
      setInfoErro("Preencha todos os campos para continuar.")
    }
  }

  return (
    <section id="pagina-login">
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-logo">
          <span className="game-title">CODE<br />QUEST</span>
          <span className="game-subtitle">⛰ Escale o pico da lógica</span>
        </div>

        {modo === "modo-login" ? (
          <form onSubmit={Logar} noValidate>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              autoComplete="current-password"
            />

            <p className="msg-erro">{infoErro}</p>

            <button type="submit" className="btn-primary">
              Entrar
            </button>

            <div className="links-rodape">
              <a
                className="link-secundario"
                onClick={() => { setModo("modo-cadastro"); setSenha("") }}
              >
                Não tenho conta
              </a>
            </div>
          </form>

        ) : (
          <form onSubmit={Cadastrar} noValidate>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />

            <label htmlFor="email-confirmacao">Confirmar e-mail</label>
            <input
              type="email"
              id="email-confirmacao"
              name="email-confirmacao"
              placeholder="confirme seu@email.com"
              value={emailConfirmacao}
              onChange={e => setEmailConfirmacao(e.target.value)}
              autoComplete="email"
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="crie uma senha forte"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              autoComplete="new-password"
            />

            <p className="msg-erro">{infoErro}</p>

            <button type="submit" className="btn-primary">
              Criar conta
            </button>

            <div className="links-rodape">
              <a
                className="link-secundario"
                onClick={() => { setModo("modo-login"); setSenha("") }}
              >
                Já tenho conta
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
    </section>
  )
}
