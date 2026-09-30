export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  sales: number;
  category: string;
  tags: string[];
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
}

/** Comisión por venta de la tienda (margen sobre el precio de venta). */
export const COMMISSION_RATE = 0.40; // 40%

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  { id: 'electronica', name: 'Electrónica y Gadgets', slug: 'electronica', description: 'Auriculares, cargadores, smartwatches y accesorios tech más vendidos', icon: '📱', image: u('photo-1505740420928-5e560c06d30e') },
  { id: 'moda', name: 'Moda y Accesorios', slug: 'moda', description: 'Ropa, joyería y accesorios de moda tendencia 2025-2026', icon: '👗', image: u('photo-1445205170230-053b83016050') },
  { id: 'hogar', name: 'Hogar y Organización', slug: 'hogar', description: 'Organización, decoración y soluciones inteligentes para el hogar', icon: '🏠', image: u('photo-1586023492125-27b2c045efd7') },
  { id: 'belleza', name: 'Belleza y Cuidado Personal', slug: 'belleza', description: 'Herramientas de belleza, skincare y accesorios de cuidado personal', icon: '💄', image: u('photo-1596462502278-27bfdd403348') },
  { id: 'salud', name: 'Salud y Bienestar', slug: 'salud', description: 'Masajeadores, correctores de postura y dispositivos de bienestar', icon: '🧘', image: u('photo-1544367567-0f2fcb009e0b') },
  { id: 'mascotas', name: 'Mascotas', slug: 'mascotas', description: 'Accesorios, juguetes y tecnología para perros y gatos', icon: '🐾', image: u('photo-1587300003388-59208cc962cb') },
  { id: 'auto', name: 'Auto y Motos', slug: 'auto', description: 'Soportes, cargadores y accesorios para vehículos', icon: '🚗', image: u('photo-1492144534655-ae79c964c9d7') },
  { id: 'deportes', name: 'Deportes y Outdoor', slug: 'deportes', description: 'Equipamiento deportivo, outdoor y fitness portátil', icon: '⚽', image: u('photo-1461896836934-ffe607ba6851') },
  { id: 'cocina', name: 'Cocina y Utensilios', slug: 'cocina', description: 'Utensilios de cocina, organizadores y gadgets culinarios', icon: '🍳', image: u('photo-1556909114-f6e7ad7d3136') },
  { id: 'oficina', name: 'Oficina y Smart Home', slug: 'oficina', description: 'Iluminación inteligente, organizadores y accesorios de oficina', icon: '💡', image: u('photo-1497366216548-37526070297c') },
];

function p(
  id: string,
  name: string,
  slug: string,
  description: string,
  price: number,
  originalPrice: number | undefined,
  imageIds: [string, string, string],
  rating: number,
  reviews: number,
  sales: number,
  category: string,
  tags: string[],
  stock: number
): Product {
  const images = imageIds.map((pid) => u(pid, 800));
  return {
    id, name, slug, description, price, originalPrice,
    image: images[0], images, rating, reviews, sales, category, tags, stock,
  };
}

/**
 * Imágenes curadas por tipo de producto (Unsplash).
 * La 1ª foto es la principal y debe representar el producto;
 * la 2ª y 3ª refuerzan el mismo tipo (detalle / uso / similar).
 */
export const products: Product[] = [
  // ========== ELECTRÓNICA ==========
  p('el-001',
    'Auriculares TWS Bluetooth 5.3 con Cancelación de Ruido',
    'auriculares-tws-bluetooth-53',
    'Auriculares inalámbricos true wireless con cancelación activa de ruido (ANC), Bluetooth 5.3 y certificación IPX4. Incluyen estuche de carga (hasta 30 h de autonomía total), micrófonos para llamadas y almohadillas de varios tamaños. Ideales para deporte, oficina y uso diario. La foto principal muestra auriculares TWS blancos con estuche.',
    12990, 24990,
    ['photo-1590658268037-6bf12165a8df', 'photo-1572569511254-d8f925fe2cbb', 'photo-1606220945770-b5b6c2c55bf1'],
    4.8, 12450, 89000, 'electronica', ['bluetooth', 'tws', 'anc', 'auriculares'], 150),

  p('el-002',
    'Cable USB-C 240W PD Fast Charge 2m con Chip E-Marker',
    'cable-usbc-240w-pd',
    'Cable USB-C a USB-C de 2 metros con chip E-Marker para Power Delivery hasta 240W (5A). Compatible con MacBook, iPad, Samsung y laptops con USB-C. Trenzado resistente y transmisión de datos. La imagen principal muestra un cable USB-C de carga rápida.',
    5990, 9990,
    ['photo-1625948515291-69613efd103f', 'photo-1583863788434-e58a36330cf0', 'photo-1612815154858-60aa4c59eaa6'],
    4.9, 8900, 120000, 'electronica', ['cable', 'usb-c', 'pd', 'carga'], 300),

  p('el-003',
    'Smartwatch Deportivo con Monitor de Sueño y SpO2',
    'smartwatch-deportivo-spo2',
    'Reloj inteligente con pantalla redonda, monitor de ritmo cardíaco, SpO2, seguimiento del sueño y modos deportivos. Notificaciones de llamadas y mensajes, resistente al agua. Compatible con iOS y Android. La foto principal es un smartwatch deportivo en la muñeca.',
    24990, 39990,
    ['photo-1579586337278-3befd40fd17a', 'photo-1523275335684-37898b6baf30', 'photo-1434494878577-86c23bcb06b9'],
    4.6, 5600, 45000, 'electronica', ['smartwatch', 'fitness', 'spo2', 'gps'], 80),

  p('el-004',
    'Power Bank 20000mAh PD 65W con Display LED',
    'powerbank-20000mah-65w',
    'Batería externa 20000mAh con carga rápida PD, varios puertos USB/USB-C y pantalla que indica el nivel de carga. Sirve para teléfono, tablet y algunos portátiles. La imagen principal muestra un power bank portátil compacto.',
    18990, 29990,
    ['photo-1609091839311-b9bdbb3d0e0f', 'photo-1625948515291-69613efd103f', 'photo-1612815154858-60aa4c59eaa6'],
    4.7, 7200, 67000, 'electronica', ['powerbank', 'pd', 'carga', 'portatil'], 120),

  p('el-005',
    'Mini Proyector LED 1080p Portátil Android',
    'mini-proyector-1080p',
    'Proyector portátil Full HD con sistema Android, WiFi y Bluetooth para ver películas y series sin PC. Proyecta en pared o pantalla; incluye control remoto. La foto principal muestra un proyector compacto en uso de cine en casa.',
    59990, 89990,
    ['photo-1478720568477-152d9b164e26', 'photo-1593784991095-a205069470b6', 'photo-1522869635100-9f4c5e86aa37'],
    4.5, 2100, 18000, 'electronica', ['proyector', '1080p', 'android', 'cine'], 45),

  p('el-006',
    'Cargador Inalámbrico 3 en 1 MagSafe Compatible',
    'cargador-inalambrico-3en1',
    'Base de carga inalámbrica 3 en 1 para iPhone (compatible MagSafe), AirPods y Apple Watch. Carga varios dispositivos a la vez sobre una sola estación. La imagen principal es una estación de carga inalámbrica para smartphone.',
    15990, 24990,
    ['photo-1615750174989-5768186b6a97', 'photo-1609091839311-b9bdbb3d0e0f', 'photo-1580910051074-3eb694886505'],
    4.7, 4300, 52000, 'electronica', ['cargador', 'magsafe', 'inalambrico', '3en1'], 90),

  p('el-007',
    'Webcam Full HD 1080p con Micrófono Dual y Anillo LED',
    'webcam-1080p-anillo-led',
    'Cámara web 1080p con micrófonos y luz LED para videollamadas y streaming. Clip para monitor, plug & play USB. La foto principal muestra una webcam instalada sobre un monitor.',
    21990, 34990,
    ['photo-1587825140708-dfaf72ae4b04', 'photo-1614624532983-4ce03382d63d', 'photo-1598327105666-5b89351aff97'],
    4.6, 3800, 29000, 'electronica', ['webcam', '1080p', 'streaming', 'led'], 70),

  p('el-008',
    'Hub USB-C 7 en 1 con HDMI 4K y Lector SD',
    'hub-usbc-7en1-hdmi',
    'Adaptador multipuerto USB-C: HDMI 4K, USB-A, PD y lector de tarjetas SD/microSD. Expande un solo puerto del portátil. La imagen principal muestra un hub/adaptador USB-C multipuerto.',
    17990, 27990,
    ['photo-1625948515291-69613efd103f', 'photo-1612815154858-60aa4c59eaa6', 'photo-1583863788434-e58a36330cf0'],
    4.8, 5100, 41000, 'electronica', ['hub', 'usb-c', 'hdmi', '4k'], 110),

  p('el-009',
    'Auriculares de Sueño Bluetooth Ultra Delgados',
    'auriculares-sueno-bluetooth',
    'Diadema o auriculares planos para dormir de lado, con Bluetooth y tela suave. Incluyen máscara de ojos o diseño de banda delgada para no molestar en la almohada. La foto principal muestra auriculares tipo diadema cómodos.',
    9990, 15990,
    ['photo-1484704849700-f032a568e944', 'photo-1505740420928-5e560c06d30e', 'photo-1546435770-a3e426bf472b'],
    4.4, 2900, 35000, 'electronica', ['sueno', 'bluetooth', 'diadema', 'relajacion'], 95),

  p('el-010',
    'Radio de Emergencia Solar + Manivela + Power Bank',
    'radio-emergencia-solar',
    'Radio de emergencia con carga solar y manivela, linterna LED y función power bank. FM/AM y alertas; ideal para cortes de luz y camping. La imagen principal evoca equipo de emergencia/camping con luz y radio.',
    19990, 32990,
    ['photo-1504280390367-361c6d9f38f4', 'photo-1478131143081-80f7f84ca84d', 'photo-1445307806294-bff7f67ffe45'],
    4.7, 6400, 78000, 'electronica', ['radio', 'emergencia', 'solar', 'camping'], 60),

  // ========== MODA ==========
  p('mo-001',
    'Collar en Capas de Acero Inoxidable Set 3 Piezas',
    'collar-capas-acero',
    'Set de 3 collares en capas de acero inoxidable hipoalergénico (dorado o plateado). Longitudes escalonadas para llevar juntos. No se oxidan con el uso diario. La foto principal muestra collares/joyería en capas sobre fondo neutro.',
    7990, 14990,
    ['photo-1599643478518-a784e5dc4c8f', 'photo-1515562141207-7a88fb7ce338', 'photo-1611591437281-460bfbe1220a'],
    4.7, 8900, 95000, 'moda', ['collar', 'joyeria', 'capas', 'acero'], 200),

  p('mo-002',
    'Pantalón Cargo Unisex Oversized Streetwear',
    'pantalon-cargo-oversized',
    'Pantalón cargo oversized unisex con bolsillos laterales, cintura ajustable y corte streetwear. Algodón resistente; tallas S–XXL. La imagen principal muestra un pantalón cargo / look streetwear.',
    18990, 29990,
    ['photo-1473966968600-fa801b869a1a', 'photo-1624378439575-d8705ad7ae80', 'photo-1542272454315-4c01d7abdf4a'],
    4.6, 5600, 62000, 'moda', ['pantalon', 'cargo', 'streetwear', 'unisex'], 140),

  p('mo-003',
    'Anillos Ajustables Minimalistas Pack x5',
    'anillos-ajustables-pack5',
    'Pack de 5 anillos abiertos ajustables de acero inoxidable, diseños minimalistas para apilar. Hipoalergénicos y resistentes al agua. La foto principal muestra anillos de joyería fina.',
    5990, 9990,
    ['photo-1605100804763-247f67b3557e', 'photo-1603561591411-07134df71af2', 'photo-1515562141207-7a88fb7ce338'],
    4.5, 7200, 110000, 'moda', ['anillos', 'joyeria', 'pack', 'minimalista'], 250),

  p('mo-004',
    'Bolso Crossbody de Cuero PU con Cadena',
    'bolso-crossbody-cadena',
    'Bolso bandolera de cuero sintético con cadena y cierre magnético. Tamaño para celular y billetera; uso diario o noche. La imagen principal es un bolso de mano / crossbody de mujer.',
    14990, 24990,
    ['photo-1548036328-c9fa89d128fa', 'photo-1590874103328-eac38a67478a', 'photo-1566150905458-1bf1fc113f0d'],
    4.8, 4100, 38000, 'moda', ['bolso', 'crossbody', 'cadena', 'mujer'], 85),

  p('mo-005',
    'Gafas de Sol Polarizadas UV400 Estilo Retro',
    'gafas-sol-polarizadas',
    'Gafas de sol polarizadas con protección UV400 y montura estilo aviador/retro. Incluyen estuche y paño. La foto principal muestra gafas de sol clásicas.',
    8990, 15990,
    ['photo-1511499767150-a48a237f0083', 'photo-1572635196237-14b3f281503f', 'photo-1473496169904-658ba7c44d8a'],
    4.6, 6800, 74000, 'moda', ['gafas', 'sol', 'polarizadas', 'uv400'], 160),

  p('mo-006',
    'Cinturón de Cuero Genuino con Hebilla Automática',
    'cinturon-cuero-automatico',
    'Cinturón de cuero genuino con hebilla de trinquete automática (sin agujeros). Ajuste preciso; presentación en caja. La imagen principal muestra un cinturón de cuero para hombre.',
    11990, 19990,
    ['photo-1624222247344-550fb60583fd', 'photo-1553062407-98eeb64c6a62', 'photo-1661956600684-97d3a4320e45'],
    4.7, 3500, 28000, 'moda', ['cinturon', 'cuero', 'hombre', 'automatico'], 100),

  p('mo-007',
    'Bufanda de Cachemira Sintética Ultra Suave',
    'bufanda-cachemira',
    'Bufanda larga de tacto cachemira sintético, suave y cálida para otoño/invierno. Varios colores; no pica. La foto principal muestra una bufanda / textil de invierno.',
    9990, 17990,
    ['photo-1520903920243-00d872a2d1c9', 'photo-1434389677669-e08fc41f1a9e', 'photo-1576566588028-4147f3842f27'],
    4.8, 2900, 32000, 'moda', ['bufanda', 'invierno', 'cachemira', 'accesorio'], 120),

  p('mo-008',
    'Reloj de Pulsera Minimalista Unisex Cuarzo',
    'reloj-minimalista-unisex',
    'Reloj de cuarzo con esfera minimalista y correa de malla o cuero. Unisex, resistente a salpicaduras. La imagen principal es un reloj de pulsera elegante.',
    16990, 27990,
    ['photo-1524592094714-0f0654e20314', 'photo-1524805444758-089113d48a6d', 'photo-1533139502658-0198f920d8e8'],
    4.6, 4800, 41000, 'moda', ['reloj', 'minimalista', 'unisex', 'cuarzo'], 75),

  p('mo-009',
    'Pendientes de Aro Geométricos Acero Inoxidable',
    'pendientes-aro-geometricos',
    'Pack de pendientes de aro en acero inoxidable, diseños geométricos hipoalergénicos. Ideales para uso diario. La foto principal muestra pendientes / aros de joyería.',
    6990, 12990,
    ['photo-1535632066927-ab7c9ab60908', 'photo-1611591437281-460bfbe1220a', 'photo-1630019852942-f89202989a59'],
    4.7, 5200, 58000, 'moda', ['pendientes', 'aros', 'joyeria', 'acero'], 180),

  p('mo-010',
    'Gorra Snapback Bordada Unisex Ajustable',
    'gorra-snapback-bordada',
    'Gorra snapback de algodón con bordado frontal y cierre ajustable. Visera plana, unisex. La imagen principal es una gorra / cap streetwear.',
    7990, 12990,
    ['photo-1588850561407-ed78c456fedb', 'photo-1575429198097-0414ec08e8cd', 'photo-1521369909029-2afed882baee'],
    4.5, 3900, 47000, 'moda', ['gorra', 'snapback', 'bordado', 'unisex'], 130),

  // ========== HOGAR ==========
  p('ho-001',
    'Cinta Nano Doble Cara Ultra Fuerte Reutilizable',
    'cinta-nano-doble-cara',
    'Cinta de gel nano transparente, lavable y reutilizable, para colgar sin taladrar. Soporta peso moderado en superficies lisas. La imagen evoca herramientas/adhesivos de hogar y bricolaje.',
    3990, 7990,
    ['photo-1581578731548-c64695cc6952', 'photo-1504148455328-c376907d081c', 'photo-1558618666-fcd25c85cd64'],
    4.8, 15600, 210000, 'hogar', ['cinta', 'nano', 'adhesivo', 'bricolaje'], 400),

  p('ho-002',
    'Organizador de Joyas Modular con Espejo',
    'organizador-joyas-modular',
    'Caja organizadora de joyas con compartimentos, cajones y espejo. Protege anillos y collares; ideal para tocador. La foto principal muestra un joyero / organizador de accesorios.',
    18990, 29990,
    ['photo-1611591437281-460bfbe1220a', 'photo-1515562141207-7a88fb7ce338', 'photo-1599643478518-a784e5dc4c8f'],
    4.7, 4200, 36000, 'hogar', ['organizador', 'joyas', 'espejo', 'tocador'], 70),

  p('ho-003',
    'Luz LED Sensor de Movimiento Recargable x3',
    'luz-led-sensor-movimiento',
    'Pack de 3 luces LED con sensor de movimiento, recargables y adhesivas/magnéticas para armarios y pasillos. Se encienden al detectar movimiento en la oscuridad. La imagen principal es iluminación LED de ambiente/interior.',
    9990, 17990,
    ['photo-1507473885765-e6ed057f782c', 'photo-1513694203232-719a280e022f', 'photo-1565814329452-e1efa11c5b5b'],
    4.8, 9800, 145000, 'hogar', ['luz', 'led', 'sensor', 'recargable'], 200),

  p('ho-004',
    'Soportes de Cable Autoadhesivos Pack 100u',
    'soportes-cable-pack100',
    'Pack de clips autoadhesivos para ordenar cables de escritorio y TV. Fáciles de pegar y quitar sin dañar. La imagen muestra cables y organización tecnológica en el hogar.',
    4990, 8990,
    ['photo-1558618666-fcd25c85cd64', 'photo-1516321318423-f06f85e504b3', 'photo-1498050108023-c5249f4df085'],
    4.6, 11200, 180000, 'hogar', ['cables', 'clips', 'organizacion', 'pack'], 350),

  p('ho-005',
    'Alfombra Antideslizante para Baño Memory Foam',
    'alfombra-bano-memory-foam',
    'Alfombra de baño de memory foam absorbente, base antideslizante y funda lavable. Confort al salir de la ducha. La foto principal muestra un baño moderno con textil de piso.',
    8990, 14990,
    ['photo-1584622650111-993a426fbf0a', 'photo-1552321554-5fefe8c9ef14', 'photo-1600566753190-17f0baa2a6c3'],
    4.7, 5600, 52000, 'hogar', ['alfombra', 'bano', 'memory-foam', 'antideslizante'], 110),

  p('ho-006',
    'Estantería Flotante de Madera x3 con Soportes Ocultos',
    'estanteria-flotante-madera',
    'Set de 3 estantes flotantes de madera con soportes ocultos para libros y decoración. Instalación en pared. La imagen principal muestra estanterías / repisas de madera en interior.',
    15990, 24990,
    ['photo-1595428774223-ef52624120d2', 'photo-1532372320572-cda25690e8ba', 'photo-1586023492125-27b2c045efd7'],
    4.5, 3100, 27000, 'hogar', ['estante', 'madera', 'flotante', 'pared'], 65),

  p('ho-007',
    'Humidificador Ultrasonic 500ml con Luz Nocturna',
    'humidificador-ultrasonic',
    'Humidificador de niebla fría 500 ml con luz LED de colores y apagado automático. Silencioso para dormitorio. La foto principal es un humidificador / difusor de ambiente.',
    12990, 21990,
    ['photo-1585771724684-38269d6639fd', 'photo-1608571423902-eed4a5ad8108', 'photo-1603006905003-be475563bc59'],
    4.6, 4800, 43000, 'hogar', ['humidificador', 'ultrasonic', 'luz', 'aire'], 90),

  p('ho-008',
    'Organizador de Zapatos Apilable Transparente x6',
    'organizador-zapatos-x6',
    'Seis cajas apilables transparentes para zapatos: ver el contenido sin abrir y ahorrar espacio en el armario. La imagen evoca organización de calzado / armario ordenado.',
    14990, 24990,
    ['photo-1603484477859-abe6a73f9363', 'photo-1526170375885-4d8ecf77b99f', 'photo-1460353581641-37baddab0fa2'],
    4.7, 3900, 34000, 'hogar', ['zapatos', 'organizador', 'cajas', 'armario'], 80),

  p('ho-009',
    'Cortinas Blackout Térmicas 2 Paneles',
    'cortinas-blackout-termicas',
    'Par de cortinas blackout opacas con aislamiento térmico ligero y ojales para barra. Bloquean la luz en el dormitorio. La foto principal muestra cortinas en una habitación.',
    22990, 35990,
    ['photo-1513694203232-719a280e022f', 'photo-1616486338812-3dadae4b4ace', 'photo-1615874959471-d4dddd7596bd'],
    4.6, 2700, 22000, 'hogar', ['cortinas', 'blackout', 'termicas', 'dormitorio'], 55),

  p('ho-010',
    'Soporte de Pared para TV Articulado 32-70"',
    'soporte-tv-articulado',
    'Soporte articulado de pared para TV de 32 a 70", inclinable y giratorio, VESA compatible. Acerca y aleja la pantalla. La imagen principal es un televisor montado en pared.',
    27990, 42990,
    ['photo-1593359677879-a4bb92f829d1', 'photo-1461151304267-38535e780c79', 'photo-1593784991095-a205069470b6'],
    4.8, 5100, 29000, 'hogar', ['soporte', 'tv', 'pared', 'articulado'], 40),

  // ========== BELLEZA ==========
  p('be-001',
    'Rizadores de Cabello sin Calor (Heatless Curler)',
    'rizado-sin-calor',
    'Set de rizadores de satén o cinta sin calor: se dejan puestos y al retirar quedan ondas sin dañar el cabello. Incluye gomas y guía de uso. La foto principal está asociada a cuidado del cabello y peinado.',
    7990, 14990,
    ['photo-1522338140262-f46f5913618a', 'photo-1560066984-138dadb4c035', 'photo-1519699047748-d1dafe01ba9e'],
    4.7, 11200, 156000, 'belleza', ['cabello', 'rizado', 'sin-calor', 'saten'], 220),

  p('be-002',
    'Cera en Stick para Peinar Flyaways Pack x2',
    'cera-stick-flyaways',
    'Dos barras de cera de peinado para controlar pelos sueltos y slick back, sin grasa visible. Uso en cabello natural o pelucas. La imagen se relaciona con productos de peinado y belleza capilar.',
    4990, 8990,
    ['photo-1631730486572-226b1e126218', 'photo-1522337360788-8b13dee7a37e', 'photo-1519699047748-d1dafe01ba9e'],
    4.8, 9800, 190000, 'belleza', ['cera', 'peinado', 'flyaways', 'cabello'], 300),

  p('be-003',
    'Masajeador Facial de Jade y Rodillo Gua Sha',
    'masajeador-jade-gua-sha',
    'Rodillo de jade y herramienta Gua Sha para masaje facial en frío: menos hinchazón y mejor absorción de cremas. Incluye funda. La foto principal muestra rodillo facial / skincare de piedra.',
    8990, 15990,
    ['photo-1616394584738-fc6e612e71b9', 'photo-1570172619604-923e4814dd52', 'photo-1596755389378-c31d21fd1273'],
    4.6, 7600, 88000, 'belleza', ['jade', 'gua-sha', 'skincare', 'masaje'], 150),

  p('be-004',
    'Pestañas Magnéticas Reutilizables Kit Completo',
    'pestanas-magneticas',
    'Kit de pestañas postizas magnéticas con delineador magnético: se aplican sin pegamento y se reutilizan. Incluye varios pares. La imagen está ligada a maquillaje de ojos / belleza.',
    11990, 19990,
    ['photo-1512496015851-a90fb38ba796', 'photo-1522335789203-aabd1fc54bc9', 'photo-1596462502278-27bfdd403348'],
    4.5, 5400, 67000, 'belleza', ['pestanas', 'magneticas', 'maquillaje', 'kit'], 100),

  p('be-005',
    'Cepillo de Limpieza Facial Sónico Recargable',
    'cepillo-facial-sonico',
    'Cepillo facial eléctrico sónico recargable con varias velocidades y cabezales para limpieza profunda. Uso en ducha (IPX7). La foto principal muestra cuidado facial / skincare con herramienta.',
    14990, 24990,
    ['photo-1556228720-195a672e8a03', 'photo-1570172619604-923e4814dd52', 'photo-1596755389378-c31d21fd1273'],
    4.7, 4200, 41000, 'belleza', ['cepillo', 'facial', 'sonico', 'limpieza'], 85),

  p('be-006',
    'Cortadora de Cabello Profesional T9 Zero Gap',
    'cortadora-t9-zero-gap',
    'Máquina de corte tipo T9 con cuchilla zero gap para fades, barba y contornos. Batería recargable y peines incluidos. La imagen principal es de barbería / cortadora de cabello.',
    16990, 27990,
    ['photo-1621607512215-592785a8f2f8', 'photo-1503951914875-452162b0f3f1', 'photo-1585747860715-2ba37e789b2b'],
    4.6, 8900, 72000, 'belleza', ['cortadora', 'barba', 'fade', 'profesional'], 95),

  p('be-007',
    'Espejo de Maquillaje con Luz LED Triple',
    'espejo-maquillaje-led',
    'Espejo de tocador con paneles y luz LED (fría/cálida/natural) y aumento. Batería o USB. La foto principal muestra espejo de maquillaje con iluminación.',
    19990, 32990,
    ['photo-1631217868264-e5b90bb7e133', 'photo-1522335789203-aabd1fc54bc9', 'photo-1596462502278-27bfdd403348'],
    4.8, 3600, 28000, 'belleza', ['espejo', 'led', 'maquillaje', 'tocador'], 60),

  p('be-008',
    'Set de Brochas de Maquillaje Profesional 12pcs',
    'set-brochas-12pcs',
    'Set de 12 brochas sintéticas para base, ojos y contour, con estuche. Cerdas suaves y mango ergonómico. La imagen principal muestra brochas de maquillaje.',
    12990, 21990,
    ['photo-1515688594390-b649af70d282', 'photo-1596462502278-27bfdd403348', 'photo-1522335789203-aabd1fc54bc9'],
    4.7, 5800, 49000, 'belleza', ['brochas', 'maquillaje', 'set', 'profesional'], 110),

  p('be-009',
    'Rodillo de Hielo Facial de Acero Inoxidable',
    'rodillo-hielo-facial',
    'Rodillo de acero que se congela con agua: masaje frío para deshinchar y cerrar poros. Reutilizable. La foto está asociada a herramientas de skincare facial.',
    6990, 11990,
    ['photo-1570172619604-923e4814dd52', 'photo-1616394584738-fc6e612e71b9', 'photo-1596755389378-c31d21fd1273'],
    4.6, 4100, 53000, 'belleza', ['hielo', 'rodillo', 'facial', 'skincare'], 140),

  p('be-010',
    'Difusor de Aceites Esenciales Ultrasónico',
    'difusor-aceites-esenciales',
    'Difusor ultrasónico de aromaterapia con luces LED, temporizador y aceites de regalo. Niebla fría para ambiente. La imagen principal es un difusor de aceites / humidificador aromático.',
    15990, 25990,
    ['photo-1608571423902-eed4a5ad8108', 'photo-1603006905003-be475563bc59', 'photo-1585771724684-38269d6639fd'],
    4.7, 4700, 38000, 'belleza', ['difusor', 'aromaterapia', 'aceites', 'led'], 75),

  // ========== SALUD ==========
  p('sa-001',
    'Masajeador de Cuello y Hombros EMS Portátil',
    'masajeador-cuello-ems',
    'Masajeador cervical con EMS y calor para aliviar tensión de cuello y hombros. Varios modos e intensidades; uso manos libres. La imagen se relaciona con masaje y bienestar corporal.',
    18990, 32990,
    ['photo-1544161515-4ab6ce6db874', 'photo-1544367567-0f2fcb009e0b', 'photo-1519823551278-64ac9274fb6b'],
    4.7, 6800, 54000, 'salud', ['masaje', 'cuello', 'ems', 'calor'], 90),

  p('sa-002',
    'Corrector de Postura Inteligente con Sensor',
    'corrector-postura-sensor',
    'Sensor wearable que vibra al encorvarte; app con recordatorios de postura. Ligero y recargable. La foto evoca bienestar / espalda y hábitos saludables en oficina.',
    14990, 24990,
    ['photo-1571019614242-c5c5dee9f50b', 'photo-1571019613454-1cb2f99b2d8b', 'photo-1544367567-0f2fcb009e0b'],
    4.5, 3900, 31000, 'salud', ['postura', 'sensor', 'oficina', 'wearable'], 70),

  p('sa-003',
    'Pistola de Masaje Muscular Deep Tissue',
    'pistola-masaje-muscular',
    'Pistola de percusión con varios cabezales y velocidades para recuperación muscular. Batería de larga duración. La imagen principal está ligada a masaje deportivo / fitness recovery.',
    29990, 49990,
    ['photo-1599058945522-28d584b6f14f', 'photo-1544161515-4ab6ce6db874', 'photo-1517836357463-d25dfeac3438'],
    4.8, 5200, 28000, 'salud', ['pistola', 'masaje', 'muscular', 'fitness'], 55),

  p('sa-004',
    'Calentador de Pies Eléctrico Plegable',
    'calentador-pies-electrico',
    'Calentador de pies con niveles de temperatura y funda lavable; plegable para guardar. Bajo consumo. Ideal en invierno bajo el escritorio. La imagen evoca calidez y confort en el hogar.',
    16990, 27990,
    ['photo-1601925260368-ae2f83cf8b7f', 'photo-1584100936595-c0654b55a2e2', 'photo-1544161515-4ab6ce6db874'],
    4.6, 8100, 67000, 'salud', ['calentador', 'pies', 'invierno', 'electrico'], 100),

  p('sa-005',
    'Esterilizador UV para Cepillo de Dientes',
    'esterilizador-uv-cepillo',
    'Estuche con luz UV-C para desinfectar el cepillo de dientes; portátil y recargable. Útil en viajes y baños compartidos. La imagen se relaciona con higiene bucal / baño.',
    9990, 16990,
    ['photo-1607613009820-a29f7bb81c04', 'photo-1584622650111-993a426fbf0a', 'photo-1556228720-195a672e8a03'],
    4.7, 4500, 42000, 'salud', ['uv', 'esterilizador', 'cepillo', 'higiene'], 120),

  p('sa-006',
    'Soporte Lumbar para Silla de Oficina',
    'soporte-lumbar-oficina',
    'Cojín lumbar de memory foam con correas para silla de oficina o auto. Mejora la curva de la espalda baja. La foto principal evoca silla / ergonomía de trabajo.',
    11990, 19990,
    ['photo-1580480055273-228ff5388ef8', 'photo-1497366216548-37526070297c', 'photo-1571019614242-c5c5dee9f50b'],
    4.6, 6200, 51000, 'salud', ['lumbar', 'oficina', 'ergonomia', 'cojin'], 85),

  p('sa-007',
    'Báscula Inteligente con App y Análisis Corporal',
    'bascula-inteligente-app',
    'Báscula Bluetooth con grasa corporal, músculo, IMC y más métricas en la app. Vidrio templado, varios perfiles. La imagen principal es una báscula de baño digital.',
    17990, 29990,
    ['photo-1571019613454-1cb2f99b2d8b', 'photo-1576091160550-2173dba999ef', 'photo-1571019614242-c5c5dee9f50b'],
    4.5, 3800, 29000, 'salud', ['bascula', 'inteligente', 'app', 'fitness'], 65),

  p('sa-008',
    'Almohada de Viaje Memory Foam Inflable',
    'almohada-viaje-memory',
    'Almohada de cuello para avión o auto, inflable y con memory foam; se guarda en bolsa compacta. La foto principal muestra almohada de viaje cervical.',
    8990, 14990,
    ['photo-1584100936595-c0654b55a2e2', 'photo-1520256862855-398228942d55', 'photo-1544161515-4ab6ce6db874'],
    4.6, 5100, 46000, 'salud', ['almohada', 'viaje', 'cuello', 'memory-foam'], 130),

  p('sa-009',
    'Masajeador de Pies con Rodillos y Calor',
    'masajeador-pies-calor',
    'Aparato de masaje para pies con rodillos y calor; alivia fatiga tras estar de pie. Uso en casa. La imagen se asocia a masaje y relajación de pies.',
    34990, 54990,
    ['photo-1544161515-4ab6ce6db874', 'photo-1519823551278-64ac9274fb6b', 'photo-1601925260368-ae2f83cf8b7f'],
    4.7, 2900, 18000, 'salud', ['pies', 'masaje', 'calor', 'shiatsu'], 40),

  p('sa-010',
    'Monitor de Presión Arterial de Muñeca',
    'monitor-presion-muneca',
    'Tensiómetro de muñeca digital con memoria de mediciones y detector de arritmia. Uso doméstico orientativo. La foto principal es un monitor de presión / dispositivo médico doméstico.',
    15990, 25990,
    ['photo-1576091160399-112ba8d25d1d', 'photo-1576091160550-2173dba999ef', 'photo-1571019613454-1cb2f99b2d8b'],
    4.5, 3400, 25000, 'salud', ['presion', 'tensometro', 'monitor', 'muneca'], 70),

  // ========== MASCOTAS ==========
  p('ma-001',
    'Guantes de Aseo para Mascotas Pack x2',
    'guantes-aseo-mascotas',
    'Guantes de silicona para peinar y quitar pelo muerto de perros y gatos mientras los acaricias. Pack de 2. La foto principal muestra una mascota (perro) en contexto de cuidado.',
    5990, 9990,
    ['photo-1587300003388-59208cc962cb', 'photo-1548199973-03cce0bbc87b', 'photo-1450778869180-41d0601e046e'],
    4.8, 12400, 175000, 'mascotas', ['guantes', 'aseo', 'pelo', 'perro'], 280),

  p('ma-002',
    'Collar GPS Inteligente para Perros',
    'collar-gps-perros',
    'Collar con localización GPS y app para ver a tu perro en el mapa, geocercas y actividad. Impermeable. La imagen principal es un perro con collar / paseo.',
    39990, 59990,
    ['photo-1583511655857-d19b40a7a54e', 'photo-1601758228041-f3b2795255f1', 'photo-1548199973-03cce0bbc87b'],
    4.6, 2800, 19000, 'mascotas', ['gps', 'collar', 'perro', 'inteligente'], 45),

  p('ma-003',
    'Fuente de Agua Automática para Mascotas 2L',
    'fuente-agua-mascotas',
    'Fuente de agua con bomba y filtro para perros y gatos; incentiva a beber más. 2 L, fácil de lavar. La foto muestra mascota / bowl o contexto de alimentación.',
    14990, 24990,
    ['photo-1583337130417-3346a1be7dee', 'photo-1450778869180-41d0601e046e', 'photo-1548199973-03cce0bbc87b'],
    4.7, 5600, 48000, 'mascotas', ['fuente', 'agua', 'gatos', 'filtro'], 90),

  p('ma-004',
    'Cama Ortopédica Memory Foam para Perros',
    'cama-ortopedica-perros',
    'Cama con colchón memory foam y funda lavable para descanso de perros. Varias tallas. La imagen principal es una cama / zona de descanso para perro.',
    24990, 39990,
    ['photo-1541781774459-bb2a86f7f0a9', 'photo-1587300003388-59208cc962cb', 'photo-1601758228041-f3b2795255f1'],
    4.8, 4100, 32000, 'mascotas', ['cama', 'ortopedica', 'perro', 'memory-foam'], 55),

  p('ma-005',
    'Juguete Interactivo de Dispensación de Premios',
    'juguete-interactivo-premios',
    'Juguete que suelta premios al jugar; estimula mente y reduce ansiedad. Material resistente. La foto muestra perro jugando / juguete de mascota.',
    9990, 16990,
    ['photo-1535294435445-c4464030753a', 'photo-1587300003388-59208cc962cb', 'photo-1548199973-03cce0bbc87b'],
    4.6, 3900, 41000, 'mascotas', ['juguete', 'interactivo', 'premios', 'perro'], 110),

  p('ma-006',
    'Arnés Reflectante Ajustable Antitirones',
    'arnes-reflectante-perros',
    'Arnés antitirones con tiras reflectantes y acolchado; paseos más seguros de noche. La imagen principal es un perro con arnés / correa en paseo.',
    11990, 19990,
    ['photo-1601758228041-f3b2795255f1', 'photo-1583511655857-d19b40a7a54e', 'photo-1548199973-03cce0bbc87b'],
    4.7, 5200, 45000, 'mascotas', ['arnes', 'reflectante', 'paseo', 'perro'], 100),

  p('ma-007',
    'Cepillo Autolimpiante para Pelo de Mascotas',
    'cepillo-autolimpiante-mascotas',
    'Cepillo con botón que libera el pelo acumulado; reduce nudos y pelo en casa. Para perros y gatos. La foto muestra mascota de pelo / cuidado del pelaje.',
    7990, 13990,
    ['photo-1450778869180-41d0601e046e', 'photo-1587300003388-59208cc962cb', 'photo-1514888286974-6b03e2ea14b5'],
    4.8, 8700, 92000, 'mascotas', ['cepillo', 'pelo', 'autolimpieza', 'gato'], 160),

  p('ma-008',
    'Transportín Plegable de Tela para Mascotas',
    'transportin-plegable',
    'Transportín blando plegable con malla ventilada y asa; viajes al veterinario o auto. La imagen evoca viaje / mascota transportada con cuidado.',
    18990, 29990,
    ['photo-1548199973-03cce0bbc87b', 'photo-1601758228041-f3b2795255f1', 'photo-1587300003388-59208cc962cb'],
    4.5, 3100, 24000, 'mascotas', ['transportin', 'viaje', 'plegable', 'tela'], 50),

  p('ma-009',
    'Comedero Elevado Doble con Antideslizante',
    'comedero-elevado-doble',
    'Comedero y bebedero elevados con bowls de acero y base antideslizante; mejor postura al comer. La foto principal muestra bowls / alimentación de mascota.',
    12990, 21990,
    ['photo-1583337130417-3346a1be7dee', 'photo-1548199973-03cce0bbc87b', 'photo-1450778869180-41d0601e046e'],
    4.6, 4400, 37000, 'mascotas', ['comedero', 'elevado', 'bowls', 'perro'], 80),

  p('ma-010',
    'Cámara de Vigilancia para Mascotas WiFi 360°',
    'camara-vigilancia-mascotas',
    'Cámara WiFi con visión 360°, audio bidireccional y app para ver a tu mascota en casa. Visión nocturna. La imagen se relaciona con cámara de seguridad / hogar conectado.',
    27990, 42990,
    ['photo-1558002038-1055907df827', 'photo-1558618666-fcd25c85cd64', 'photo-1587300003388-59208cc962cb'],
    4.7, 3600, 22000, 'mascotas', ['camara', 'wifi', 'vigilancia', '360'], 40),

  // ========== AUTO ==========
  p('au-001',
    'Soporte Magnético de Celular para Auto',
    'soporte-magnetico-auto',
    'Soporte magnético para el celular en el auto (ventilación o tablero); rotación 360°. Conduce con el GPS a la vista. La foto principal muestra interior de auto / uso de teléfono en vehículo.',
    7990, 14990,
    ['photo-1485291571150-772bcfc10da5', 'photo-1492144534655-ae79c964c9d7', 'photo-1449965408869-eaa3f722e40d'],
    4.8, 9800, 125000, 'auto', ['soporte', 'celular', 'magnetico', 'auto'], 200),

  p('au-002',
    'Cargador de Auto USB-C PD 65W Dual',
    'cargador-auto-65w',
    'Cargador de mechero con USB-C PD de alta potencia y USB-A para cargar laptop y teléfono en el viaje. La imagen está asociada a carga / conectividad en el vehículo.',
    9990, 16990,
    ['photo-1612815154858-60aa4c59eaa6', 'photo-1609091839311-b9bdbb3d0e0f', 'photo-1492144534655-ae79c964c9d7'],
    4.7, 5600, 68000, 'auto', ['cargador', 'usb-c', 'pd', 'mechero'], 140),

  p('au-003',
    'Aspiradora de Mano para Auto 120W',
    'aspiradora-mano-auto',
    'Aspiradora de mano inalámbrica para asientos y maletero; boquillas incluidas. También útil en casa. La foto evoca limpieza del interior del auto.',
    19990, 32990,
    ['photo-1601362840469-51e4d8d58785', 'photo-1492144534655-ae79c964c9d7', 'photo-1449965408869-eaa3f722e40d'],
    4.6, 4200, 35000, 'auto', ['aspiradora', 'limpieza', 'inalambrica', 'auto'], 70),

  p('au-004',
    'Organizador de Maletero Plegable con Compartimentos',
    'organizador-maletero',
    'Caja organizadora plegable para el maletero: compras y herramientas ordenadas. La imagen principal es el maletero / parte trasera de un vehículo.',
    12990, 21990,
    ['photo-1449965408869-eaa3f722e40d', 'photo-1492144534655-ae79c964c9d7', 'photo-1503376780353-7e6692767b70'],
    4.7, 3800, 29000, 'auto', ['organizador', 'maletero', 'plegable', 'auto'], 85),

  p('au-005',
    'Cubiertas de Asiento Universales 5 Piezas',
    'cubiertas-asiento-auto',
    'Juego de fundas elásticas para asientos delanteros y traseros; protegen de manchas y pelo. La foto muestra interior de auto con asientos.',
    24990, 39990,
    ['photo-1503376780353-7e6692767b70', 'photo-1492144534655-ae79c964c9d7', 'photo-1485291571150-772bcfc10da5'],
    4.5, 5100, 42000, 'auto', ['fundas', 'asientos', 'proteccion', 'universal'], 60),

  p('au-006',
    'Cámara de Retroceso Inalámbrica HD',
    'camara-retroceso-inalambrica',
    'Cámara de reversa inalámbrica con monitor para estacionar con más seguridad. Visión nocturna. La imagen evoca auto y asistencia al conductor.',
    29990, 45990,
    ['photo-1492144534655-ae79c964c9d7', 'photo-1449965408869-eaa3f722e40d', 'photo-1503376780353-7e6692767b70'],
    4.6, 2900, 18000, 'auto', ['camara', 'retroceso', 'estacionar', 'hd'], 45),

  p('au-007',
    'Kit de Limpieza Interior de Auto 8 Piezas',
    'kit-limpieza-auto',
    'Kit con limpiadores y paños de microfibra para tablero, vidrios e interior. La foto se relaciona con cuidado y limpieza del vehículo.',
    14990, 24990,
    ['photo-1601362840469-51e4d8d58785', 'photo-1492144534655-ae79c964c9d7', 'photo-1485291571150-772bcfc10da5'],
    4.7, 4700, 38000, 'auto', ['limpieza', 'kit', 'microfibra', 'interior'], 95),

  p('au-008',
    'Adaptador de Carga EV Tipo 2 a Tipo 1',
    'adaptador-carga-ev',
    'Adaptador para carga de vehículos eléctricos entre conectores Tipo 2 y Tipo 1. Verificar compatibilidad con tu auto. La imagen principal es un auto eléctrico / estación de carga.',
    45990, 69990,
    ['photo-1593941707882-a5bba14938c7', 'photo-1558618047-f4dcec0b3b8f', 'photo-1611967164521-abae8fbaec55'],
    4.5, 1200, 8500, 'auto', ['ev', 'carga', 'adaptador', 'electrico'], 25),

  p('au-009',
    'Soporte de Tablet/GPS para Tablero',
    'soporte-tablet-tablero',
    'Soporte de ventosa o tablero para tablet o GPS de 7–13"; brazo articulado. La foto muestra uso de navegación / pantalla en el auto.',
    11990, 19990,
    ['photo-1485291571150-772bcfc10da5', 'photo-1492144534655-ae79c964c9d7', 'photo-1449965408869-eaa3f722e40d'],
    4.6, 3400, 27000, 'auto', ['soporte', 'tablet', 'gps', 'tablero'], 75),

  p('au-010',
    'Luz LED de Ambiente Interior RGB App',
    'luz-ambiente-rgb-auto',
    'Tira LED RGB para el interior del auto, control por app y modos con música. Ambiente personalizado de noche. La imagen evoca iluminación LED de ambiente.',
    9990, 17990,
    ['photo-1558618666-fcd25c85cd64', 'photo-1507473885765-e6ed057f782c', 'photo-1492144534655-ae79c964c9d7'],
    4.7, 6100, 55000, 'auto', ['led', 'rgb', 'ambiente', 'app'], 120),

  // ========== DEPORTES ==========
  p('de-001',
    'Bandas de Resistencia Set 5 Niveles',
    'bandas-resistencia-set5',
    'Set de bandas elásticas de distintos niveles con asas y anclaje de puerta para entrenar en casa. La foto principal muestra entrenamiento con bandas / fitness en casa.',
    9990, 16990,
    ['photo-1598289431512-b97b0917affc', 'photo-1517836357463-d25dfeac3438', 'photo-1571019613454-1cb2f99b2d8b'],
    4.8, 8900, 98000, 'deportes', ['bandas', 'resistencia', 'fitness', 'casa'], 180),

  p('de-002',
    'Esterilla de Yoga Antideslizante 6mm',
    'esterilla-yoga-6mm',
    'Colchoneta de yoga antideslizante 6 mm, ligera y con correa de transporte. Para yoga y pilates. La imagen principal es una esterilla / práctica de yoga.',
    12990, 21990,
    ['photo-1601925260368-ae2f83cf8b7f', 'photo-1544367567-0f2fcb009e0b', 'photo-1506126613408-eca07ce68773'],
    4.7, 7200, 67000, 'deportes', ['yoga', 'esterilla', 'pilates', 'antideslizante'], 110),

  p('de-003',
    'Botella de Agua Motivacional 1L con Marcadores',
    'botella-motivacional-1l',
    'Botella de 1 L con marcas de horario para hidratarte, pajita y tapa hermética. Libre de BPA. La foto principal es una botella de agua deportiva.',
    6990, 11990,
    ['photo-1602143407151-7111542de6e8', 'photo-1523362628745-0c100150b504', 'photo-1571934811356-5cc061b6821f'],
    4.6, 9500, 112000, 'deportes', ['botella', 'agua', 'motivacional', '1l'], 220),

  p('de-004',
    'Soga de Saltar con Contador Digital',
    'soga-saltar-contador',
    'Cuerda de saltar con contador de saltos y calorías; mangos cómodos y cable ajustable. Cardio en poco espacio. La imagen se relaciona con salto a la cuerda / cardio.',
    7990, 13990,
    ['photo-1518611012118-696072aa579a', 'photo-1517836357463-d25dfeac3438', 'photo-1571019613454-1cb2f99b2d8b'],
    4.5, 4800, 43000, 'deportes', ['soga', 'saltar', 'cardio', 'contador'], 130),

  p('de-005',
    'Mochila Deportiva Impermeable 30L',
    'mochila-deportiva-30l',
    'Mochila de gym 30 L con compartimento para zapatos y bolsillo húmedo. Resistente al agua. La foto principal es una mochila deportiva / urbana.',
    18990, 29990,
    ['photo-1553062407-98eeb64c6a62', 'photo-1581605405669-fbfbc00c0a07', 'photo-1517836357463-d25dfeac3438'],
    4.7, 3600, 28000, 'deportes', ['mochila', 'gym', 'impermeable', '30l'], 70),

  p('de-006',
    'Guantes de Fitness con Muñequera',
    'guantes-fitness-muneca',
    'Guantes de gimnasio con agarre y muñequera para pesas; protegen las manos. La imagen muestra entrenamiento con pesas / guantes de fitness.',
    8990, 14990,
    ['photo-1517836357463-d25dfeac3438', 'photo-1581009146145-b5ef0754ff1e', 'photo-1571019613454-1cb2f99b2d8b'],
    4.6, 5100, 49000, 'deportes', ['guantes', 'gym', 'pesas', 'muneca'], 150),

  p('de-007',
    'Bolsa Seca Impermeable 20L para Outdoor',
    'bolsa-seca-20l',
    'Dry bag 20 L impermeable para kayak, playa o lluvia; cierre enrollable. La foto principal evoca outdoor / camping junto al agua.',
    9990, 16990,
    ['photo-1504280390367-361c6d9f38f4', 'photo-1478131143081-80f7f84ca84d', 'photo-1553062407-98eeb64c6a62'],
    4.8, 4200, 36000, 'deportes', ['drybag', 'impermeable', 'outdoor', '20l'], 90),

  p('de-008',
    'Rodillera de Compresión Deportiva x2',
    'rodillera-compresion',
    'Par de rodilleras de compresión con soporte para running y gym. La imagen se asocia a deporte y protección articular.',
    11990, 19990,
    ['photo-1571019613454-1cb2f99b2d8b', 'photo-1476480862126-2099891c8c6f', 'photo-1517836357463-d25dfeac3438'],
    4.5, 3900, 32000, 'deportes', ['rodillera', 'compresion', 'running', 'soporte'], 100),

  p('de-009',
    'Linterna Frontal LED Recargable 1000 Lúmenes',
    'linterna-frontal-1000lm',
    'Linterna de cabeza recargable de alta potencia para running nocturno y camping. Varios modos e IPX6. La foto principal es iluminación outdoor / frontal.',
    14990, 24990,
    ['photo-1504280390367-361c6d9f38f4', 'photo-1445307806294-bff7f67ffe45', 'photo-1478131143081-80f7f84ca84d'],
    4.7, 5600, 41000, 'deportes', ['linterna', 'frontal', 'camping', 'running'], 80),

  p('de-010',
    'Bicicleta Estática Plegable con Monitor',
    'bici-estatica-plegable',
    'Bici estática plegable con resistencia regulable y monitor de entrenamiento. Cardio en casa sin ocupar mucho espacio. La imagen principal es una bicicleta de ejercicio indoor.',
    89990, 129990,
    ['photo-1534438327276-14e5300c3a48', 'photo-1517836357463-d25dfeac3438', 'photo-1576678927484-cc907957088c'],
    4.4, 1800, 9500, 'deportes', ['bici', 'estatica', 'cardio', 'plegable'], 20),

  // ========== COCINA ==========
  p('co-001',
    'Cortador de Verduras Multifunción 12 en 1',
    'cortador-verduras-12en1',
    'Cortador/mandolina con varias cuchillas para rebanar y picar verduras en segundos. Contenedor incluido. La foto principal muestra verduras frescas / prep de cocina.',
    12990, 22990,
    ['photo-1512621776951-a57141f2eefd', 'photo-1556910103-1c0279a1dc47', 'photo-1540420773420-3366772f4999'],
    4.7, 11200, 145000, 'cocina', ['cortador', 'verduras', 'mandolina', 'prep'], 160),

  p('co-002',
    'Botella Pulverizadora de Aceite de Oliva',
    'botella-aceite-spray',
    'Spray de aceite de oliva de vidrio para dosificar en air fryer y ensaladas sin propelentes. La imagen principal muestra aceite de oliva / uso en cocina saludable.',
    5990, 9990,
    ['photo-1474979266404-7eaacbcd87c5', 'photo-1606923829579-0cb981a83e2e', 'photo-1556911220-bff31c8750ea'],
    4.8, 15600, 210000, 'cocina', ['aceite', 'spray', 'oliva', 'airfryer'], 300),

  p('co-003',
    'Bolsas de Silicona Reutilizables Pack x6',
    'bolsas-silicona-x6',
    'Bolsas de silicona reutilizables para freezer y snacks; cierran herméticas y se lavan. Alternativa al plástico. La foto evoca almacenamiento de alimentos / meal prep.',
    9990, 17990,
    ['photo-1604719312566-8912e9227c6a', 'photo-1490818387583-1baba5e638af', 'photo-1542838132-92c53300491e'],
    4.7, 8900, 98000, 'cocina', ['bolsas', 'silicona', 'reutilizable', 'freezer'], 200),

  p('co-004',
    'Balanza de Cocina Digital de Precisión',
    'balanza-cocina-digital',
    'Báscula de cocina digital con tara y precisión de 1 g; ideal para repostería. La imagen se relaciona con ingredientes medidos / cocina precisa.',
    7990, 13990,
    ['photo-1556911220-bff31c8750ea', 'photo-1556910103-1c0279a1dc47', 'photo-1495521821757-a1efb6729352'],
    4.6, 6700, 72000, 'cocina', ['balanza', 'digital', 'precision', 'reposteria'], 140),

  p('co-005',
    'Organizador de Especias Magnético de Pared',
    'organizador-especias-magnetico',
    'Estante magnético con frascos de especias para nevera o pared metálica. Orden y visibilidad. La foto principal muestra especias / frascos en cocina.',
    16990, 27990,
    ['photo-1596797038530-2c107229654b', 'photo-1506368249639-73a05d4f8828', 'photo-1556911220-bff31c8750ea'],
    4.7, 4100, 34000, 'cocina', ['especias', 'organizador', 'magnetico', 'frascos'], 75),

  p('co-006',
    'Tapas Universales de Silicona Stretch x6',
    'tapas-silicona-stretch',
    'Tapas de silicona elásticas de varios tamaños para bowls y latas; reutilizables. La imagen evoca conservación de alimentos en cocina.',
    6990, 11990,
    ['photo-1556911220-e15b29be8c8f', 'photo-1604719312566-8912e9227c6a', 'photo-1556911220-bff31c8750ea'],
    4.8, 7800, 89000, 'cocina', ['tapas', 'silicona', 'conservacion', 'bowls'], 180),

  p('co-007',
    'Molino de Café Manual de Acero',
    'molino-cafe-manual',
    'Molino de café manual con muelas de acero ajustables para molienda de espresso a prensa. La foto principal es café / molino o granos de café.',
    19990, 32990,
    ['photo-1495474472287-4d71bcdd2085', 'photo-1447933601403-0c838bd6471e', 'photo-1514432324607-a09d9b4aefdd'],
    4.6, 3200, 21000, 'cocina', ['cafe', 'molino', 'manual', 'muelas'], 55),

  p('co-008',
    'Utensilios de Silicona Set 10 Piezas',
    'utensilios-silicona-set10',
    'Set de utensilios de silicona resistentes al calor (espátula, cuchara, etc.) que no rayan sartenes. La imagen muestra utensilios / prep en cocina.',
    14990, 24990,
    ['photo-1556911220-bff31c8750ea', 'photo-1556910103-1c0279a1dc47', 'photo-1495521821757-a1efb6729352'],
    4.7, 5400, 46000, 'cocina', ['utensilios', 'silicona', 'set', 'sarten'], 100),

  p('co-009',
    'Dispensador de Jabón y Esponja 2 en 1',
    'dispensador-jabon-esponja',
    'Dispensador de jabón de cocina con soporte para esponja; menos desorden junto al fregadero. La foto principal es fregadero / zona de lavado de platos.',
    8990, 14990,
    ['photo-1584622650111-993a426fbf0a', 'photo-1556911220-bff31c8750ea', 'photo-1563453397533-e652fbedf903'],
    4.5, 3900, 33000, 'cocina', ['dispensador', 'jabon', 'esponja', 'fregadero'], 110),

  p('co-010',
    'Termo de Café de Acero Inoxidable 500ml',
    'termo-cafe-500ml',
    'Termo de acero 500 ml que mantiene el café caliente horas; tapa a prueba de fugas. La imagen principal es un termo / vaso térmico de café.',
    11990, 19990,
    ['photo-1571934811356-5cc061b6821f', 'photo-1514432324607-a09d9b4aefdd', 'photo-1495474472287-4d71bcdd2085'],
    4.8, 6800, 58000, 'cocina', ['termo', 'cafe', 'acero', 'termico'], 130),

  // ========== OFICINA ==========
  p('of-001',
    'Lámpara de Escritorio LED con Carga Inalámbrica',
    'lampara-escritorio-carga',
    'Lámpara LED de escritorio con brillo y temperatura regulables y base con carga inalámbrica para el teléfono. La foto principal es una lámpara de escritorio en home office.',
    24990, 39990,
    ['photo-1507473885765-e6ed057f782c', 'photo-1513506003901-1e6a229e2d15', 'photo-1497366216548-37526070297c'],
    4.7, 4500, 32000, 'oficina', ['lampara', 'led', 'escritorio', 'carga'], 70),

  p('of-002',
    'Organizador de Escritorio con Cajones',
    'organizador-escritorio',
    'Organizador de escritorio con cajones y porta lápices para material de oficina. Madera o bambú. La imagen principal es un escritorio ordenado / home office.',
    14990, 24990,
    ['photo-1497366216548-37526070297c', 'photo-1434030216411-0b793f4b4173', 'photo-1527864550417-7fd91fc51a46'],
    4.6, 3800, 27000, 'oficina', ['organizador', 'escritorio', 'cajones', 'oficina'], 85),

  p('of-003',
    'Soporte de Monitor Elevado con Cajón',
    'soporte-monitor-elevado',
    'Base elevadora de monitor con espacio para teclado; mejora la altura de la pantalla y la postura. La foto muestra setup de escritorio con monitor.',
    19990, 32990,
    ['photo-1527864550417-7fd91fc51a46', 'photo-1497366216548-37526070297c', 'photo-1593640408182-31c70c8268f5'],
    4.7, 4100, 29000, 'oficina', ['soporte', 'monitor', 'ergonomia', 'escritorio'], 60),

  p('of-004',
    'Tira LED Inteligente WiFi 5m RGBIC',
    'tira-led-wifi-5m',
    'Tira LED RGB de 5 m controlable por app y voz; música y escenas de color. Para escritorio o pared. La imagen principal es iluminación LED de colores.',
    17990, 29990,
    ['photo-1558618666-fcd25c85cd64', 'photo-1507473885765-e6ed057f782c', 'photo-1513506003901-1e6a229e2d15'],
    4.6, 7200, 61000, 'oficina', ['led', 'wifi', 'rgb', 'tira'], 120),

  p('of-005',
    'Timbre Inteligente WiFi con Cámara HD',
    'timbre-inteligente-camara',
    'Timbre con cámara HD, detección de movimiento y app para ver quién llama. Audio bidireccional. La foto se relaciona con seguridad del hogar / entrada.',
    34990, 54990,
    ['photo-1558002038-1055907df827', 'photo-1560518883-ce09059eeffa', 'photo-1558618666-fcd25c85cd64'],
    4.5, 2800, 19000, 'oficina', ['timbre', 'camara', 'wifi', 'seguridad'], 40),

  p('of-006',
    'Soporte de Laptop Ajustable de Aluminio',
    'soporte-laptop-aluminio',
    'Soporte de aluminio regulable en altura para laptop; mejora ergonomía y ventilación. La imagen principal es un portátil sobre soporte en escritorio.',
    16990, 27990,
    ['photo-1527864550417-7fd91fc51a46', 'photo-1593640408182-31c70c8268f5', 'photo-1497366216548-37526070297c'],
    4.8, 5600, 44000, 'oficina', ['soporte', 'laptop', 'aluminio', 'ergonomia'], 95),

  p('of-007',
    'Enchufe Inteligente WiFi Pack x4',
    'enchufe-inteligente-x4',
    'Pack de 4 enchufes WiFi con app y voz (Alexa/Google); horarios y control remoto. La imagen evoca smart home / control de dispositivos.',
    19990, 32990,
    ['photo-1558002038-1055907df827', 'photo-1558618666-fcd25c85cd64', 'photo-1558002038-1055907df827'],
    4.7, 4900, 38000, 'oficina', ['enchufe', 'wifi', 'smart', 'pack'], 100),

  p('of-008',
    'Proyector de Estrellas Astronauta Galaxy',
    'proyector-estrellas-astronauta',
    'Proyector de galaxia y estrellas con forma de astronauta; modos de nebulosa y temporizador. Decoración nocturna. La foto principal es cielo estrellado / proyección de noche.',
    14990, 24990,
    ['photo-1419242902214-272b3f66ee7a', 'photo-1507400492013-162706c8c05e', 'photo-1464805544367-96c574803392'],
    4.6, 6300, 52000, 'oficina', ['proyector', 'estrellas', 'galaxy', 'astronauta'], 80),

  p('of-009',
    'Mouse Ergonómico Vertical Inalámbrico',
    'mouse-ergonomico-vertical',
    'Mouse vertical inalámbrico que reduce la torsión de la muñeca; DPI ajustable. Para jornadas largas. La imagen principal es un mouse / periférico de escritorio.',
    13990, 22990,
    ['photo-1527864550417-7fd91fc51a46', 'photo-1615663908905-f2529d843659', 'photo-1587825140708-dfaf72ae4b04'],
    4.7, 4100, 31000, 'oficina', ['mouse', 'ergonomico', 'vertical', 'inalambrico'], 90),

  p('of-010',
    'Cámara de Seguridad Interior 360° WiFi',
    'camara-seguridad-360',
    'Cámara IP interior 360° con seguimiento, visión nocturna y app de alertas. La foto principal es una cámara de seguridad / vigilancia doméstica.',
    22990, 36990,
    ['photo-1558002038-1055907df827', 'photo-1558618666-fcd25c85cd64', 'photo-1560518883-ce09059eeffa'],
    4.6, 3500, 24000, 'oficina', ['camara', 'seguridad', '360', 'wifi'], 55),
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Costo estimado del producto (proveedor) = precio × (1 − comisión). */
export function getProductCost(price: number): number {
  return Math.round(price * (1 - COMMISSION_RATE));
}

/** Comisión / ganancia estimada por unidad = precio × comisión. */
export function getCommissionAmount(price: number): number {
  return Math.round(price * COMMISSION_RATE);
}

/** Porcentaje de comisión formateado (ej. "40%"). */
export function getCommissionPercentLabel(): string {
  return `${Math.round(COMMISSION_RATE * 100)}%`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
}
