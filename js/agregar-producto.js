const form      = document.getElementById('form-producto');
const mensaje   = document.getElementById('mensaje');
const selectCat = document.getElementById('categoria');

const bloques = {
  notebook:     ['campos-procesador', 'campo-pantalla'],
  celular:      ['campo-pantalla', 'campos-celular'],
  auricular:    ['campos-auricular'],
  monitor:      ['campos-monitor'],
  pc_escritorio:['campos-procesador', 'campos-pc'],
};

selectCat.addEventListener('change', () => {
  // ocultar todos los bloques extra
  document.querySelectorAll('.campos-extra').forEach(el => el.style.display = 'none');

  const activos = bloques[selectCat.value] || [];
  activos.forEach(id => {
    document.getElementById(id).style.display = 'block';
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  mensaje.textContent = '';

  const categoria = selectCat.value;

  const body = {
    nombre:   document.getElementById('nombre').value.trim(),
    marca:    document.getElementById('marca').value.trim(),
    precio:   Number(document.getElementById('precio').value),
    stock:    Number(document.getElementById('stock').value),
    imagen:   document.getElementById('imagen').value.trim(),
    categoria,
  };

  if (categoria === 'notebook') {
    body.procesador       = document.getElementById('procesador').value.trim();
    body.ramGB            = Number(document.getElementById('ramGB').value);
    body.almacenamientoGB = Number(document.getElementById('almacenamientoGB').value);
    body.pantallaPulgadas = Number(document.getElementById('pantallaPulgadas').value);
  }

  if (categoria === 'celular') {
    body.pantallaPulgadas = Number(document.getElementById('pantallaPulgadas').value);
    body.almacenamientoGB = Number(document.getElementById('almacenamientoGB-celular').value);
    body.bateriaMah       = Number(document.getElementById('bateriaMah').value);
    body.camaraMp         = Number(document.getElementById('camaraMp').value);
  }

  if (categoria === 'auricular') {
    body.tipo             = document.getElementById('tipo').value;
    body.wireless         = document.getElementById('wireless').checked;
    body.cancelacionRuido = document.getElementById('cancelacionRuido').checked;
  }

  if (categoria === 'monitor') {
    body.pulgadas   = Number(document.getElementById('pulgadas').value);
    body.resolucion = document.getElementById('resolucion').value;
    body.panelTipo  = document.getElementById('panelTipo').value;
    body.hz         = Number(document.getElementById('hz').value);
  }

  if (categoria === 'pc_escritorio') {
    body.procesador       = document.getElementById('procesador').value.trim();
    body.ramGB            = Number(document.getElementById('ramGB').value);
    body.almacenamientoGB = Number(document.getElementById('almacenamientoGB').value);
    body.placaVideo       = document.getElementById('placaVideo').value.trim();
    body.fuenteW          = Number(document.getElementById('fuenteW').value);
  }

  try {
    const respuesta = await fetch('http://localhost:8080/productos', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    if (!respuesta.ok) throw new Error(`Error del servidor: ${respuesta.status}`);

    mensaje.textContent = 'Producto agregado correctamente.';
    form.reset();
    document.querySelectorAll('.campos-extra').forEach(el => el.style.display = 'none');

  } catch (error) {
    mensaje.style.color = '#C0392B';
    mensaje.textContent = `No se pudo agregar el producto: ${error.message}`;
  }
});
