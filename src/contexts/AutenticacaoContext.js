import { createContext, useState } from "react";

export const AutenticacaoContext = createContext({});

export function AutenticacaoProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  const validadeUser = (user) => {
    if (
      isNaN(user.charAt(0)) &&
      user.length >= 3 &&
      /^[a-zA-Z0-9]+$/.test(user)
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
          endereco: "Rua dos Pescadores, 123 - Bairro da Isca",
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
