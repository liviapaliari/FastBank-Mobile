import { Text } from "react-native";

export default function Titulo({children, color="#000", textAlign="center"}) {
    return (
        <Text
            style={{
                color: color,
                fontSize: 16,
                fontWeight: "bold",
                textAlign: textAlign,
                marginTop: "5px",
                marginBottom: "5px"
            }}>
            {children}
        </Text>
    )
};