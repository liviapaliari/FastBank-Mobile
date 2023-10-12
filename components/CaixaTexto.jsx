import { TextInput } from "react-native";

export default function CaixaTexto({width="100%", height, keyboardType, secureTextEntry=false, marginLeft=0, marginRight=0, maxLength="", placeholder, onChangeText, value}) {
    return (
        <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={(e)=>{onChangeText(e)}}
            maxLength={maxLength}
            value={value}
            style={{
                width: width,
                height: height,
                borderColor: "#555",
                borderWidth: 1,
                borderBottomWidth: 1,
                color: "#555",
                paddingLeft: 10,
                marginTop: 4,
                marginBottom: 4,
                marginLeft: marginLeft,
                marginRight: marginRight
            }}
        />
    )
};