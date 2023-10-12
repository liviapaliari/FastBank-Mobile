import { useState } from "react";
import { View } from "react-native";

import Logo from "../components/Logo";
import Botao from "../components/Botao";
import Texto from "../components/Texto";
import Rodape from "../components/Rodape";
import Titulo from "../components/Titulo";
import BotaoTela from "../components/BotaoTela";
import CaixaTexto from "../components/CaixaTexto";

import axios from "axios";


export default function Cadastro({ navigation }) {
    /*
        TODO FRONTEND
        - Usar a API do CEP para buscar os dados do endereço automaticamente.
        - Bloquear os campos de endereço enquanto o de CEP ainda não estiver preenchido.
        - Inserir input do tipo data.
        - Inserir input de image picker.
        - Fazer as validações antes de chegar na tela final, vai validando a tela que está sendo mostrada.
        - Fazer o LocalStorage para dispositivos mobile.
        - Colocar a função criarTokens no App e passar como props para outras telas.
    */

    const [tela, setTela] = useState(1)
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [nomeRazao, setNomeRazao] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtNascAbertura, setDtNascAbertura] = useState("");
    const [rg, setRg] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [senha, setSenha] = useState("");
    const [foto, setFoto] = useState("");


    // REQUISIÇÃO CADASTRAR NOVO USUÁRIO
    const cadastrarUser = () => {
        axios.post("http://127.0.0.1:8000/auth/users/", {
            cpf: cpfCnpj,
            nome_razao: nomeRazao,
            email: email,
            telefone: telefone,
            dt_nasc_abertura: dtNascAbertura,
            rg: rg,
            foto: foto,
            password: senha,
        })
        .then(function(response) {
            console.log(response);
            criarTokens();
        })
        .catch(function(error) {
            alert("Verifique se seus dados estão corretos.");
            console.log(error);
        })
    };


    // REQUISIÇÃO CRIAR TOKENS JWT
    const criarTokens = () => {
        axios.post("http://127.0.0.1:8000/auth/jwt/create", {
            cpf: cpfCnpj,
            password: senha,
        })
        .then(function(response) {
            // SALVANDO OS TOKENS JWT NO LOCAL STORAGE
            console.log(response);
            localStorage.setItem("TokenAccess", JSON.stringify(response.data.access));
            localStorage.setItem("TokenRefresh", JSON.stringify(response.data.refresh));
            cadastrarEndereco(response.data.access);
        })
        .catch(function(error) {
            console.log(error);
            alert("Não foi possível cadastrar o cliente.");
        })
    };

    // REQUISIÇÃO CADASTRAR ENDEREÇO
    const cadastrarEndereco = (tokenAccess) => {
        axios.post("http://127.0.0.1:8000/fastbank/enderecos/", {
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            complemento: complemento,
            cidade: cidade,
            uf: estado,
            cep: cep
        },
        {
            headers: { Authorization: "JWT " + tokenAccess }
        })
        .then(function(response) {
            console.log(response);
            localStorage.clear();
            alert("Usuário cadastrado com sucesso.");
            navigate("/login");
        })
        .catch(function(error) {
            console.log(error);
            alert("Não foi possível cadastrar o endereço. Tente novamente!");
            navigate("/");
        })
    };


    // FUNÇÃO MUDAR DE TELA
    const irTela = (numero) => {
        setTela(numero)
    }


    // FUNÇÃO NAVEGAR
    const navegar = (tela) => {
        navigation.navigate(tela)
    }


    return (
        <View style={{display: "flex", width: "100vw", height: "100vh"}}>
            {/* LOGO */}
            <Logo />

            {/* SE ESTIVER NA TELA 1 MOSTRA OS CAMPOS DE DADOS PESSOAIS */}
            {tela == 1?
                <>
                    {/* CABEÇALHO */}
                    <View style={{alignItems: "center", marginBottom: 60}}>
                        <View style={{marginBottom: 20}}>
                            <Titulo>Seus Dados Pessoais</Titulo>
                        </View>
                        <Texto>É bem simples, rápido e seguro.</Texto>
                        <Texto>Primeiro você deve criar uma conta para usar nosso aplicativo.</Texto>
                    </View>

                    {/* CONTEÚDO */}
                    <View style={{alignItems: "center"}}>
                        {/* CPF/CNPJ*/}
                        <CaixaTexto width="90%" height="40px" keyboardType="" placeholder="CPF / CNPJ" onChangeText={setCpfCnpj} value={cpfCnpj} />
                        
                        {/* NOME/RAZÃO SOCIAL */}
                        <CaixaTexto width="90%" height="40px" placeholder="Nome / Razão Social" onChangeText={setNomeRazao} value={nomeRazao} />

                        {/* E-MAIL */}
                        <CaixaTexto width="90%" height="40px" placeholder="E-mail" onChangeText={setEmail} value={email} />

                        {/* CELULAR */}
                        <CaixaTexto width="90%" height="40px" placeholder="Celular" onChangeText={setTelefone} value={telefone} />

                        <View style={{flexDirection: "row", width: "90%"}}>
                            {/* DATA DE NASCIMENTO / ABERTURA */}
                            <CaixaTexto width="50%" height="40px" keyboardType="" marginRight={8} placeholder="Data Nasc. / Abertura" onChangeText={setDtNascAbertura} value={dtNascAbertura} />

                            {/* REGISTRO GERAL */}
                            <CaixaTexto width="50%" height="40px" keyboardType="numeric" placeholder="Registro Geral" onChangeText={setRg} value={rg} />
                        </View>

                        {/* SENHA */}
                        <CaixaTexto width="90%" height="40px" keyboardType="password" secureTextEntry={true} placeholder="Senha" onChangeText={setSenha} />

                        {/* BOTÃO PRÓXIMO */}
                        <BotaoTela onPress={() => irTela(2)} width="90%" height="50px">Próximo</BotaoTela>
                    </View>
                </>
                : null
            }


            {/* SE ESTIVER NA TELA 2 MOSTRA OS CAMPOS DE ENDEREÇO */}
            {tela == 2?
                <>
                    {/* CABEÇALHO */}
                    <View style={{alignItems: "center", marginBottom: 60}}>
                        <View style={{marginBottom: 20}}>
                            <Titulo>Seu Endereço</Titulo>
                        </View>
                        <Texto>É bem simples, rápido e seguro.</Texto>
                        <Texto>Primeiro você deve criar uma conta para usar nosso aplicativo.</Texto>
                    </View>

                    <View style={{alignItems: "center"}}>
                        <View style={{flexDirection: "row", width: "90%"}}>
                            {/* CEP */}
                            <CaixaTexto width="50%" height="40px" marginRight={8} keyboardType="" placeholder="CEP" onChangeText={setCep} value={cep} />
                            
                            {/* BAIRRO */}
                            <CaixaTexto width="50%" height="40px" placeholder="Bairro" onChangeText={setBairro} value={bairro} />
                        </View>

                        {/* LOGRADOURO */}
                        <CaixaTexto width="90%" height="40px" placeholder="Logradouro" onChangeText={setLogradouro} value={logradouro} />

                        <View style={{flexDirection: "row", width: "90%"}}>
                            {/* NÚMERO */}
                            <CaixaTexto width="50%" height="40px" marginRight={8} placeholder="Número" onChangeText={setNumero} value={numero} />

                            {/* COMPLEMENTO */}
                            <CaixaTexto width="50%" height="40px" keyboardType="" placeholder="Complemento" onChangeText={setComplemento} value={complemento} />
                        </View>

                        <View style={{flexDirection: "row", width: "90%"}}>
                            {/* CIDADE */}
                            <CaixaTexto width="50%" height="40px" marginRight={8} placeholder="Cidade" onChangeText={setCidade} value={cidade} />

                            {/* ESTADO */}
                            <CaixaTexto width="50%" height="40px" placeholder="Estado" onChangeText={setEstado} value={estado} />
                        </View>

                        {/* BOTÃO VOLTAR */}
                        <BotaoTela onPress={() => irTela(1)} width="90%" height="50px">Voltar</BotaoTela>

                        {/* BOTÃO PRÓXIMO */}
                        <BotaoTela onPress={() => irTela(3)} width="90%" height="50px" margin={2}>Próximo</BotaoTela>
                    </View>
                </>
            : null    
            }


            {/* SE ESTIVER NA TELA 3 MOSTRA OS CAMPOS DE FOTO */}
            {tela == 3?
                <>
                    {/* CABEÇALHO FOTO */}
                    <View style={{alignItems: "center", marginBottom: 10, padding: 20}}>
                        <Texto fontSize={12} textAlign="center">Agora para finalizar, precisamos de uma foto do seu rosto para que possamos comprovar a autenticidade deste cadastro.</Texto>
                    </View>

                    {/* CONTEÚDO */}
                    <View style={{alignItems: "center"}}>
                        {/* IMAGEM */}
                        <img src={""} style={{width: "250px", height: "280px", backgroundColor: "#DDD"}} />
                        <input type="file" accept="image/*" capture="user" style={{marginTop: 20, marginBottom: 20}} onChange={(e) => setFoto(e.target.files)} />
                        {console.log(foto)}

                        {/* BOTÃO VOLTAR */}
                        <BotaoTela onPress={() => irTela(2)} width="90%" height="50px">Voltar</BotaoTela>

                        {/* BOTÃO CONCLUIR */}
                        <Botao onPress={cadastrarUser} width="90%" height="50px" margin={2}>Concluir</Botao>
                    </View>
                </>
            : null    
            }

            {/* RODAPÉ */}
            <Rodape height="8vh" onPress={() => navegar("Login")}>
                Já possui uma conta? Clique aqui para ir à <b>Tela de Login</b>.
            </Rodape>
        </View>
    )
};