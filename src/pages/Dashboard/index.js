import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // router dom link, ajudará no redirecionamento ao clicar em um botão.
import api from '../../services/api'; // importa api

import  './style.css'; // importa estilos.

export default function Dashboard() {
    const [spots, setSpots] = useState([]); // states

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user'); // carregamos o usuário logado
            const response = await api.get('/dashboard', {
                headers: { user_id } // passamos o headers para requisição
            });

            setSpots(response.data); // setamos os spots na variavel spots.
        }

        loadSpots(); // carregamos os spots na tela.
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}
