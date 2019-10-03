import React, { useState, useEffect } from 'react'; // useState funçao do react para gerenciar states
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState(''); // sempre existirá o setState

    useEffect(() => {
        function redirectIfAuthenticated() {

            if(localStorage.getItem('user')) {
                history.push('dashboard');
            }
        }

        redirectIfAuthenticated(); // redirecionamos se estiver logado.
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email }); // requisição na api.
        const { _id } = response.data; // pega o _id usando desestruração.

        localStorage.setItem('user', _id); // armazena o user id no storage do navegador.

        history.push('/dashboard'); // redireciona para dashboard
    }

    return (
       <>
        <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input
                type="email"
                id="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <button type="submit" className="btn">Entrar</button>
        </form>
       </>
    )
}
