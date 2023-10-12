import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Falha from "./screens/Falha";
import Cartao from "./screens/Cartao";
import Extrato from "./screens/Extrato";
import Sucesso from "./screens/Sucesso";
import Cadastro from "./screens/Cadastro";
import Emprestimo from "./screens/Emprestimo";
import TelaInicial from "./screens/TelaInicial";
import Transferencia from "./screens/Transferencia";


const Stack = createStackNavigator();
export default function Routers() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{title: false, headerShown: false}} />
                <Stack.Screen name="Cadastro" component={Cadastro} options={{title: false, headerShown: false}} />
                <Stack.Screen name="TelaInicial" component={TelaInicial} options={{title: false, headerShown: false}} />
                <Stack.Screen name="Transferencia" component={Transferencia} options={{title: false, headerShown: false}} />
                <Stack.Screen name="Sucesso" component={Sucesso} options={{title: false, headerShown: false}} />
                <Stack.Screen name="Falha" component={Falha} options={{title: false, headerShown: false}} />
                <Stack.Screen name="Extrato" component={Extrato} options={{title: false, headerShown: false}} />
                <Stack.Screen name="Emprestimo" component={Emprestimo} options={{title: false, headerShown: false}} />
                <Stack.Screen name="Cartao" component={Cartao} options={{title: false, headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};