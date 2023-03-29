
import { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addLivro, getLivro } from "../../firebase/livros";
export function EditarLivro() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  function onSubmit(data) {
    addLivro(data).then(() => {
      toast.success("Livro editado com sucesso!", { duration: 2000 });
      navigate("/livros");
    });
  }


  useEffect(() => {
    getLivro(id).then(livro => {
      reset(livro);
    })
  }, []);

  return (
    <div className="editar-livro">
      <Container>
        <h1>Editar livro</h1>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("titulo", { required: "Título é obrigatório!", maxLength: { value: 255, message: "O limite é de 255 caracteres!" } })} />
            <Form.Text className="invalid-feedback">
              {errors.titulo?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAutor">
            <Form.Label>Autor/Autora</Form.Label>
            <Form.Control type="text" className={errors.autor && "is-invalid"} {...register("autor", { required: "Autor/Autora é obrigatório!", maxLength: { value: 255, message: "O limite é de 255 caracteres!" } })} />
            <Form.Text className="invalid-feedback">
              {errors.autor?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>Categoria</Form.Label>
            <Form.Control type="text" className={errors.categoria && "is-invalid"}{...register("categoria", { required: "Categoria é obrigatório!", maxLength: { value: 255, message: "O limite é de 255 caracteres!" } })} />
            <Form.Text className="invalid-feedback">
              {errors.categoria?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" className={errors.isbn && "is-invalid"}{...register("isbn", { required: "ISBN é obrigatório!", maxLength: { value: 255, message: "O limite é de 255 caracteres!" } })} />
            <Form.Text className="invalid-feedback">
              {errors.isbn?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCapa">
            <Form.Label>Capa</Form.Label>
            <Form.Control type="url" placeholder="url" className={errors.urlCapa && "is-invalid"}{...register("urlCapa", { required: "Capa é obrigatório!" })} />
            <Form.Text className="invalid-feedback">
              {errors.urlCapa?.message}
            </Form.Text>
          </Form.Group>

          <Button type="submit" variant="success">Editar</Button>
        </Form>
      </Container>
    </div>
  )
}