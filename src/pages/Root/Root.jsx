import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";

// Layout principal do App com Navbar fixa
// As páginas com Navbar fixa: home, livros, expréstimos, etc
export function Root() {
  const usuarioLogado = useContext(AuthContext)
  if (usuarioLogado === null) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}