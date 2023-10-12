import { useState } from "react";
import { View } from "react-native";

import Logo from "../components/Logo";
import Botao from "../components/Botao";
import Texto from "../components/Texto";
import Rodape from "../components/Rodape";
import Titulo from "../components/Titulo";
import CaixaTexto from "../components/CaixaTexto";

import axios from "axios";


export default function Login({ navigation }) {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    

    // FUNÇÃO NAVEGAR ENTRE TELAS
    const navegar = (tela) => {
        navigation.navigate(tela)
    }


    // FUNÇÃO CRIAR TOKENS
    const criarTokens = (tokenAccess, tokenRefresh) => {
        localStorage.setItem("TokenAccess", JSON.stringify(tokenAccess));
        localStorage.setItem("TokenRefresh", JSON.stringify(tokenRefresh));
    }


    // REQUISIÇÃO LOGIN/GERAR CHAVES JWT
    const logar = () => {
        axios.post("http://127.0.0.1:8000/auth/jwt/create", {
            cpf: cpf,
            password: senha,
        })
        .then(function(response) {
            criarTokens(response.data.access, response.data.refresh)
            alert("Login realizado com sucesso!")
            navigation.navigate("TelaInicial", {valor: "TelaInicial"});
        })
        .catch(function(error) {
            alert("Usuário e/ou senha incorretos.");
            console.log(error);
        })
    }


    return (
        <View style={{display: "flex", width: "100vw", height: "100vh"}}>
            {/* LOGO */}
            <Logo />

            {/* CABEÇALHO */}
            <View style={{alignItems: "center", marginBottom: 100, padding: 20}}>
                <View style={{marginBottom: 20}}>
                    <Titulo>Queremos deixar o FastBank ainda mais protegido. Por isso, sempre vamos pedir uma senha para acessar o aplicativo.</Titulo>
                </View>
                <Texto>Seja bem-vindo(a).</Texto>
            </View>

            {/* CONTEÚDO */}
            <View style={{alignItems: "center"}}>
                <View style={{width: "100%", alignItems: "center", marginBottom: 40}}>
                    {/* CPF */}
                    <CaixaTexto width="90%" height="40px" keyboardType="" placeholder="CPF" onChangeText={setCpf} />

                    {/* SENHA */}
                    <CaixaTexto width="90%" height="40px" keyboardType="" secureTextEntry={true} placeholder="Senha" onChangeText={setSenha} />
                </View>

                <View style={{width: "100%", alignItems: "center", marginBottom: 40}}>
                    {/* BOTÃO PRÓXIMO */}
                    <Botao width="90%" height="50px" onPress={logar}>Desbloquear Aplicativo</Botao>
                    <Botao width="90%" height="50px">Desbloquear com Digital Cadastrada</Botao>
                </View>
            </View>

            {/* RODAPÉ */}
            <Rodape height="8vh" onPress={() => navegar("Cadastro")}>
                Não possui uma conta? Clique aqui para ir à <b>Tela de Cadastro</b>.
            </Rodape>
        </View>
    )
};