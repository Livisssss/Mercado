import React, { useContext } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Produto } from "../../componentes/Produto";
import { estilos } from "./estilos";
import { Feather } from "react-native-vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/Feather";
import { TemaContext } from "../../contexts/TemaContext";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { ProdutosContext } from "../../contexts/ProdutosContext";

export default function Resumo({ navigation }) {
  const { temaEscolhido } = useContext(TemaContext);
  const estilo = estilos(temaEscolhido);
  const { usuario } = useContext(AutenticacaoContext);
  const { quantidade, carrinho, removerProdutoCarrinho } =
    useContext(ProdutosContext);

  const handleRemoverProduto = async (produto) => {
    await removerProdutoCarrinho(produto);
  };

  return (
    <View style={estilo.container}>
      <StatusBar />
      <View style={estilo.tituloArea}>
        <Text style={estilo.titulo}>Olá, {usuario?.nome}</Text>
        <View style={estilo.carrinhoArea}>
          <TouchableOpacity onPress={() => {}}>
            <Feather
              name="shopping-cart"
              size={30}
              color="#fff"
              style={estilo.carrinhoIcon}
            />
          </TouchableOpacity>
          {quantidade > 0 && (
            <View style={estilo.carrinhoQuantidadeArea}>
              <Text style={estilo.carrinhoQuantidade}>{quantidade}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Configurações")}
            style={estilo.iconArea}
          >
            <MaterialCommunityIcons
              name="settings"
              size={30}
              color="#fff"
              style={estilo.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilo.itemCarrinho}>
            <Produto item={item} adicionar={false} />
            <TouchableOpacity
              onPress={() => handleRemoverProduto(item)}
              style={estilo.botaoRemover}
            >
              <Text style={estilo.botaoRemoverTexto}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        style={estilo.lista}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[
          estilo.botao,
          carrinho.length === 0 ? estilo.botaoDesabilitado : null,
        ]}
        onPress={() => navigation.navigate("Finalizar")}
        disabled={carrinho.length === 0}
      >
        <Text style={estilo.botaoTexto}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}
