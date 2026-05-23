import niveis from './niveis';

export default function userInfo(props){
    let imagemUsuario = props.userImage
    let nomeUsuario = props.userName

    const nivel = [...niveis].reverse().find(n => props.xp >= n.xp);
    let codinome = nivel ? nivel.codinome : "Novato";
    
    
    return (
    <section id="user_info">
        <div>
            <img src={imagemUsuario} alt="" />
            <div>
                <h2>{nomeUsuario}</h2>
                <h4>{codinome}</h4>
            </div>
        </div>
    </section>
    )
}