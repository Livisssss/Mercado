import { StyleSheet } from "react-native";

export const estilos = (tema) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tema.fundo,
      alignItems: "stretch",
    },
    infos: {
      width: "90%",
      backgroundColor: tema.cinza,
      margin: 16,
      padding: 16,
      borderRadius: 10,
    },
    titulo: {
      fontSize: 25,
      fontWeight: "bold",
      color: tema.titulo,
      marginBottom: 15,
    },
    dados: {
      fontSize: 17,
      color: tema.texto,
      marginLeft: 15,
      padding: 5,
    },
    botao: {
      margin: 16,
      marginBottom: 32,
      paddingVertical: 16,
      borderRadius: 10,
      backgroundColor: tema.botao,
    },
    botaoTexto: {
      fontSize: 18,
      fontWeight: "bold",
      color: tema.preto,
      textAlign: "center",
    },
  });
};
