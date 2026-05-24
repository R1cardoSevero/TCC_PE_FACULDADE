import niveis from './niveis';

export default function UserXpInfo(props){
    let xp = props.xp || 0  // garante que xp nunca é undefined

    const nivel_atual = [...niveis].reverse().find(n => xp >= n.xp);
    const proximo_nivel = niveis.find(n => xp < n.xp);

    if (!nivel_atual) return <p>Carregando...</p>

    return <>
       <style>{`
            #userXpInfo #barra_progresso::after{
            position: absolute;
                top: 0;
                content: '';
                height: 100%;
                border-radius: 80px;
                width: ${(nivel_atual.xp / proximo_nivel.xp) * 100}%;
                background-color:#ff8000;
        }
        `}</style> 
        <section id="userXpInfo">
            <div>
                <label>
                    <h3>{xp}</h3>→<h3>{proximo_nivel ? proximo_nivel.xp : "MAX"}</h3>
                </label>
            </div>
            <div>
                <label>
                    <h2>{nivel_atual.nivel}<span>lvl</span></h2>
                    <div id="barra_progresso"></div>
                    <h2>{proximo_nivel ? proximo_nivel.nivel : "MAX"}<span>lvl</span></h2>
                </label>
            </div>
        </section>
    </>
}