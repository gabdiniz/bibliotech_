import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { addEmprestimo } from "../../firebase/emprestimos";
import { getLivro, getLivros } from "../../firebase/livros";

export function AdicionarEmprestimo() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLivros().then(busca => {
      console.log(busca)
      setLivros(busca);
    });
    console.log(livros)
  }, [livros])
  console.log(livros)

  function onSubmit(data) {
    getLivro(data.idLivro).then((livro) => {
      delete data.idLivro;
      let novoEmprestimo = { ...data, status: "Pedente", livro, dataEmprestimo: new Date() };
      addEmprestimo(novoEmprestimo).then(() => {
        toast.success("Emprestimo adicionado como sucesso!");
        navigate("/emprestimo")
      })
    })
  }

  return (
    <div className="adicionar-emprestimo">
      <Container>
        <h1>Adicionar Emprestimo</h1>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formLeitor">
            <Form.Label>Leitor</Form.Label>
            <Form.Control type="text" className={errors.leitor && "is-invalid"} {...register("leitor", { required: "O campo leitor é obrigatório!", maxLength: { value: 255, message: "O limite é de 255 caracteres!" } })} />
            <Form.Text className="invalid-feedback">{errors.leitor?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "O campo email é obrigatório!", maxLength: { value: 255, message: "O limite é de 255 caracteres!" } })} />
            <Form.Text className="invalid-feedback">{errors.email?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="tel" className={errors.telefone && "is-invalid"} {...register("telefone", { required: "O campo telefone é obrigatório!", maxLength: { value: 255, message: "O limite é de 255 caracteres!" } })} />
            <Form.Text className="invalid-feedback">{errors.telefone?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefone">
            <Form.Label>Livro</Form.Label>
            <Form.Select className={errors.idLivro && "is-invalid"} {...register("idLivro", { required: "O campo telefone é obrigatório!" })} >
              <option >Selecione um livro</option>
              {livros.map((livro) => {
                return <option key={livro.id} value={livro.id}>{livro.titulo}</option>
              })}
            </Form.Select>
            <Form.Text className="invalid-feedback">{errors.idLivro?.message}</Form.Text>
          </Form.Group>

          <Button type="submit">Fazer emprestimo</Button>
        </Form>
      </Container>
    </div>
  )
}