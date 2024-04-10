import { createContext, useState } from "react";

export const AutenticacaoContext = createContext({});

export function AutenticacaoProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  function login(email, senha) {
    if (email == "livis" && senha == "123") {
      setUsuario({
        nome: "Lívia",
        email: "livis",
        endereco: "Rua dos bobos",
        telefone: "(54) 99978-6543",
      });
      return "ok";
    } else {
      return "Email ou senha incorretos";
    }
  }

  return (
    <AutenticacaoContext.Provider value={{ usuario, login }}>
      {children}
    </AutenticacaoContext.Provider>
  );
}
