import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>TechStore</h1>
      <nav>
        <ul>
          <li><Link to="/">Productos</Link></li>
          <li><Link to="/crear-producto">Crear producto</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
