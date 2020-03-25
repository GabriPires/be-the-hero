import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(event){
        event.preventDefault();

        const data ={
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const res =  await api.post('ongs', data);
            alert(`Seu ID de acesso: ${res.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadsatro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value = {name}
                        onChange = {event => setName(event.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value = {email}
                        onChange = {event => setEmail(event.target.value)}
                    />

                    <input
                        placeholder="WhatsApp"
                        value = {whatsapp}
                        onChange = {event => setWhatsapp(event.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value = {city}
                            onChange = {event => setCity(event.target.value)}
                        />

                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value = {uf}
                            onChange = {event => setUf(event.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}