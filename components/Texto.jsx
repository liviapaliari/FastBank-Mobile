import { Text } from "react-native";

export default function Texto({children, color="#000", fontSize=14, textAlign="left", fontWeight="normal", marginBottom="0"}) {
    return (
        <Text
            style={{
                color: color,
                fontSize: fontSize,
                textAlign: textAlign,
                fontWeight: fontWeight,
                marginBottom: marginBottom
            }}>
            {children}
        </Text>
    )
};