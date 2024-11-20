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
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: tema.cinzaClaro,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    titulo: {
      fontSize: 24,
      fontWeight: "bold",
      color: tema.titulo,
      marginBottom: 10,
      letterSpacing: 1,
    },
    dados: {
      fontSize: 18,
      color: tema.texto,
      marginLeft: 15,
      padding: 8,
      borderBottomColor: tema.cinzaClaro,
    },
    botao: {
      margin: 16,
      marginBottom: 32,
      paddingVertical: 16,
      borderRadius: 10,
      backgroundColor: tema.botao,
      elevation: 5,
      transform: [{ scale: 1 }],
    },
    botaoTexto: {
      fontSize: 18,
      fontWeight: "bold",
      color: tema.preto,
      textAlign: "center",
    },
    desconto: {
      color: "red",
      fontSize: 18,
      marginLeft: 15,
      padding: 8,
      fontWeight: "bold",
    },
    valorTotal: {
      color: "#4b9e47",
      fontSize: 22,
      marginLeft: 15,
      padding: 8,
      fontWeight: "bold",
    },
  });
};
