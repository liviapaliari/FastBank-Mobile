import { View } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import Botao from "../components/Botao";
import Texto from "../components/Texto";
import Titulo from "../components/Titulo";
import CaixaTexto from "../components/CaixaTexto";
import IconeFechar from "../components/IconeFechar";

import axios from "axios";


export default function Transferencia({ route, navigation }) {
    // DADOS DA CONTA/CLIENTE (PARÂMETRO DA TELA INICIAL)
    const [dadosConta, setDadosConta] = useState("");
    const [dadosCliente, setDadosCliente] = useState("");
    const [chave, setChave] = useState("");
    const [valor, setValor] = useState();
    const [descricao, setDescricao] = useState("");


    // USE EFFECT PARA ATRIBUIR DADOS AO USE STATE
    useEffect(() => {
        setDadosConta(route.params.dadosConta);
        setDadosCliente(route.params.dadosCliente);
    }, []);
    

    // FUNÇÃO NAVEGAR ENTRE TELAS
    const navegar = (tela) => {
        navigation.navigate(tela)
    };


    // REQUISIÇÃO PARA TRANSFERIR
    const transferir = () => {
        let tokenAccess = JSON.parse(localStorage.getItem("TokenAccess"));
        axios.post("http://127.0.0.1:8000/fastbank/transacoes/", {
            chave: chave,
            descricao: descricao,
            valor: valor,
        },
        {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        
        .then(function(response) {
            navegar("Sucesso")
            console.log(response.data)
        })
        .catch(function(error) {
            navegar("Falha")
            console.log(error)
        })
    };


    return (
        <View style={{display: "flex", width: "100vw", height: "100vh"}}>
            {/* ÍCONE FECHAR */}
            <IconeFechar navigation={navigation} />

            {/* TÍTULO TRANSFERÊNCIA */}
            <View style={{marginLeft: 20, marginTop: 20, marginBottom: 20}}>
                <Titulo textAlign="left">Qual é o valor da transferência?</Titulo>
                <Titulo textAlign="left">Quem vai receber o dinheiro?</Titulo>
            </View>

            {/* SALDO DISPONÍVEL */}
            <View style={{marginLeft: 20}}>
                <Texto>Saldo disponível em conta <b>{dadosConta.saldo}</b>.</Texto>
            </View>

            {/* INPUT */}
            <View style={{alignItems: "center", marginTop: 20}}>
                <CaixaTexto width="90%" height="40px" placeholder="CPF Destinatário" onChangeText={setChave} value={chave} />
            </View>
            <View style={{alignItems: "center", marginTop: 20}}>
                <CaixaTexto width="90%" height="40px" placeholder="R$" onChangeText={setValor} value={valor} />
            </View>
            <View style={{alignItems: "center", marginTop: 20}}>
                <CaixaTexto width="90%" height="40px" keyboardType="text" placeholder="Descrição (Opcional)" onChangeText={setDescricao} value={descricao} />
            </View>

            {/* RODAPÉ */}
            <View style={{position: "absolute", bottom: 0, width: "100vw", height: "10vh", borderTopColor: "#555", borderTopWidth: 1, justifyContent: "space-between", alignItems: "center", paddingLeft: 20, paddingRight: 20, flexDirection: "row"}}>
                <View>
                    <Texto>Total a Pagar</Texto>
                    <Texto><b>{valor == null? "R$ 0.00": "R$ " + valor}</b></Texto>
                </View>
                <View style={{width: "50px", height: "50px", backgroundColor: "#000", borderRadius: "50px", justifyContent: "center", alignItems: "center"}}>
                    <Botao onPress={transferir}>
                        <AntDesign name="arrowright" size={32} color="white" />
                    </Botao>
                </View>
            </View>
        </View>
    );
};