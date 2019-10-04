import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // router dom link, ajudará no redirecionamento ao clicar em um botão.
import socketio from 'socket.io-client';
import api from '../../services/api'; // importa api

import  './style.css'; // importa estilos.

export default function Dashboard() {
    const [spots, setSpots] = useState([]); // states
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user'); // carregamos o usuário logado
    const socket = useMemo(() => socketio('http://be150636.ngrok.io', {
        query: { user_id }
    }), [user_id]);

    useEffect(() => {

        socket.on('booking_request', data => {
            setRequests([ ...requests, data ]);
        })
    }, [requests, socket]);

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

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data {request.date}
                        </p>

                        <button className="accept" onClick={() => handleAccept(request._id)}>Aceitar</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>Rejeitar</button>
                    </li>
                ))}
            </ul>
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
