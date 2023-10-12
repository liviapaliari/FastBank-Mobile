import { View } from "react-native";
import { useEffect, useState } from "react";

import Botao from "../components/Botao";
import Texto from "../components/Texto";
import Titulo from "../components/Titulo";
import IconeFechar from "../components/IconeFechar";

import axios from "axios";


export default function Cartao({ navigation }) {
    const [resposta, setResposta] = useState([]);

    // REQUISIÇÃO PARA CADASTRAR CARTÃO
    const pedirCartao = () => {
        let tokenAccess = JSON.parse(localStorage.getItem("TokenAccess"));
        axios.post("http://127.0.0.1:8000/fastbank/cartoes/", {

        },
        {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        .then(function(response) {
            alert("Seu cartão foi cadastrado!");
        })
        .catch(function(error) {
            alert("Não foi possível cadastrar seu cartão.");
        })
    };


    // REQUISIÇÃO PARA GET CARTÕES
    useEffect(() => {       
        let tokenAccess = JSON.parse(localStorage.getItem("TokenAccess"));
        axios.get("http://127.0.0.1:8000/fastbank/cartoes/", {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        .then(function(response) {
            setResposta(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })
    }, []);


    return (
        <View style={{display: "flex", width: "100vw", height: "100vh"}}>
            {/* ÍCONE FECHAR */}
            <IconeFechar navigation={navigation}/>

            <View style={{paddingLeft: 20}} >
                {/* MEUS CARTÕES */}
                <Titulo textAlign="left">Meus Cartões - Função Crédito</Titulo>
            </View>

            {/* TODOS OS CARTÕES */}
            {resposta.map((cartao) => (
                <View key={cartao.id} style={{width: "100vw", borderTopColor: "#555", borderTopWidth: 1, justifyContent: "center", marginTop: 20}}>
                    <View style={{marginTop: 20, marginLeft: 20}}>
                        <Texto>Número do Cartão: {cartao.numero}</Texto>
                        <Texto>Validade: {cartao.validade}</Texto>
                    </View>
                </View>
            ))}

           {/* RODAPÉ */}
            <View style={{position: "absolute", bottom: 0, width: "100vw", height: "10vh", borderTopColor: "#555", borderTopWidth: 1, justifyContent: "center", alignItems: "center"}}>
                <Botao width="90%" height="50px" onPress={pedirCartao} >+ Pedir Cartão</Botao>
            </View>
        </View>
    )
};