import { Text, View, StatusBar, TouchableOpacity, Alert } from "react-native";
import { estilos } from "./estilos";
import { useContext } from "react";
import { TemaContext } from "../../contexts/TemaContext";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { ProdutosContext } from "../../contexts/ProdutosContext";

export default function Finalizar({ navigation }) {
  const { temaEscolhido } = useContext(TemaContext);
  const estilo = estilos(temaEscolhido);

  const { usuario } = useContext(AutenticacaoContext);
  const {
    quantidade,
    precoTotal,
    finalizarCompra,
    descontoCompra,
    descontoTotal,
  } = useContext(ProdutosContext);

  async function finalizando() {
    const resultado = await finalizarCompra();
    usuario.pCompra = false;
    Alert.alert(resultado);
    navigation.navigate("Principal");
  }

  return (
    <View style={estilo.container}>
      <StatusBar />

      <View style={estilo.infos}>
        <Text style={estilo.titulo}>Informações de entrega</Text>
        <Text style={estilo.dados}>Nome: {usuario?.nome}</Text>
        <Text style={estilo.dados}>Endereço: {usuario?.endereco}</Text>
        <Text style={estilo.dados}>Banco: {usuario?.banco}</Text>
        <Text style={estilo.dados}>Telefone: {usuario?.telefone}</Text>
      </View>

      <View style={estilo.titulo}>
        <Text style={estilo.dados}>Quantidade: {quantidade}</Text>
        <Text style={estilo.dados}>Total dos itens: R$ {precoTotal.toFixed(2)}</Text>
        <Text style={estilo.desconto}>Desconto: - {descontoCompra * 100}%</Text>
        <Text style={estilo.valorTotal}>
          Valor Total: R$ {(precoTotal - descontoTotal).toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity style={estilo.botao} onPress={() => finalizando()}>
        <Text style={estilo.botaoTexto}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}
