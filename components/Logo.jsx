import { View, Image } from "react-native";

export default function Logo() {
    return (
        <View>
            <Image style={{width: "50px", height: "54px", margin: 20}} source={require("../assets/logo_preto.jpg")} />
        </View>
    )
};