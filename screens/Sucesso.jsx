import { View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Botao from "../components/Botao";
import Titulo from "../components/Titulo";
import IconeFechar from "../components/IconeFechar";


export default function Sucesso({ navigation }) {
    return (
        <View style={{display: "flex", width: "100vw", height: "100vh"}}>
            {/* ÍCONE FECHAR */}
            <IconeFechar navigation={navigation} />

            {/* ÍCONE SUCESSO */}
            <View style={{height: "70%", justifyContent: "center", alignItems: "center"}}>
                <FontAwesome5 name="check-circle" size={200} color="black" />
                <Titulo>Pagamento Efetuado com Sucesso</Titulo>
            </View>

            {/* RODAPÉ */}
            <View style={{position: "absolute", bottom: 0, width: "100vw", height: "10vh", borderTopColor: "#555", borderTopWidth: 1, justifyContent: "center", alignItems: "center"}}>
                <Botao width="90%" height="50px" onPress={() => navigation.navigate("TelaInicial", {valor: "Inicial"})}>Tela Inicial</Botao>
            </View>
        </View>
    );
};