
import { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getLivro, updateLivro, uploadCapaLivro } from "../../firebase/livros";
export function EditarLivro() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  function onSubmit(data) {
    const imagem = data.imagem[0];
    if (imagem) {
      const toastId = toast.loading("Upload da imagem...");
      uploadCapaLivro(imagem).then((url) => {
        toast.dismiss(toastId)
        data.urlCapa = url;
        delete data.imagem;
        updateLivro(id, data).then(() => {
          toast.success("Livro editado com sucesso!");
          navigate("/livros");
        });
      })
    }
    else {
      delete data.imagem
      updateLivro(id, data).then(() => {
        toast.success("Livro editado com sucesso!");
        navigate("/livros");
      });
    }

  }


  useEffect(() => {
    getLivro(id).then(livro => {
      reset(livro);
    })
  }, [id, reset]);

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

          <Form.Group className="mb-3">
            <Form.Label>Imagem da capa</Form.Label>
            <Form.Control type="file" accept=".png,.jpg,.jpeg,.gif" {...register("imagem")} />
          </Form.Group>

          <Button type="submit" variant="success">Editar</Button>
        </Form>
      </Container>
    </div>
  )
}