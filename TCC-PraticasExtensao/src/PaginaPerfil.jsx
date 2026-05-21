import { useParams } from 'react-router-dom'

export default function PaginaPerfil() {
    const { id } = useParams()

    return (
        <div>
            <h1>Bem vindo, usuário {id}</h1>
            <p>Aqui vão as informações do perfil</p>
        </div>
    )
}