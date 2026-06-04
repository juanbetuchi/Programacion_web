class Producto {
  #precio;
  #stock;

  constructor(nombre, marca, precio, stock, imagen) {
    this.nombre = nombre;
    this.marca  = marca;
    this.#precio = precio;
    this.#stock  = stock;
    this.imagen  = imagen;
  }

  get precio() {
    return this.#precio;
  }

  set precio(valor) {
    if (typeof valor !== 'number' || valor < 0) {
      throw new Error('El precio debe ser un número mayor o igual a 0');
    }
    this.#precio = valor;
  }

  get stock() {
    return this.#stock;
  }

  set stock(valor) {
    if (typeof valor !== 'number' || !Number.isInteger(valor) || valor < 0) {
      throw new Error('El stock debe ser un número entero mayor o igual a 0');
    }
    this.#stock = valor;
  }

  get estaDisponible() {
    return this.#stock > 0;
  }

  get precioFormateado() {
    return `$${this.#precio.toLocaleString('es-AR')}`;
  }

  fichaTecnica() {
    return `${this.nombre} - ${this.marca}`;
  }

  descripcion() {
    return `${this.nombre} — ${this.marca}`;
  }

  resumen() {
    const disponible = this.estaDisponible ? `${this.#stock} en stock` : 'Sin stock';
    return `${this.descripcion()} | ${this.precioFormateado} | ${disponible}`;
  }
}

class Notebook extends Producto {
  constructor(nombre, marca, precio, stock, imagen, procesador, ramGB, almacenamientoGB, pantallaPulgadas) {
    super(nombre, marca, precio, stock, imagen);
    this.procesador        = procesador;
    this.ramGB             = ramGB;
    this.almacenamientoGB  = almacenamientoGB;
    this.pantallaPulgadas  = pantallaPulgadas;
  }

  fichaTecnica() {
    return `${this.nombre} - ${this.procesador} - ${this.ramGB}GB RAM - ${this.almacenamientoGB}GB - ${this.pantallaPulgadas}"`;
  }
}

class Celular extends Producto {
  constructor(nombre, marca, precio, stock, imagen, pantallaPulgadas, bateriaMah, camaraMp, almacenamientoGB) {
    super(nombre, marca, precio, stock, imagen);
    this.pantallaPulgadas  = pantallaPulgadas;
    this.bateriaMah        = bateriaMah;
    this.camaraMp          = camaraMp;
    this.almacenamientoGB  = almacenamientoGB;
  }

  fichaTecnica() {
    return `${this.nombre} - ${this.pantallaPulgadas}" - ${this.bateriaMah}mAh - ${this.camaraMp}MP - ${this.almacenamientoGB}GB`;
  }
}

class Auricular extends Producto {
  constructor(nombre, marca, precio, stock, imagen, tipo, wireless, cancelacionRuido) {
    super(nombre, marca, precio, stock, imagen);
    this.tipo             = tipo;
    this.wireless         = wireless;
    this.cancelacionRuido = cancelacionRuido;
  }

  fichaTecnica() {
    const conexion  = this.wireless ? 'Inalámbrico' : 'Con cable';
    const cancelacion = this.cancelacionRuido ? 'Con cancelación de ruido' : 'Sin cancelación de ruido';
    return `${this.nombre} - ${this.tipo} - ${conexion} - ${cancelacion}`;
  }
}

class Monitor extends Producto {
  constructor(nombre, marca, precio, stock, imagen, pulgadas, resolucion, panelTipo, hz) {
    super(nombre, marca, precio, stock, imagen);
    this.pulgadas   = pulgadas;
    this.resolucion = resolucion;
    this.panelTipo  = panelTipo;
    this.hz         = hz;
  }

  fichaTecnica() {
    return `${this.nombre} - ${this.pulgadas}" - ${this.resolucion} - ${this.panelTipo} - ${this.hz}Hz`;
  }
}

class PCEscritorio extends Producto {
  constructor(nombre, marca, precio, stock, imagen, procesador, ramGB, almacenamientoGB, placaVideo, fuenteW) {
    super(nombre, marca, precio, stock, imagen);
    this.procesador       = procesador;
    this.ramGB            = ramGB;
    this.almacenamientoGB = almacenamientoGB;
    this.placaVideo       = placaVideo;
    this.fuenteW          = fuenteW;
  }

  fichaTecnica() {
    return `${this.nombre} - ${this.procesador} - ${this.ramGB}GB RAM - ${this.almacenamientoGB}GB - ${this.placaVideo} - ${this.fuenteW}W`;
  }
}

// ── Catálogo de productos ─────────────────────────────────────────────────────
const catalogo = [
  new Notebook(
    'MacBook Air M2', 'Apple', 2100000, 4,
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    'Apple M2', 8, 256, 13.6
  ),
  new Celular(
    'iPhone 15', 'Apple', 1650000, 12,
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    6.1, 3877, 48, 128
  ),
  new Auricular(
    'Sony WH-1000XM5', 'Sony', 420000, 0,
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    'Over-ear', true, true
  ),
  new Monitor(
    'LG UltraGear 27GP850', 'LG', 480000, 6,
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
    27, '2560x1440', 'IPS', 165
  ),
  new PCEscritorio(
    'PC Gamer Entry Level', 'Armada', 1200000, 5,
    'https://gkqpcbqdzdmhiokosvxa.supabase.co/storage/v1/object/public/datos/71028-producto-pc-ryzen-7-5700.jpg',
    'Intel Core i5-12400F', 16, 512, 'RTX 3060', 650
  ),
];

// ── Renderizado ───────────────────────────────────────────────────────────────

function crearTarjeta(producto) {

  const article = document.createElement('article');
  article.className = 'tarjeta';

  // Imagen del producto
  const img = document.createElement('img');
  img.src = producto.imagen;
  img.alt = producto.nombre;

  // Nombre
  const h3 = document.createElement('h3');
  h3.textContent = producto.nombre;

  // Precio formateado (getter de Producto)
  const precio = document.createElement('p');
  precio.className = 'precio';
  precio.textContent = producto.precioFormateado;

  // Ficha técnica (método de cada subclase)
  const ficha = document.createElement('p');
  ficha.className = 'ficha';
  ficha.textContent = producto.fichaTecnica();

  // Características básicas con lista
  const ul = document.createElement('ul');

  const liMarca = document.createElement('li');
  liMarca.textContent = `Marca: ${producto.marca}`;

  const liStock = document.createElement('li');
  liStock.textContent = producto.estaDisponible
    ? `Stock: ${producto.stock} unidades`
    : 'Sin stock';

  ul.appendChild(liMarca);
  ul.appendChild(liStock);

  // Botón
  const btn = document.createElement('button');
  btn.textContent = producto.estaDisponible ? 'Agregar al carrito' : 'Sin stock';
  btn.disabled    = !producto.estaDisponible;

  // Armar la tarjeta
  const info = document.createElement('div');
  info.className = 'tarjeta-info';
  info.appendChild(h3);
  info.appendChild(precio);
  info.appendChild(ficha);
  info.appendChild(ul);
  info.appendChild(btn);

  article.appendChild(img);
  article.appendChild(info);

  return article;
}

// Insertar todas las tarjetas en el div#catalogo-container
const contenedor = document.getElementById('catalogo-container');
if (contenedor) {
  catalogo.forEach(producto => contenedor.appendChild(crearTarjeta(producto)));
}

// Ofertas: productos con stock disponible
function renderOfertas() {
  const container = document.getElementById('ofertas-container');
  if (!container) return;
  const disponibles = catalogo.filter(p => p.estaDisponible);

  const ol = document.createElement('ol');
  for (const p of disponibles) {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} (${p.marca}) — ${p.precioFormateado}`;
    ol.appendChild(li);
  }
  container.appendChild(ol);
}

renderOfertas();
