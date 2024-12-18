import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { estilos } from "./estilos";
import { useContext } from "react";
import { TemaContext } from "../../contexts/TemaContext";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import imagemLogo from "../../imagens/logo.png";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");

  const { temaEscolhido } = useContext(TemaContext);
  const estilo = estilos(temaEscolhido);

  const { login } = useContext(AutenticacaoContext);

  function logandoNoSistema() {
    const resultado = login(user);
    if (resultado == "ok") {
      navigation.navigate("Principal");
    } else {
      Alert.alert(
        "Erro ao autenticar",
        "O nome de usuário deve começar com uma letra, conter apenas letras e números e ter mais de 3 caracteres."
      );
    }
  }

  return (
    <View style={estilo.container}>
      <StatusBar />

      <Image style={estilo.logo} source={imagemLogo} />

      <Text style={estilo.titulo}>Login</Text>

      <View style={estilo.inputArea}>
        <TextInput
          style={estilo.input}
          placeholder="Usuário"
          placeholderTextColor="#999"
          autoCapitalize="none"
          value={user}
          onChangeText={setUser}
        />
      </View>

      <TouchableOpacity style={estilo.botao} onPress={() => logandoNoSistema()}>
        <Text style={estilo.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
