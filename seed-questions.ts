import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando inyección de EJERCICIOS Y GUÍAS DE ESTUDIO para 8vo EGB...');

  // 1. Obtener todas las lecciones de 8vo
  const grade = await prisma.grade.findFirst({ where: { name: '8vo de Básica' } });
  if (!grade) {
    console.error('No se encontró el grado 8vo de Básica.');
    return;
  }

  // Estructura masiva de preguntas generadas por IA basadas en el PEA de 8vo
  const questionBank = {
    'Matemática': {
      'Trimestre 1': [
        {
          questionText: '¿Cuál es el resultado de la siguiente operación combinada con números enteros: -5 + 8 - (-2)?',
          optionA: '1', optionB: '5', optionC: '15', optionD: '-15', correctOption: 'B',
          explanation: 'Primero, menos por menos es más, así que - (-2) se convierte en +2. La operación queda: -5 + 8 + 2. Sumamos los positivos (8+2 = 10) y restamos 5 (10-5 = 5).'
        },
        {
          questionText: 'Si un submarino está a -40 metros (bajo el nivel del mar) y asciende 15 metros, ¿a qué profundidad se encuentra ahora?',
          optionA: '-55 m', optionB: '-25 m', optionC: '25 m', optionD: '-30 m', correctOption: 'B',
          explanation: 'El nivel actual es -40. Al ascender, sumamos altura: -40 + 15 = -25 metros.'
        }
      ],
      'Trimestre 2': [
        {
          questionText: 'Resuelve la siguiente suma de fracciones heterogéneas: 1/2 + 1/4',
          optionA: '2/6', optionB: '3/4', optionC: '1/8', optionD: '1', correctOption: 'B',
          explanation: 'Para sumar 1/2 y 1/4, necesitamos un denominador común (4). 1/2 es igual a 2/4. Luego sumamos: 2/4 + 1/4 = 3/4.'
        },
        {
          questionText: 'Encuentra el valor de "x" en la siguiente ecuación: 2x - 4 = 10',
          optionA: 'x = 3', optionB: 'x = 5', optionC: 'x = 7', optionD: 'x = 14', correctOption: 'C',
          explanation: 'Pasamos el -4 al otro lado sumando: 2x = 10 + 4, es decir, 2x = 14. Luego, dividimos entre 2: x = 14 / 2, entonces x = 7.'
        }
      ],
      'Trimestre 3': [
        {
          questionText: 'Si un triángulo rectángulo tiene un cateto de 3 cm y otro cateto de 4 cm, ¿cuánto mide su hipotenusa? (Teorema de Pitágoras)',
          optionA: '5 cm', optionB: '7 cm', optionC: '12 cm', optionD: '25 cm', correctOption: 'A',
          explanation: 'El Teorema de Pitágoras dice que c² = a² + b². Entonces c² = 3² + 4² = 9 + 16 = 25. La raíz cuadrada de 25 es 5.'
        },
        {
          questionText: 'En un examen, 5 estudiantes obtuvieron las siguientes notas: 7, 8, 8, 9, 10. ¿Cuál es la "Moda" de estas calificaciones?',
          optionA: '7', optionB: '8', optionC: '8.4', optionD: '9', correctOption: 'B',
          explanation: 'La Moda en estadística es el valor que más se repite en un conjunto de datos. En este caso, el número 8 aparece dos veces.'
        }
      ]
    },
    'Lengua y Literatura': {
      'Trimestre 1: Cultura escrita': [
        {
          questionText: '¿Cuál es considerado uno de los primeros sistemas de escritura inventado por los sumerios en Mesopotamia?',
          optionA: 'Jeroglíficos', optionB: 'Alfabeto fenicio', optionC: 'Pinturas rupestres', optionD: 'Escritura cuneiforme', correctOption: 'D',
          explanation: 'La escritura cuneiforme fue creada por los sumerios a finales del cuarto milenio a.C., usando marcas en forma de cuña sobre tablillas de arcilla.'
        }
      ],
      'Trimestre 2: Comunicación y Gramática': [
        {
          questionText: '¿Cuál de las siguientes palabras es "Esdrújula" y SIEMPRE debe llevar tilde?',
          optionA: 'Corazon', optionB: 'Lapiz', optionC: 'Murcielago', optionD: 'Caminar', correctOption: 'C',
          explanation: 'Murciélago tiene la sílaba tónica en la antepenúltima sílaba (mur-CIÉ-la-go), por lo tanto es esdrújula y las reglas dictan que todas las esdrújulas se tildan.'
        }
      ],
      'Trimestre 3: Literatura': [
        {
          questionText: 'En los relatos de misterio, el personaje principal suele usar un método específico para resolver el crimen. ¿Cómo se llama este método?',
          optionA: 'Imaginación abstracta', optionB: 'Pensamiento deductivo', optionC: 'Fuerza física', optionD: 'Poesía lírica', correctOption: 'B',
          explanation: 'Los detectives (como Sherlock Holmes) usan el pensamiento o razonamiento deductivo: observar pistas pequeñas para llegar a una conclusión lógica global.'
        }
      ]
    },
    'Estudios Sociales': {
      'Trimestre 1: Historia y Orígenes': [
        {
          questionText: '¿Cuál fue el invento revolucionario del Neolítico que permitió a los humanos dejar de ser nómadas y establecerse en pueblos?',
          optionA: 'El fuego', optionB: 'La rueda', optionC: 'La agricultura', optionD: 'La escritura', correctOption: 'C',
          explanation: 'La invención de la agricultura y la ganadería permitió a los humanos producir su propia comida y establecer asentamientos permanentes (sedentarismo).'
        }
      ],
      'Trimestre 2: Imperios Clásicos y América': [
        {
          questionText: '¿Qué civilización precolombina se desarrolló en la cordillera de los Andes y construyó Machu Picchu?',
          optionA: 'Los Aztecas', optionB: 'Los Mayas', optionC: 'Los Toltecas', optionD: 'Los Incas', correctOption: 'D',
          explanation: 'El Imperio Inca fue el más grande de la América precolombina, abarcando desde Colombia hasta Chile a lo largo de los Andes, y Machu Picchu es una de sus obras maestras.'
        }
      ],
      'Trimestre 3: Geografía de Ecuador': [
        {
          questionText: 'Ecuador es un país pluricultural. ¿Cuál de estos grupos demográficos forma parte vital de su identidad en la costa y sierra ecuatoriana?',
          optionA: 'Inuits y Esquimales', optionB: 'Indígenas, Afroecuatorianos y Montubios', optionC: 'Celtas y Galos', optionD: 'Zulúes', correctOption: 'B',
          explanation: 'La Constitución del Ecuador reconoce la diversidad de su población, destacando a los pueblos Indígenas, el pueblo Afroecuatoriano, el pueblo Montubio y la población mestiza.'
        }
      ]
    },
    'Ciencias Naturales': {
      'Trimestre 1: El mundo de las células': [
        {
          questionText: '¿Cuál es la principal diferencia anatómica entre una célula procariota y una eucariota?',
          optionA: 'La eucariota tiene un núcleo definido con ADN, la procariota no.', optionB: 'La procariota es más grande.', optionC: 'La procariota está en humanos.', optionD: 'La eucariota no tiene vida.', correctOption: 'A',
          explanation: 'Las células eucariotas (como las de animales y plantas) almacenan su ADN dentro de un núcleo protegido por una membrana, mientras que las procariotas (como las bacterias) lo tienen disperso.'
        }
      ],
      'Trimestre 2: Ecosistemas y Energía': [
        {
          questionText: 'En una red trófica, ¿qué rol cumplen las plantas?',
          optionA: 'Consumidores primarios', optionB: 'Descomponedores', optionC: 'Productores', optionD: 'Consumidores terciarios', correctOption: 'C',
          explanation: 'Las plantas son Productores (autótrofos) porque fabrican su propio alimento usando la energía del sol mediante la fotosíntesis, siendo la base de la cadena alimenticia.'
        }
      ],
      'Trimestre 3: Biodiversidad de Ecuador y Materia': [
        {
          questionText: '¿Cuál de las 4 regiones del Ecuador es mundialmente famosa por su alto nivel de especies endémicas y fue estudiada por Charles Darwin?',
          optionA: 'La Costa', optionB: 'La Sierra (Andes)', optionC: 'La Amazonía', optionD: 'Las Islas Galápagos', correctOption: 'D',
          explanation: 'Las Islas Galápagos inspiraron la Teoría de la Evolución de Darwin debido a que muchas de sus especies (tortugas gigantes, pinzones) no existen en ninguna otra parte del planeta.'
        }
      ]
    }
  };

  // Recorrer materias y lecciones para insertar las preguntas
  const subjects = await prisma.subject.findMany({ where: { gradeId: grade.id } });

  for (const subject of subjects) {
    const subjectContent = questionBank[subject.name as keyof typeof questionBank];
    if (!subjectContent) continue;

    const lessons = await prisma.lesson.findMany({ where: { subjectId: subject.id } });

    for (const lesson of lessons) {
      const questionsForLesson = (subjectContent as any)[lesson.title];
      if (!questionsForLesson) continue;

      for (const q of questionsForLesson) {
        // Verificar si la pregunta ya existe
        const exists = await prisma.question.findFirst({ where: { lessonId: lesson.id, questionText: q.questionText } });
        if (!exists) {
          await prisma.question.create({
            data: {
              lessonId: lesson.id,
              questionText: q.questionText,
              optionA: q.optionA,
              optionB: q.optionB,
              optionC: q.optionC,
              optionD: q.optionD,
              correctOption: q.correctOption,
              explanation: q.explanation,
            }
          });
        }
      }
    }
  }

  console.log('✅ ¡Batería de ejercicios y guías de estudio inyectada con éxito!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
