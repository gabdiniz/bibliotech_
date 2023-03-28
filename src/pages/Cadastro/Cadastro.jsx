import { Button, Container, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png"
import googleIcon from "../../assets/icons/google-white.svg"
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import "../Login/Login.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export function Cadastro() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    cadastrarEmailSenha(data.email, data.senha).then((user) => {
      toast.success(`Bem-vindo(a) ${user.email}`);
      navigate("/");
    }).catch((e) => {
      if (e.code === "auth/email-already-in-use") {
        toast.error(`Um erro aconteceu. Este e-mail já está em uso.`);
      }
      else if (e.code === "auth/invalid-email") {
        toast.error(`Um erro aconteceu. Este e-mail é inválido.`);
      }
      else {
        toast.error(`Um erro aconteceu. Código: ${e.code}.`);
      }
    });
  }
  function onLoginGoogle() {
    loginGoogle().then((user) => {
      toast.success(`Bem-vindo(a) ${user.displayName}`);
      navigate("/");
    }).catch((e) => {
      if (e.code === "auth/popup-closed-by-user") {
        toast.error(`Um erro aconteceu. A tela de login foi fechada.`);
      }
      else {
        toast.error(`Um erro aconteceu. Código: ${e.code}`);
      }
    });
  }

  const usuarioLogado = useContext(AuthContext)

  if (usuarioLogado !== null) {
    return <Navigate to={"/"} />
  }

  return (
    <Container fluid className="container-login-cadastro">
      <div className="login-cadastro">
        <p className="text-center">
          <img src={logoIcon} alt="Logo de livros" width="256" />
        </p>
        <h4>Faça parte da nossa plataforma</h4>
        <p className="text-muted">Já tem uma conta? <Link to="/login">Faça login</Link></p>
        <hr />
        <Button variant="danger" className="mb-3" onClick={onLoginGoogle}> <img src={googleIcon} alt="Icon do Google" width="36" /> Entrar com o Google</Button>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className={errors.email && "is-invalid"}
              placeholder="Email"
              {...register("email", { required: "O email é obrigatório" })} />
            <Form.Text className="invalid-feedback">{errors.email?.message}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              className={errors.senha && "is-invalid"}
              placeholder="Nova senha"
              {...register("senha", { required: "A senha é obrigatória", minLength: { value: 8, message: "A senha deve conter no mínimo 8 caracteres" } })} />
            <Form.Text className="invalid-feedback">{errors.senha?.message}</Form.Text>
          </Form.Group>
          <Button type="submit" variant="success">Cadastrar</Button>
        </Form>
      </div>
    </Container>
  );
};