import React, { useState, useMemo } from 'react';

import api from '../../services/api'; // importa api
import camera from '../../assets/camera.svg'; // importa icone de camera
import './style.css'; // importa estilos.

// o history serve para redirecionamentos
export default function New({ history }) {
    const [company, setCompany] = useState(''); // cria states de company
    const [techs, setTechs] = useState(''); // cria states de techs
    const [price, setPrice] = useState(''); // states de price
    const [thumbnail, setThumbnail] = useState(null); // state thumbnail

    /**
     * Função utilizada para retornar ua url do arquivo selecionado e criar um preview.
     */
    const preview = useMemo( () => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {

        event.preventDefault();

        const data = new FormData(); // cria um novo formData
        const user_id = localStorage.getItem('user'); // pega o usário logado.

        /**
         * Populamos o array data com as informações do formulário.
         */
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        // Fazemos requisição na api.
        await api.post('/spots', data, {
            headers: { user_id }
        });

        // Redirecionamento para dashboard
        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">Empresa*</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">Tecnolodias * <span>(separadas por vírgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">Valor da diária * <span>(em branco é gratuíto)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button className="btn" type="sbmit">Cadastrar</button>
        </form>

    );
}
