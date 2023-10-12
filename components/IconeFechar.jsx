import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Botao from "./Botao";

export default function IconeFechar({ navigation }) {

    return (
        <View style={{width: "100%", height: "50px", padding: 20}}>
            {/* ÍCONE */}
            <Botao width="0%" height="0%" backgroundColor="transparent" onPress={() => navigation.navigate("TelaInicial", {valor: "Inicial"})}>
                <AntDesign name="close" size={32} color="black" />
            </Botao>
        </View>
    )
};