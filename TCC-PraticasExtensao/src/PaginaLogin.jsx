import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase.js'
import './PaginaLogin.css'

export default function PaginaLogin() {
    const [modoLogin, setModoLogin] = useState("logar-conta")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [emailConfirm, setEmailConfirm] = useState("")
    const [erro, setErro] = useState("")
    const navigate = useNavigate()

    async function Logar(e) {
        e.preventDefault()
        setErro("")

        const { data, error } = await supabase
            .from('usuarios')
            .select('id')
            .eq('user_email', email)
            .eq('user_password', senha)
            .single()

        if (error || !data) {
            setErro("Email ou senha incorretos")
            return
        }

        navigate(`/perfil/${data.id}`)
    }

    async function Cadastrar(e) {
        e.preventDefault()
        setErro("")

        if (email !== emailConfirm) {
            setErro("Os emails não coincidem")
            return
        }

        const { data, error } = await supabase.from('usuarios').insert({ user_email: email, user_password: senha }).select('id').single()

        if (error) {
            setErro("Erro ao cadastrar: " + error.message)
            return
        }

        navigate(`/perfil/${data.id}`)
    }

    return (
        <div>
            {modoLogin == "logar-conta" ? <>
                <h3>Login</h3>
                <form onSubmit={Logar}>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                    {erro && <p style={{color: 'red'}}>{erro}</p>}
                    <button type="submit">Logar</button>
                    <h4 onClick={() => setModoLogin("criar-conta")}>Criar conta</h4>
                </form>
            </> : <>
                <h3>Criar conta</h3>
                <form onSubmit={Cadastrar}>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <label>Confirmar Email:</label>
                    <input type="text" value={emailConfirm} onChange={e => setEmailConfirm(e.target.value)} />
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                    {erro && <p style={{color: 'red'}}>{erro}</p>}
                    <button type="submit">Cadastrar</button>
                    <h4 onClick={() => setModoLogin("logar-conta")}>Já tenho conta</h4>
                </form>
            </>}
        </div>
    )
}