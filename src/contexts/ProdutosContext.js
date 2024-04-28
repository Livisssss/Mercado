import { createContext, useContext, useEffect, useState } from "react";
import {
  pegarProdutos,
  salvarProduto,
  removerProduto,
} from "../servicos/requisicoes/produtos";

import { AutenticacaoContext } from "../contexts/AutenticacaoContext";

export const ProdutosContext = createContext({});

export function ProdutosProvider({ children }) {
  const [quantidade, setQuantidade] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [ultimosVistos, setUltimosVistos] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [descontoCompra, setDescontoCompra] = useState(0);
  const [descontoTotal, setDescontoTotal] = useState(0);

  const { usuario } = useContext(AutenticacaoContext);

  useEffect(async () => {
    const resultado = await pegarProdutos();
    setCarrinho(resultado);
    setQuantidade(resultado.length);
  }, []);

  async function viuProduto(produto) {
    const resultado = await salvarProduto(produto);
    const novoItemCarinho = [...carrinho, resultado];
    setCarrinho(novoItemCarinho);

    let novoUltimosVistos = new Set(ultimosVistos);
    novoUltimosVistos.add(produto);
    setUltimosVistos([...novoUltimosVistos]);

    setQuantidade(quantidade + 1);
    let novoPrecoTotal = precoTotal + produto.preco;
    setPrecoTotal(novoPrecoTotal);
    let desconto = calculaDesconto(novoPrecoTotal);
    setDescontoCompra(desconto);

    let totalDesconto = novoPrecoTotal * desconto;
    setDescontoTotal(totalDesconto);
  }

  const calculaDesconto = (novoPrecoTotal) => {
    if (usuario.pCompra) {
      return 0.15;
    }
    if (novoPrecoTotal >= 200 && novoPrecoTotal < 500) {
      return 0.05;
    }
    if (novoPrecoTotal >= 500) {
      return 0.1;
    }
    return 0;
  };

  async function finalizarCompra() {
    try {
      carrinho.forEach(async (produto) => {
        await removerProduto(produto);
      });
      setQuantidade(0);
      setPrecoTotal(0);
      setCarrinho([]);
      return "Compra finalizada com sucesso!";
    } catch (erro) {
      return "Erro ao finalizar a compra, tente novamente!";
    }
  }

  return (
    <ProdutosContext.Provider
      value={{
        quantidade,
        ultimosVistos,
        precoTotal,
        carrinho,
        viuProduto,
        finalizarCompra,
        descontoCompra,
        descontoTotal,
        setQuantidade,
        setPrecoTotal,
        setCarrinho,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}
