import { useParams } from 'react-router-dom';

function Producto() {
  const { id } = useParams();

  return (
    <main>
      <h2>Producto {id}</h2>
    </main>
  );
}

export default Producto;
