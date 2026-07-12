import './Configuracao.css'
import BotaoConfiguracoes from './BotaoConfiguracoes.jsx'
import { useRef, useEffect, useState } from 'react';
import supabase from './supabase';

export default function Configuracoes(props) {
    const [modoEdicao, setModoEdicao] = useState(false)
    const inputRef = useRef(null);
    const avatarInputRef = useRef(null);
    let dadosUsuario = props.dadosUsuario;
    let [novoUsername, setNovoUsername] = useState(dadosUsuario.username);

    // --- Estados do avatar ---
    const [avatarPreview, setAvatarPreview] = useState(dadosUsuario.avatar_url || null);
    const [arrastando, setArrastando] = useState(false);
    const [enviandoAvatar, setEnviandoAvatar] = useState(false);

    useEffect(() => {
        setNovoUsername(dadosUsuario.username);
        setAvatarPreview(dadosUsuario.avatar_url || null);
    }, [dadosUsuario]);

    async function inserirUsername() {
        const { data, error } = await supabase.from('usuarios').update({ username: novoUsername }).eq('id', dadosUsuario.id);

        if (error) {
            console.error('Erro ao atualizar:', error.message);
        } else {
            setModoEdicao(false);
            props.onTrocaUsername(novoUsername)
        }
    }

    async function uploadAvatar(file, userId) {
        const extensao = file.name.split('.').pop()
        const nomeArquivo = `${userId}.${extensao}` // sobrescreve se já existir
        const caminho = `${nomeArquivo}`

        const { error: erroUpload } = await supabase.storage
            .from('avatares')
            .upload(caminho, file, { upsert: true }) // upsert: true permite substituir

        if (erroUpload) {
            console.error('Erro no upload:', erroUpload)
            return null
        }

        const { data } = supabase.storage
            .from('avatares')
            .getPublicUrl(caminho)

        // cache-busting: sem isso a URL fica idêntica a cada upload (mesmo nome de arquivo),
        // então o navegador e o banco "acham" que nada mudou
        const urlPublica = `${data.publicUrl}?t=${Date.now()}`

        const { error: erroUpdate } = await supabase
            .from('usuarios')
            .update({ avatar_url: urlPublica })
            .eq('id', userId)

        if (erroUpdate) {
            console.error('Erro ao salvar URL:', erroUpdate)
            return null
        }

        return urlPublica
    }

    function processarArquivo(file) {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            console.warn('Arquivo selecionado não é uma imagem');
            return;
        }

        const urlLocal = URL.createObjectURL(file);
        setAvatarPreview(urlLocal);

        enviarAvatar(file);
    }

    // Redimensiona e converte a imagem pra webp no navegador, antes do upload,
// assim o arquivo fica bem mais leve e carrega mais rápido depois
function comprimirImagem(file, { maxLargura = 512, maxAltura = 512, qualidade = 0.8 } = {}) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);

            let { width, height } = img;

            // só reduz se for maior que o limite, nunca aumenta imagem pequena
            if (width > maxLargura || height > maxAltura) {
                const escala = Math.min(maxLargura / width, maxAltura / height);
                width = Math.round(width * escala);
                height = Math.round(height * escala);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Falha ao comprimir imagem'));
                        return;
                    }
                    // vira um File com nome .webp, então uploadAvatar continua
                    // funcionando igual (ele lê a extensão de file.name)
                    resolve(new File([blob], 'avatar.webp', { type: 'image/webp' }));
                },
                'image/webp',
                qualidade
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Falha ao carregar a imagem'));
        };

        img.src = url;
    });
}

    async function enviarAvatar(file) {
        setEnviandoAvatar(true);

        let arquivoParaEnviar = file;
        try {
            arquivoParaEnviar = await comprimirImagem(file);
        } catch (err) {
            console.error('Erro ao comprimir imagem, enviando original:', err);
            // se der erro (ex: navegador muito antigo), segue com o arquivo original
        }

        const urlPublica = await uploadAvatar(arquivoParaEnviar, dadosUsuario.id);
        setEnviandoAvatar(false);

        if (urlPublica) {
            setAvatarPreview(urlPublica);
            props.onTrocaAvatar?.(urlPublica);
        }
    }

    function handleAvatarChange(e) {
        const file = e.target.files?.[0];
        processarArquivo(file);
        e.target.value = ''; // permite selecionar o mesmo arquivo de novo depois
    }

    function handleDrop(e) {
        e.preventDefault();
        setArrastando(false);
        const file = e.dataTransfer.files?.[0];
        processarArquivo(file);
    }

    function handleDragOver(e) {
        e.preventDefault();
        setArrastando(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setArrastando(false);
    }

    useEffect(() => {
        if (modoEdicao) {
            inputRef.current?.focus();
        }
    }, [modoEdicao]);

    return (
        <section id='configuracao' className={props.fechadoAberto}>
            <h1>Configuração:</h1>

            <article className='configuracao-section'>
                <h4>Foto de perfil</h4>
                <div
                    className={`avatar-upload ${arrastando ? 'arrastando' : ''}`}
                    onClick={() => avatarInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview do avatar" />
                    ) : (
                        <span className='avatar-placeholder'>Clique ou arraste{'\n'}uma imagem</span>
                    )}

                    <div className='avatar-overlay'>
                        {enviandoAvatar ? 'Enviando...' : 'Trocar foto'}
                    </div>

                    <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                </div>
            </article>

            <article className='configuracao-section'>
                <h3>Nome de usuário atual</h3>
                {!modoEdicao ? <><h4>{novoUsername}<span onClick={() => (setModoEdicao(prev => !prev))}>✏️</span></h4></> : <><input ref={inputRef} value={novoUsername} onChange={(e) => setNovoUsername(e.target.value)} />
                    <span onClick={inserirUsername}>✅</span>
                    <span onClick={() => {
                        setNovoUsername(dadosUsuario.username); // restaura valor original
                        setModoEdicao(false);
                    }}>❌</span></>}
            </article>
            <BotaoConfiguracoes onAbrirFechar={props.onAbrirFechar} />
        </section>
    )
}