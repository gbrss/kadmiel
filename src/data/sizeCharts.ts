/**
 * Tablas de tallas (cm) — referencia Kadmiel / Latam
 * No son tablas oficiales de una marca concreta.
 */

export interface SizeChartRow {
  size: string;
  /** Medidas en centímetros */
  measures: Record<string, string | number>;
}

export interface SizeChart {
  id: string;
  name: string;
  unit: 'cm';
  columns: string[];
  rows: SizeChartRow[];
  note?: string;
}

export const sizeCharts: Record<string, SizeChart> = {
  ropa_unisex: {
    id: 'ropa_unisex',
    name: 'Ropa unisex / streetwear',
    unit: 'cm',
    columns: ['Talla', 'Pecho', 'Cintura', 'Largo'],
    rows: [
      { size: 'S', measures: { Pecho: '88–92', Cintura: '72–76', Largo: '68' } },
      { size: 'M', measures: { Pecho: '93–98', Cintura: '77–82', Largo: '70' } },
      { size: 'L', measures: { Pecho: '99–104', Cintura: '83–88', Largo: '72' } },
      { size: 'XL', measures: { Pecho: '105–110', Cintura: '89–94', Largo: '74' } },
      { size: 'XXL', measures: { Pecho: '111–118', Cintura: '95–102', Largo: '76' } },
    ],
    note: 'Mide tu pecho y cintura con cinta métrica. Si estás entre dos tallas, elige la mayor.',
  },
  pantalon: {
    id: 'pantalon',
    name: 'Pantalón / cargo',
    unit: 'cm',
    columns: ['Talla', 'Cintura', 'Cadera', 'Largo pierna'],
    rows: [
      { size: 'S', measures: { Cintura: '72–76', Cadera: '90–94', 'Largo pierna': '100' } },
      { size: 'M', measures: { Cintura: '77–82', Cadera: '95–100', 'Largo pierna': '102' } },
      { size: 'L', measures: { Cintura: '83–88', Cadera: '101–106', 'Largo pierna': '104' } },
      { size: 'XL', measures: { Cintura: '89–94', Cadera: '107–112', 'Largo pierna': '106' } },
      { size: 'XXL', measures: { Cintura: '95–102', Cadera: '113–120', 'Largo pierna': '108' } },
    ],
    note: 'Largo de pierna aproximado desde la entrepierna. Puede variar ±2 cm.',
  },
  calzado: {
    id: 'calzado',
    name: 'Calzado (referencia EU)',
    unit: 'cm',
    columns: ['EU', 'US', 'Largo pie (cm)'],
    rows: [
      { size: '38', measures: { US: '6', 'Largo pie (cm)': '24.0' } },
      { size: '39', measures: { US: '6.5–7', 'Largo pie (cm)': '24.5' } },
      { size: '40', measures: { US: '7.5', 'Largo pie (cm)': '25.0' } },
      { size: '41', measures: { US: '8–8.5', 'Largo pie (cm)': '25.5' } },
      { size: '42', measures: { US: '9', 'Largo pie (cm)': '26.0' } },
      { size: '43', measures: { US: '9.5–10', 'Largo pie (cm)': '26.5' } },
      { size: '44', measures: { US: '10.5', 'Largo pie (cm)': '27.0' } },
    ],
    note: 'Mide el pie de talón a dedo más largo al final del día.',
  },
  anillo: {
    id: 'anillo',
    name: 'Anillos (diámetro interior)',
    unit: 'cm',
    columns: ['Talla', 'Diámetro (mm)', 'Circunferencia (mm)'],
    rows: [
      { size: '14', measures: { 'Diámetro (mm)': '14.1', 'Circunferencia (mm)': '44.2' } },
      { size: '15', measures: { 'Diámetro (mm)': '15.0', 'Circunferencia (mm)': '47.0' } },
      { size: '16', measures: { 'Diámetro (mm)': '16.0', 'Circunferencia (mm)': '50.0' } },
      { size: '17', measures: { 'Diámetro (mm)': '17.0', 'Circunferencia (mm)': '53.4' } },
      { size: '18', measures: { 'Diámetro (mm)': '18.0', 'Circunferencia (mm)': '56.6' } },
      { size: '19', measures: { 'Diámetro (mm)': '19.0', 'Circunferencia (mm)': '59.7' } },
    ],
    note: 'Muchos anillos de esta tienda son ajustables; usa la talla como referencia.',
  },
  mascota: {
    id: 'mascota',
    name: 'Mascotas (por peso)',
    unit: 'cm',
    columns: ['Talla', 'Peso perro/gato', 'Cuello (cm)', 'Pecho (cm)'],
    rows: [
      { size: 'S', measures: { 'Peso perro/gato': 'hasta 5 kg', 'Cuello (cm)': '20–30', 'Pecho (cm)': '30–40' } },
      { size: 'M', measures: { 'Peso perro/gato': '5–15 kg', 'Cuello (cm)': '30–40', 'Pecho (cm)': '40–55' } },
      { size: 'L', measures: { 'Peso perro/gato': '15–30 kg', 'Cuello (cm)': '40–50', 'Pecho (cm)': '55–70' } },
      { size: 'XL', measures: { 'Peso perro/gato': '30+ kg', 'Cuello (cm)': '50–60', 'Pecho (cm)': '70–90' } },
    ],
    note: 'Prioriza la medida de pecho/cuello sobre el peso si no coinciden.',
  },
};

export function getSizeChart(id: string | undefined): SizeChart | undefined {
  if (!id) return undefined;
  return sizeCharts[id];
}

/** Asigna tabla de tallas según categoría y nombre del producto */
export function sizeChartIdFor(category: string, name: string): string | undefined {
  const n = name.toLowerCase();
  if (category === 'moda') {
    if (n.includes('pantal') || n.includes('cargo')) return 'pantalon';
    if (n.includes('anillo')) return 'anillo';
    if (n.includes('collar') || n.includes('pendiente') || n.includes('gafas') || n.includes('gorra') || n.includes('bufanda') || n.includes('cintur') || n.includes('reloj') || n.includes('bolso'))
      return undefined;
    return 'ropa_unisex';
  }
  if (category === 'mascotas') {
    if (n.includes('arnés') || n.includes('arnes') || n.includes('collar') || n.includes('cama') || n.includes('transport')) return 'mascota';
  }
  if (category === 'deportes' && (n.includes('guante') || n.includes('rodillera') || n.includes('mochila'))) {
    return 'ropa_unisex';
  }
  return undefined;
}
