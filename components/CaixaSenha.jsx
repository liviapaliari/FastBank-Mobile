import { TextInput } from "react-native";

export default function CaixaSenha({width="100%", height, keyboardType, secureTextEntry=false, marginLeft=0, marginRight=0, backgroundColor="white", color="#555", borderRadius, maxLength="", placeholder, onChangeText}) {
    return (
        <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={(e)=>{onChangeText(e)}}
            maxLength={maxLength}
            style={{
                width: width,
                height: height,
                color: "#FFF",
                marginTop: 4,
                marginBottom: 4,
                backgroundColor: "#000",
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "24px"
            }}
        />
    )
};