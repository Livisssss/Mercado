import { createContext, useContext, useState } from "react";
import { ProdutosContext } from "./ProdutosContext";

export const AutenticacaoContext = createContext({});

export function AutenticacaoProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  const validadeUser = (user) => {
    if (
      user.charAt(0) &&
      user.length >= 5 &&
      user.length <= 8 &&
      /^[a-zA-Z]+$/.test(user)
    ) {
      return true;
    }
    return false;
  };

  function login(user) {
    if (user) {
      if (validadeUser(user)) {
        setUsuario({
          nome: user,
          endereco: "Rua dos tongo",
          banco: "Tigrinho",
          telefone: "(54) 98765-4321",
          pCompra: true,
        });

        return "ok";
      } else {
        return "not ok";
      }
    }
  }

  return (
    <AutenticacaoContext.Provider value={{ usuario, login }}>
      {children}
    </AutenticacaoContext.Provider>
  );
}
