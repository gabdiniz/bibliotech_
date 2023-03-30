import { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { getEmprestimos } from "../../firebase/emprestimos";

export function Emprestimos() {

  const [emprestimos, setEmprestimos] = useState(null);
  useEffect(() => {
    initializeTable();
  }, [])

  function initializeTable() {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca);
    })
  }
  console.log(emprestimos)

  return (
    <div className="emprestimos">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Emprestimos</h1>
          <Button variant="success" to="emprestimos/adicionar">Adicionar emprestimo</Button>
        </div>
        <hr />
        {
          emprestimos === null ? <Loader /> :
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Leitor</th>
                  <td>Email</td>
                  <td>Telefone</td>
                  <td>Livro</td>
                  <td>Status</td>
                  <td>Data</td>
                </tr>
              </thead>
              <tbody>
                {emprestimos.map((emp) => {
                  const data = emp.dataEmprestimo.toDate().toLocaleDateString();
                  return (
                    <tr key={emp.id}>
                      <td>{emp.leitor}</td>
                      <td>{emp.email}</td>
                      <td>{emp.telefone}</td>
                      <td>{emp.livro.titulo}</td>
                      <td><Badge bg={emp.status === "Pendente" ? "success" : "warning"}>{emp.status}</Badge></td>
                      <td>{data}</td>
                      <td className="d-flex flex-column">
                        <Button variant="warning" size="sm" as={Link} to={`/emprestimos/editar/${emp.id}`}><i className="bi bi-pencil-square"></i></Button>
                        <Button variant="danger" size="sm" className="mt-2 px-1"><i className="bi bi-trash3" ></i></Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
        }

      </Container>
    </div>

  )
}