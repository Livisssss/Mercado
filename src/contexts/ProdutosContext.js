import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

  useEffect(() => {
    const loadProdutos = async () => {
      const resultado = await pegarProdutos();
      setCarrinho(resultado);
      setQuantidade(resultado.length);
      atualizarPrecoTotal(resultado);
    };

    loadProdutos();
  }, []);

  const atualizarPrecoTotal = (novoCarrinho) => {
    let novoPrecoTotal = novoCarrinho.reduce(
      (acc, item) => acc + item.preco,
      0
    );
    setPrecoTotal(novoPrecoTotal);

    let desconto = calculaDesconto(novoPrecoTotal);
    setDescontoCompra(desconto);

    let totalDesconto = novoPrecoTotal * desconto;
    setDescontoTotal(totalDesconto);
  };

  async function viuProduto(produto) {
    const resultado = await salvarProduto(produto);
    const novoItemCarrinho = [...carrinho, resultado];
    setCarrinho(novoItemCarrinho);

    let novoUltimosVistos = new Set(ultimosVistos);
    novoUltimosVistos.add(produto);
    setUltimosVistos([...novoUltimosVistos]);

    setQuantidade(quantidade + 1);
    atualizarPrecoTotal(novoItemCarrinho);
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

  const removerProdutoCarrinho = useCallback(
    async (produto) => {
      try {
        const novoCarrinho = carrinho.filter((item) => item.id !== produto.id);
        setCarrinho(novoCarrinho);
        setQuantidade(novoCarrinho.length);

        atualizarPrecoTotal(novoCarrinho);

        await removerProduto(produto);
      } catch (error) {
        console.error("Erro ao remover produto do carrinho:", error);
      }
    },
    [carrinho]
  );

  async function finalizarCompra() {
    try {
      await Promise.all(
        carrinho.map(async (produto) => await removerProduto(produto))
      );

      setCarrinho([]);
      setQuantidade(0);
      setPrecoTotal(0);
      setDescontoCompra(0);
      setDescontoTotal(0);

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
        removerProdutoCarrinho,
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
