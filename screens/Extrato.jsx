import { View } from "react-native";
import { useEffect, useState } from "react";

import Texto from "../components/Texto";
import Titulo from "../components/Titulo";
import IconeFechar from "../components/IconeFechar";

import axios from "axios";


export default function Extrato({ navigation }) {
    /*
        TODO
        - Formatar as datas.
        - Tentar identificar as transferências, se recebeu ou se enviou.
    */

    const [resposta, setResposta] = useState([]);

    // REQUISIÇÃO PARA GET TRANSFERÊNCIA
    useEffect(() => {       
        let tokenAccess = JSON.parse(localStorage.getItem("TokenAccess"));
        axios.get("http://127.0.0.1:8000/fastbank/transacoes/", {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        .then(function(response) {
            console.log(response)
            setResposta(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, []);


    return (
        <View style={{display: "flex", width: "100vw", height: "100vh"}}>
            {/* ÍCONE FECHAR */}
            <IconeFechar navigation={navigation} />

            {/* TÍTULO EXTRATO */}
            <View style={{marginLeft: 20, marginTop: 20, marginBottom: 20}}>
                <Titulo textAlign="left">Extrato</Titulo>
            </View>

            {/* ITEM */}
            {resposta.map((transacao) => (
                <View key={transacao.id} style={{width: "100vw", borderTopColor: "#555", borderTopWidth: 1, justifyContent: "center", marginTop: 20}}>
                    <View style={{paddingLeft: 20, marginTop: 20}}>
                        <>
                            <Texto>Transferência</Texto>
                            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20}}>
                                <View>
                                    <Texto color="#555">{transacao.nome_destinatario}</Texto>
                                    <Texto color="#555">{transacao.data_hora}</Texto>
                                </View>
                                <Texto color="#555">R$ {transacao.valor}</Texto>
                            </View>
                        </>
                    </View>
                </View>
            ))};
        </View>
    );
};