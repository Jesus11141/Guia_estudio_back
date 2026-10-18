import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando inyección mágica de 8vo EGB...');

  // 1. Obtener o crear Grado
  let grade = await prisma.grade.findFirst({ where: { name: '8vo de Básica' } });
  if (!grade) {
    grade = await prisma.grade.create({ data: { name: '8vo de Básica', educationLevel: 'Básica Superior' } });
  }

  const subjectsData = [
    {
      name: 'Matemática',
      lessons: [
        { title: 'Trimestre 1', content: 'El conjunto de los números enteros (\\(\\mathbb{Z}\\)); representación en la recta numérica; orden y valor absoluto; sumas, restas y operaciones combinadas con enteros.' },
        { title: 'Trimestre 2', content: 'Introducción a los números racionales (\\(\\mathbb{Q}\\)) (fracciones y decimales); operaciones básicas; potenciación y radicación de números enteros; ecuaciones sencillas de primer grado.' },
        { title: 'Trimestre 3', content: 'Geometría y Estadística: Teorema de Pitágoras; áreas de polígonos regulares; recolección de datos, cálculo de media, mediana y moda, y diagramas de barras.' }
      ]
    },
    {
      name: 'Lengua y Literatura',
      lessons: [
        { title: 'Trimestre 1: Cultura escrita', content: 'Origen de la escritura (pinturas rupestres, escritura cuneiforme y alfabeto fenicio). Comprensión de textos de divulgación científica.' },
        { title: 'Trimestre 2: Comunicación y Gramática', content: 'Estructura de la oración, el uso del sujeto y el predicado; reglas de acentuación (agudas, graves, esdrújulas y tilde diacrítica). Producción de textos informativos y uso de conectores.' },
        { title: 'Trimestre 3: Literatura', content: 'Lectura de relatos de misterio y novelas de aventuras; desarrollo del pensamiento crítico y debates orales en el aula.' }
      ]
    },
    {
      name: 'Estudios Sociales',
      lessons: [
        { title: 'Trimestre 1: Historia y Orígenes', content: 'La Tierra como nuestro hogar; evolución de los homínidos; el Neolítico y la invención de la agricultura; las primeras civilizaciones fluviales (Mesopotamia, Egipto, India y China).' },
        { title: 'Trimestre 2: Imperios Clásicos y América', content: 'Grecia y Roma; origen de las culturas precolombinas americanas (Mayas, Aztecas e Incas) y sus sistemas de organización social y de cultivo.' },
        { title: 'Trimestre 3: Geografía de Ecuador', content: 'Estructura administrativa del país, relieve e hidrografía, y diversidad demográfica (población indígena, afroecuatoriana, montubia y mestiza).' }
      ]
    },
    {
      name: 'Ciencias Naturales',
      lessons: [
        { title: 'Trimestre 1: El mundo de las células', content: 'La célula como unidad de vida; diferencias entre células procariotas y eucariotas (animal y vegetal); niveles de organización biológica (tejidos, órganos y sistemas).' },
        { title: 'Trimestre 2: Ecosistemas y Energía', content: 'Cadenas alimenticias y redes tróficas; ciclos biogeoquímicos (agua, carbono y nitrógeno); tipos de energía (cinética, potencial y alternativas limpias).' },
        { title: 'Trimestre 3: Biodiversidad de Ecuador', content: 'Características climáticas y ecológicas de las 4 regiones (Costa, Sierra, Amazonía y Galápagos); áreas protegidas; propiedades de la materia y estados de agregación.' }
      ]
    }
  ];

  for (const subjData of subjectsData) {
    // Buscar si la materia ya existe
    let subject = await prisma.subject.findFirst({
      where: { name: subjData.name, gradeId: grade.id }
    });
    
    if (!subject) {
      subject = await prisma.subject.create({
        data: { name: subjData.name, gradeId: grade.id }
      });
    }

    // Insertar lecciones
    let index = 1;
    for (const lessData of subjData.lessons) {
      const lessonExists = await prisma.lesson.findFirst({
        where: { title: lessData.title, subjectId: subject.id }
      });
      if (!lessonExists) {
        await prisma.lesson.create({
          data: { 
            title: lessData.title, 
            content: lessData.content, 
            subjectId: subject.id,
            orderIndex: index
          }
        });
      }
      index++;
    }
  }

  console.log('✅ ¡Currículo de 8vo Inyectado Exitosamente!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
