import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css"

export function Livros() {

  const [livros, setLivros] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    getLivros().then((busca) => {
      setLivros(busca)
    })
  }

  function onDeleteLivro(id, titulo) {
    const deletar = window.confirm(`Tem certeza que deseja deletar ${titulo}?`);
    if (deletar) {
      deleteLivro(id).then(() => {
        toast.success(`${titulo} deletado.`)
        initializeTable();
      })
    }
  }

  return (
    <div className="livros">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Livros</h1>
          <Button as={Link} to="/livros/adicionar" variant="success">Adicionar livro</Button>
        </div>
        <hr />
        {livros === null ?
          <Loader /> : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Autor</th>
                  <th>Categoria</th>
                  <th>ISBN</th>
                  <th>Imagem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => {
                  return (
                    <tr key={livro.id}>
                      <td>{livro.titulo}</td>
                      <td>{livro.autor}</td>
                      <td>{livro.categoria}</td>
                      <td>{livro.isbn}</td>
                      <td><img src={livro.urlCapa} alt={`Capa do livro: ${livro.titulo}`} /></td>
                      <td className="d-flex flex-column" >
                        <Button variant="warning" size="sm" as={Link} to={`/livros/editar/${livro.id}`}> <i className="bi bi-pencil-square"></i></Button>
                        <Button variant="danger" size="sm" className="mt-2 px-1" onClick={() => { onDeleteLivro(livro.id, livro.titulo) }}><i className="bi bi-trash3" ></i></Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
      </Container>
    </div >
  )
}