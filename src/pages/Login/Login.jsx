import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import { loginEmailSenha, loginGoogle } from "../../firebase/auth";
import "./Login.css";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    loginEmailSenha(data.email, data.senha).then((user) => {
      toast.success(`Logado como ${user.email}`);
      navigate("/");
    }).catch((e) => {
      if (e.code === "auth/user-not-found") {
        toast.error(`Este usuário não existe.`);
      }
      else if (e.code === "auth/wrong-password") {
        toast.error(`Senha incorreta.`)
      }
      else {
        toast.error(`${e.code}`)
      }
    })
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
    <Container fluid className="container-login-cadastro" >
      <div className="login-cadastro" >
        <p className="text-center">
          <img src={loginImg} width="256" alt="Logo" />
        </p>
        <h4>Bem-vindo(a) de volta!</h4>
        <p className="text-muted">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
        <hr />
        <Button
          className="mb-3"
          variant="danger"
          onClick={onLoginGoogle}
        >
          <img src={googleIcon} width="36" alt="Google icon" /> Entrar com o
          Google
        </Button>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              className={errors.email ? "is-invalid" : ""}
              {...register("email", { required: "Email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Senha"
              className={errors.senha ? "is-invalid" : ""}
              {...register("senha", { required: "Senha é obrigatória" })}
            />
            <Form.Text className="invalid-feedback">
              {errors.senha?.message}
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="success">
            Entrar
          </Button>
        </Form>
      </div>
    </Container>
  );
}