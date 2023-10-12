import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import Botao from "../components/Botao";
import Texto from "../components/Texto";
import Titulo from "../components/Titulo";
import imagem from "../assets/imagem.png";

import axios from "axios";


export default function TelaInicial({ route, navigation }) {

    const [dadosConta, setDadosConta] = useState("");
    const [dadosCliente, setDadosCliente] = useState("");


    // FUNÇÃO NAVEGAR LOGIN
    const navegar = (tela) => {
        navigation.navigate(tela, {dadosConta: dadosConta, dadosCliente: dadosCliente});
    }


    const {valor} = route.params


    // USE EFFECT PARA PEGAR OS DADOS DA CONTA/CLIENTE
    useEffect(() => {
        // GET CONTA
        console.log("chamou useeffect");
        let tokenAccess = JSON.parse(localStorage.getItem("TokenAccess"));
        axios.get("http://127.0.0.1:8000/fastbank/contas/", {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        .then(function(response) {
            setDadosConta(response.data);
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })

        // GET CLIENTE
        axios.get("http://127.0.0.1:8000/fastbank/clientes/", {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        .then(function(response) {
            setDadosCliente(response.data)
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [valor]);


    return (
        <View style={{ display: "flex", width: "100vw", height: "100vh" }}>
            
            {/* CABEÇALHO */}
            <View style={{ width: "100%", height: "150px", display: "flex", flexDirection: "column", justifyContent: "space-around", backgroundColor: "#000", padding: 14 }}>

                {/* IMAGEM */}
                <View style={{ width: "60px", height: "60px" }}>
                    <img style={{ width: "100%", height: "100%", borderRadius: "50px" }} src={imagem} />
                </View>

                {/* NOME DO USUÁRIO */}
                <Texto color="#FFF" fontWeight="bold">Olá, {dadosCliente.nome_razao}</Texto>
            </View>

            {/* CONTEÚDO */}
            <View style={{ alignItems: "center", paddingTop: 20 }}>

                {/* SALDO */}
                <View style={{ width: "100%", paddingLeft: 14 }}>
                    <Texto>Meu saldo total R$ {dadosConta.saldo}</Texto>
                    <Texto fontWeight="bold" fontSize="24px"></Texto>
                </View>

                <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 50, marginBottom: 50 }}>
                    {/* TRANSFERÊNCIA */}
                    <View style={styles.item}>
                        <View style={styles.operacao}>
                            <Botao onPress={() => navegar("Transferencia")}>
                                <MaterialCommunityIcons name="bank-transfer" size={46} color="white" />
                            </Botao>
                        </View>
                        <Texto fontWeight="bold" fontSize="12px">Transferência</Texto>
                    </View>

                    {/* EXTRATO */}
                    <View style={styles.item}>
                        <View style={styles.operacao}>
                            <Botao onPress={() => navegar("Extrato")}>
                                <Ionicons name="receipt-sharp" size={44} color="white" />
                            </Botao>
                        </View>
                        <Texto fontWeight="bold" fontSize="12px">Extrato</Texto>
                    </View>

                    {/* EMPRÉSTIMO */}
                    <View style={styles.item}>
                        <View style={styles.operacao}>
                            <Botao onPress={() => navegar("Emprestimo")}>
                                <FontAwesome5 name="hand-holding-usd" size={44} color="white" />
                            </Botao>
                            </View>
                        <Texto fontWeight="bold" fontSize="12px">Empréstimo</Texto>
                    </View>

                    {/* INVESTIMENTO */}
                    <View style={styles.item}>
                        <View style={styles.operacao}>
                            <Botao>
                                <FontAwesome5 name="money-bill-wave" size={44} color="white" />
                            </Botao>
                        </View>
                        <Texto fontWeight="bold" fontSize="12px">Pagamento</Texto>
                    </View>
                </View>

                {/* MEUS CARTÕES */}
                <Botao width="90%" height="50px" borderRadius="10px" onPress={() => navegar("Cartao")}>Meus Cartões</Botao>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        width: "20%"
    },
    operacao: {
        width: "100%",
        backgroundColor: "#000",
        borderRadius: "10px",
        alignItems: "center",
        padding: 10,
        marginBottom: 10
    },
    servicos: {
        width: "100%",
        marginTop: 30,
        paddingTop: 14,
        paddingLeft: 14,
        borderTopWidth: "1px"
    }
});