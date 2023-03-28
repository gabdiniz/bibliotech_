import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { getLivros } from "../../firebase/livros";
import "./Livros.css"

export function Livros() {

  const [livros, setLivros] = useState(null);

  useEffect(() => {
    getLivros().then((busca) => {
      setLivros(busca)
    })
  }, []);

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
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
      </Container>
    </div>
  )
}