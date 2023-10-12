import { View } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import Botao from "../components/Botao";
import Texto from "../components/Texto";
import Titulo from "../components/Titulo";
import CaixaTexto from "../components/CaixaTexto";
import IconeFechar from "../components/IconeFechar";

import axios from "axios";


export default function Emprestimo({ navigation }) {
    const [valor, setValor] = useState(0);
    const [parcela, setParcela] = useState(1);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorParcela, setValorParcela] = useState(0);


    // USE EFFECT PARA ATUALIZAR OS VALORES FINAIS DO RODAPÉ
    useEffect(() => {
        setValorTotal(parseFloat(valor) + (parseFloat(valor) * 0.38 * parseInt(parcela)));
        setValorParcela(parseFloat(valorTotal) / parseInt(parcela));
    });


    // REQUISIÇÃO PARA PEDIR UM EMPRÉSTIMO
    const pedirEmprestimo = () => {
        let tokenAccess = JSON.parse(localStorage.getItem("TokenAccess"));
        axios.post("http://127.0.0.1:8000/fastbank/emprestimos/", {
            valor: valor,
            qtd_parcela: parcela,
        },
        {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        .then(function(response) {
            alert("Empréstimo realizado com sucesso. O dinheiro já estará disponível na sua conta.");
            navigation.navigate("Sucesso");
        })
        .catch(function(error) {
            console.log(error);
            alert("Não foi possível realizar o empréstimo.");
            navigation.navigate("Falha");
        })
    };


    return (
        <View style={{display: "flex", width: "100vw", height: "100vh"}}>
            {/* ÍCONE FECHAR */}
            <IconeFechar navigation={navigation} />

            {/* TÍTULO EMPRÉSTIMO */}
            <View style={{marginLeft: 20, marginTop: 20, marginBottom: 20}}>
                <Titulo textAlign="left">Empréstimo</Titulo>
            </View>

            {/* INPUT */}
            <View style={{width: "100vw", borderTopColor: "#555", borderTopWidth: 1, justifyContent: "center", marginTop: 20}}>
                <View style={{paddingLeft: 20, marginTop: 20}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20}}>
                        <View>
                            {/* VALOR */}
                            <CaixaTexto height="30px" keyboardType="numeric" placeholder="Valor" onChangeText={setValor} />

                            {/* PARCELA */}
                            <CaixaTexto height="30px" keyboardType="numeric" placeholder="Parcelas" onChangeText={setParcela} />
                            
                            {/* VERIFICAÇÃO PARA NÃO APARECER NaN */}
                            {parcela == 0? setParcela(1): ""}
                        </View>
                        <Texto color="#555">Juros de 0.38%</Texto>
                    </View>
                </View>
            </View>

            {/* RODAPÉ */}
            <View style={{position: "absolute", bottom: 0, width: "100vw", height: "10vh", borderTopColor: "#555", borderTopWidth: 1, justifyContent: "space-between", alignItems: "center", paddingLeft: 20, paddingRight: 20, flexDirection: "row"}}>
                <View>
                    <Texto>Pegar Empréstimo</Texto>
                    <Texto><b>R${parseFloat(valorTotal).toFixed(2)}</b></Texto>
                    <Texto><b>{parcela} de R${parseFloat(valorParcela).toFixed(2)}</b></Texto>
                </View>

                <View style={{width: "50px", height: "50px", backgroundColor: "#000", borderRadius: "50px", justifyContent: "center", alignItems: "center"}}>
                    <Botao onPress={pedirEmprestimo}>
                        <AntDesign name="arrowright" size={32} color="white" />
                    </Botao>
                </View>
            </View>
        </View>
    );
};