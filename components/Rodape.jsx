import { View } from "react-native";
import Botao from "./Botao";
import Texto from "./Texto";

export default function Rodape({children, width="100%", height, backgroundColor="#000", color="#FFF", onPress}) {
    return (
        <View
            style={{
                width: width,
                height: height,
                position: "absolute",
                bottom: 0,
                backgroundColor: backgroundColor,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 8,
                paddingRight: 8
            }}>
            <Botao backgroundColor="transparent" onPress={onPress}>
                <Texto fontSize={10} color={color} fontWeight="bold">
                    {children}
                </Texto>
            </Botao>
        </View>
    )
};