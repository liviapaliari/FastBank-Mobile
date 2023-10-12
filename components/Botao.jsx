import { TouchableOpacity } from "react-native";
import Texto from "./Texto";

export default function Botao({children, width="100%", height, backgroundColor="#000", borderRadius="50px", margin=10, color="#FFF", onPress}) {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={{
                width: width,
                height: height,
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                alignItems: "center",
                justifyContent: "center",
                margin: margin
            }}>
            <Texto color={color} fontWeight="bold">{children}</Texto>
        </TouchableOpacity>
    )
};