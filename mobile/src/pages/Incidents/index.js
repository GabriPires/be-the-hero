import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity} from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);            // páginas para scrow infinito
    const [loading, setLoading] =useState(false);   // verificar se já foi carregado

    const navigation = useNavigation(); // ir para os detalhes do caso

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){ 
        
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);
        
        const res = await api.get('incidents', {    // Requisição dos casos
            params: { page }  // número da página
        }); 


        setIncidents([...incidents, ...res.data]);
        setTotal(res.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style = {styles.incidentsList}
                // showsVerticalScrollIndicator = {false}
                data = {incidents}
                keyExtractor = { incident => String(incident.id) }
                onEndReached = {loadIncidents}
                onEndReachedThreshold = {0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                                }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)} // Usado a arrow function para não executar o navigateToDetail() assim que a página for executada
                        >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"></Feather>                     
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}