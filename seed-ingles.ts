import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando creación del Curso: Inglés -> Materia: Inglés A1.1...');

  // 1. Crear o encontrar el Curso/Grado "Inglés"
  let grade = await prisma.grade.findFirst({
    where: { name: 'Inglés' }
  });

  if (!grade) {
    grade = await prisma.grade.create({
      data: {
        name: 'Inglés',
        educationLevel: 'Idiomas'
      }
    });
    console.log('✅ Curso "Inglés" creado con éxito:', grade.id);
  } else {
    console.log('ℹ️ Curso "Inglés" ya existe:', grade.id);
  }

  // 2. Crear o encontrar la Materia "Inglés A1.1" dentro del curso
  let subject = await prisma.subject.findFirst({
    where: {
      name: 'Inglés A1.1',
      gradeId: grade.id
    }
  });

  if (!subject) {
    subject = await prisma.subject.create({
      data: {
        name: 'Inglés A1.1',
        gradeId: grade.id
      }
    });
    console.log('✅ Materia "Inglés A1.1" creada con éxito:', subject.id);
  } else {
    console.log('ℹ️ Materia "Inglés A1.1" ya existe:', subject.id);
  }

  // 3. Estructura de Lecciones y Ejercicios Interactivos
  const unitsData = [
    {
      title: 'Unit 1: Greetings, The Alphabet & Countries',
      orderIndex: 1,
      content: `### Unit 1: Greetings, The Alphabet & Countries (Saludos, Abecedario y Países)

#### 1. Greetings & Farewells (Saludos y Despedidas)
* **Formal Greetings:**
  - Good morning (06:00 - 12:00) = Buenos días
  - Good afternoon (12:00 - 18:00) = Buenas tardes
  - Good evening (18:00 en adelante al llegar) = Buenas noches (saludo)
* **Informal Greetings:**
  - Hello! / Hi! = ¡Hola!
  - How are you? = ¿Cómo estás? -> I am fine, thank you. / Great, thanks!
* **Farewells (Despedidas):**
  - Goodbye! / Bye! = ¡Adiós!
  - See you later! = ¡Hasta luego!
  - Good night! = Buenas noches (únicamente para despedirse o ir a dormir).

#### 2. Introductions & Spelling (Presentaciones y Deletreo)
* **Questions and Answers:**
  - What is your name? -> My name is Carlos.
  - How do you spell your name? -> C - A - R - L - O - S.
  - Nice to meet you! -> Nice to meet you, too! (Mucho gusto / Encantado).

#### 3. Countries & Nationalities (Países y Nacionalidades)
* **Preguntar procedencia:**
  - Where are you from? -> I am from Ecuador.
  - Ecuador -> Ecuadorian
  - Colombia -> Colombian
  - United States -> American
  - Spain -> Spanish
  - Mexico -> Mexican`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo saludas formalmente a tu profesor por la mañana en inglés?',
          optionA: 'Good morning',
          optionB: 'Good night',
          optionC: 'Goodbye',
          optionD: 'See you later',
          correctOption: 'A',
          explanation: '"Good morning" significa "Buenos días" y se usa desde la mañana hasta el mediodía. "Good night" solo se usa para despedirse antes de dormir.',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si alguien te pregunta: "Where are you from?", ¿cuál es la respuesta correcta?',
          optionA: 'I am from Ecuador.',
          optionB: 'My name is Carlos.',
          optionC: 'I have 14 years old.',
          optionD: 'I am fine, thank you.',
          correctOption: 'A',
          explanation: '"Where are you from?" pregunta por tu lugar de origen. La estructura adecuada es "I am from [País/Ciudad]".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena las palabras para presentarte!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'La fórmula estándar para presentarse en inglés es: "My name is [Nombre]".',
          metadata: {
            targetSentence: 'My name is Carlos',
            words: ['My', 'name', 'is', 'Carlos'],
            distractors: ['are', 'from', 'you']
          }
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena las palabras para decir de dónde eres!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'La oración sigue el orden: Pronombre (I) + Verbo To Be (am) + Preposición (from) + País (Ecuador).',
          metadata: {
            targetSentence: 'I am from Ecuador',
            words: ['I', 'am', 'from', 'Ecuador'],
            distractors: ['is', 'live', 'my']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo respondes cortésmente cuando alguien te dice: "Nice to meet you"?',
          optionA: 'Nice to meet you too',
          optionB: 'Good night',
          optionC: 'Thank you not',
          optionD: 'Where are you',
          correctOption: 'A',
          explanation: '"Nice to meet you too" significa "Mucho gusto en conocerte también". Es la respuesta tradicional y cortés.',
          metadata: {}
        }
      ]
    },
    {
      title: 'Unit 2: The Verb "TO BE" & Personal Pronouns',
      orderIndex: 2,
      content: `### Unit 2: The Verb "TO BE" & Personal Pronouns (El Verbo Ser o Estar)

#### 1. Pronombres Personales (Subject Pronouns)
* **I** = Yo
* **You** = Tú / Usted / Ustedes
* **He** = Él (hombre)
* **She** = Ella (mujer)
* **It** = Eso / Ello (animal o cosa en singular)
* **We** = Nosotros / Nosotras
* **They** = Ellos / Ellas

#### 2. Conjugación del Verbo "To Be" (Ser o Estar)
* **Afirmativo:**
  - I **am** (I'm) -> I am a student.
  - You **are** (You're) -> You are smart.
  - He **is** (He's) -> He is a doctor.
  - She **is** (She's) -> She is a teacher.
  - It **is** (It's) -> It is a sunny day.
  - We **are** (We're) -> We are friends.
  - They **are** (They're) -> They are doctors.
* **Negativo:**
  - Sujeto + to be + not
  - I am not / You aren't / He isn't / She isn't / It isn't / We aren't / They aren't.
* **Preguntas (Inversión):**
  - **Are you** happy? -> Yes, I am. / No, I'm not.
  - **Is she** a teacher? -> Yes, she is. / No, she isn't.

#### 3. Numbers & Age (Edad y Números)
* ¡IMPORTANTE! En inglés **la edad se expresa con el verbo TO BE**, nunca con el verbo "have" (tener):
  - Correcto: *I am 15 years old.* (Tengo 15 años).
  - Incorrecto: *I have 15 years.*`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración: "She ___ a talented doctor."',
          optionA: 'is',
          optionB: 'are',
          optionC: 'am',
          optionD: 'be',
          correctOption: 'A',
          explanation: 'Para la tercera persona singular femenina (She), el verbo To Be en presente simple es siempre "is".',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se dice correctamente "Yo tengo 15 años" en inglés?',
          optionA: 'I am 15 years old',
          optionB: 'I have 15 years',
          optionC: 'I has 15 years',
          optionD: 'I got 15 years',
          correctOption: 'A',
          explanation: 'En inglés la edad es un estado de existencia, por lo que siempre se utiliza el verbo "To Be" (I am ... years old), jamás "have".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración afirmativa con el verbo To Be!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'La estructura correcta es: Sujeto (She) + Verbo (is) + Artículo (a) + Adjetivo (good) + Sustantivo (student).',
          metadata: {
            targetSentence: 'She is a good student',
            words: ['She', 'is', 'a', 'good', 'student'],
            distractors: ['are', 'am', 'they']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Elige la forma negativa correcta: "They ___ at home today."',
          optionA: "aren't",
          optionB: "isn't",
          optionC: 'not are',
          optionD: "amn't",
          correctOption: 'A',
          explanation: 'Para el pronombre "They", la negación del verbo To Be contraída es "aren\'t" (are not).',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la pregunta en inglés con el verbo To Be!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'En las preguntas en inglés se invierte el orden: Verbo To Be (Are) + Sujeto (you) + Complemento (ready for class).',
          metadata: {
            targetSentence: 'Are you ready for class',
            words: ['Are', 'you', 'ready', 'for', 'class'],
            distractors: ['Is', 'am', 'do']
          }
        }
      ]
    },
    {
      title: 'Unit 3: Everyday Objects, Colors & Plurals',
      orderIndex: 3,
      content: `### Unit 3: Everyday Objects, Colors & Plurals (Objetos Cotidianos, Colores y Plurales)

#### 1. Artículos Indefinidos: A vs. AN
* Se usa **A** antes de palabras que empiezan con sonido de consonante:
  - a book (un libro)
  - a pencil (un lápiz)
  - a car (un auto)
  - a university (sonido semivocálico /juː/)
* Se usa **AN** antes de palabras que empiezan con sonido de vocal:
  - an apple (una manzana)
  - an elephant (un elefante)
  - an eraser (un borrador)
  - an umbrella (un paraguas)
  - an hour (la 'h' es muda)

#### 2. Demostrativos: This, That, These, Those
* **Cerca (Near):**
  - **This** = Este / Esta (singular) -> *This is my pen.*
  - **These** = Estos / Estas (plural) -> *These are my books.*
* **Lejos (Far):**
  - **That** = Ese / Aquel (singular) -> *That is a big plane.*
  - **Those** = Esos / Aquellos (plural) -> *Those are cars.*

#### 3. Plurales Regulares e Irregulares
* **Regulares (+s / +es):**
  - book -> books
  - watch -> watches
  - box -> boxes
  - baby -> babies
* **Irregulares (cambian su forma):**
  - man -> men (hombre / hombres)
  - woman -> women (mujer / mujeres)
  - child -> children (niño / niños)
  - person -> people (persona / personas)`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es el artículo indefinido correcto para la palabra "umbrella"?',
          optionA: 'an',
          optionB: 'a',
          optionC: 'the a',
          optionD: 'none',
          correctOption: 'A',
          explanation: 'Se utiliza "an" porque "umbrella" inicia con sonido vocálico: "an umbrella".',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es el plural irregular correcto de "child" (niño/niña)?',
          optionA: 'children',
          optionB: 'childs',
          optionC: 'childrens',
          optionD: 'childes',
          correctOption: 'A',
          explanation: '"Child" es un sustantivo irregular cuyo plural es "children". Agregarle "s" (childs o childrens) es incorrecto.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase con demostrativo y adjetivo!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'En inglés el adjetivo color (blue) va antes del sustantivo (notebook): "This is a blue notebook".',
          metadata: {
            targetSentence: 'This is a blue notebook',
            words: ['This', 'is', 'a', 'blue', 'notebook'],
            distractors: ['These', 'an', 'are']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Para señalar varios objetos que están LEJOS de ti, ¿qué palabra utilizas?',
          optionA: 'Those',
          optionB: 'This',
          optionC: 'These',
          optionD: 'That',
          correctOption: 'A',
          explanation: '"Those" es el pronombre demostrativo plural para objetos que están lejos ("esos/aquellos").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración para describir objetos en plural!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'Con el demostrativo plural "These" se utiliza el verbo plural "are": "These books are very interesting".',
          metadata: {
            targetSentence: 'These books are very interesting',
            words: ['These', 'books', 'are', 'very', 'interesting'],
            distractors: ['This', 'is', 'an']
          }
        }
      ]
    },
    {
      title: 'Unit 4: Family Members & Possessives',
      orderIndex: 4,
      content: `### Unit 4: Family Members & Possessives (La Familia y Posesivos)

#### 1. Miembros de la Familia (Family Vocabulary)
* **Parents** = Padres (papá y mamá)
  - Father / Dad = Padre / Papá
  - Mother / Mom = Madre / Mamá
* **Siblings** = Hermanos (en general)
  - Brother = Hermano
  - Sister = Hermana
* **Grandparents** = Abuelos
  - Grandfather = Abuelo
  - Grandmother = Abuela
* **Children** = Hijos / Niños
  - Son = Hijo varón
  - Daughter = Hija mujer
* **Extended Family:**
  - Uncle = Tío
  - Aunt = Tía
  - Cousin = Primo / Prima

#### 2. Adjetivos Posesivos (Possessive Adjectives)
* I -> **my** (mi) -> *This is my sister.*
* You -> **your** (tu / su de usted) -> *What is your name?*
* He -> **his** (su de él) -> *His name is Daniel.*
* She -> **her** (su de ella) -> *Her name is Sofia.*
* It -> **its** (su de cosa/animal) -> *The dog loves its toy.*
* We -> **our** (nuestro / nuestra) -> *This is our house.*
* They -> **their** (su de ellos) -> *Their parents are doctors.*

#### 3. Genitivo Sajón ('s)
* En inglés la posesión se expresa colocando **'s** después del poseedor:
  - *Carlos's car* = El carro de Carlos.
  - *My brother's room* = La habitación de mi hermano.`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa: "David is with ___ sister. Her name is Laura."',
          optionA: 'his',
          optionB: 'her',
          optionC: 'its',
          optionD: 'their',
          correctOption: 'A',
          explanation: 'David es un varón (He), por lo que el adjetivo posesivo correspondiente a "su hermana de él" es "his".',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se traduce "El auto de mi padre" usando el genitivo sajón?',
          optionA: "My father's car",
          optionB: 'The car of my father',
          optionC: "My father car's",
          optionD: 'Car my father',
          correctOption: 'A',
          explanation: 'El genitivo sajón coloca primero el poseedor con apóstrofe y \'s\', seguido de lo poseído: "My father\'s car".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Arma la oración sobre la familia!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'La estructura es: Posesivo (Her) + Sujeto (brother) + Verbo (is) + Artículo (an) + Profesión (engineer). Se usa "an" ante "engineer".',
          metadata: {
            targetSentence: 'Her brother is an engineer',
            words: ['Her', 'brother', 'is', 'an', 'engineer'],
            distractors: ['his', 'are', 'a']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué significa la palabra "parents" en inglés?',
          optionA: 'Padres (papá y mamá)',
          optionB: 'Parientes',
          optionC: 'Primos',
          optionD: 'Hermanos',
          correctOption: 'A',
          explanation: '"Parents" es un falso amigo (false cognate). No significa parientes, sino específicamente "padres" (padre y madre).',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase de pertenencia familiar!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: '"Our family" (nuestra familia) actúa como sujeto singular, por lo que el verbo lleva \'s\' en presente simple: "lives in Quito".',
          metadata: {
            targetSentence: 'Our family lives in Quito',
            words: ['Our', 'family', 'lives', 'in', 'Quito'],
            distractors: ['We', 'live', 'my']
          }
        }
      ]
    },
    {
      title: 'Unit 5: Daily Routines & Present Simple',
      orderIndex: 5,
      content: `### Unit 5: Daily Routines & Present Simple (Vida Cotidiana y Presente Simple)

#### 1. Verbos de Acción Cotidiana (Action Verbs)
* **wake up** = despertarse
* **have breakfast** = desayunar
* **study** = estudiar
* **work** = trabajar
* **live** = vivir
* **speak** = hablar
* **play** = jugar / tocar instrumento
* **eat** = comer
* **drink** = beber
* **go to sleep** = ir a dormir

#### 2. Reglas del Presente Simple (Afirmativo)
* **Para I, You, We, They:** El verbo se mantiene en su forma base.
  - *I speak English.* (Yo hablo inglés).
  - *We live in Ecuador.* (Nosotros vivimos en Ecuador).
  - *They study every day.* (Ellos estudian todos los días).
* **Para He, She, It (3ra persona singular):** Se añade **-s** o **-es** al verbo.
  - He work**s** in a hospital.
  - She live**s** in Guayaquil.
  - Daniel watch**es** TV in the evening.
  - Maria studi**es** medicine. (y -> ies).

#### 3. Días de la Semana y la Hora
* **Days of the week:**
  - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.
  - Se usa la preposición **ON**: *on Monday, on Fridays.*
* **Telling Time:**
  - What time is it? -> It is 8:00 AM (eight o'clock).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración en tercera persona singular: "Daniel ___ English every afternoon."',
          optionA: 'studies',
          optionB: 'study',
          optionC: 'studying',
          optionD: 'is study',
          correctOption: 'A',
          explanation: 'Para la tercera persona singular (He / Daniel), los verbos terminados en consonante + \'y\' cambian a \'-ies\': study -> studies.',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo dices "Nosotros vivimos en Ecuador" en presente simple?',
          optionA: 'We live in Ecuador',
          optionB: 'We are live in Ecuador',
          optionC: 'We living in Ecuador',
          optionD: 'We lives in Ecuador',
          correctOption: 'A',
          explanation: 'Con el pronombre "We", el verbo en presente simple va en forma base ("live"). No se combina con el verbo To Be.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Arma la oración de rutina diaria!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'El orden habitual es: Sujeto (I) + Verbo (study) + Objeto (English) + Frecuencia/Tiempo (every day).',
          metadata: {
            targetSentence: 'I study English every day',
            words: ['I', 'study', 'English', 'every', 'day'],
            distractors: ['studies', 'am', 'is']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Elige el verbo correcto para la oración: "They ___ soccer on Saturdays."',
          optionA: 'play',
          optionB: 'plays',
          optionC: 'playing',
          optionD: 'are play',
          correctOption: 'A',
          explanation: 'Para el sujeto "They" (ellos), el verbo en presente simple se escribe en su forma infinitiva sin \'s\': "They play soccer".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración en tercera persona singular!',
          optionA: '-',
          optionB: '-',
          optionC: '-',
          optionD: '-',
          correctOption: 'A',
          explanation: 'Con "She" se agrega \'s\' al verbo (works) seguido del lugar: "She works in a hospital".',
          metadata: {
            targetSentence: 'She works in a hospital',
            words: ['She', 'works', 'in', 'a', 'hospital'],
            distractors: ['work', 'is', 'they']
          }
        }
      ]
    }
  ];

  let totalQuestionsCount = 0;

  for (const unit of unitsData) {
    // Buscar o crear la Lección
    let lesson = await prisma.lesson.findFirst({
      where: {
        title: unit.title,
        subjectId: subject.id
      }
    });

    if (!lesson) {
      lesson = await prisma.lesson.create({
        data: {
          title: unit.title,
          content: unit.content,
          orderIndex: unit.orderIndex,
          subjectId: subject.id
        }
      });
      console.log(`  📖 Lección creada: "${unit.title}"`);
    } else {
      lesson = await prisma.lesson.update({
        where: { id: lesson.id },
        data: {
          content: unit.content,
          orderIndex: unit.orderIndex
        }
      });
      console.log(`  🔄 Lección actualizada: "${unit.title}"`);
    }

    // Insertar preguntas
    for (const q of unit.questions) {
      const questionExists = await prisma.question.findFirst({
        where: {
          lessonId: lesson.id,
          questionText: q.questionText
        }
      });

      if (!questionExists) {
        await prisma.question.create({
          data: {
            lessonId: lesson.id,
            type: q.type,
            questionText: q.questionText,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctOption: q.correctOption,
            explanation: q.explanation,
            metadata: q.metadata
          }
        });
        totalQuestionsCount++;
      }
    }
  }

  // 4. Agregar Libro Digital a la Biblioteca en categoría "Inglés"
  const existingBook = await prisma.book.findFirst({
    where: { title: 'English A1.1: Starter & Visual Grammar Guide' }
  });

  if (!existingBook) {
    await prisma.book.create({
      data: {
        title: 'English A1.1: Starter & Visual Grammar Guide',
        author: 'Aprende Estudia / DJH Company',
        category: 'Inglés',
        description: 'Manual completo e ilustrado de iniciación al idioma inglés nivel A1.1. Incluye abecedario, saludos, verbo To Be, números, colores, objetos cotidianos, miembros de la familia y presente simple.',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    });
    console.log('📚 Libro digital de Inglés A1.1 agregado a la Biblioteca.');
  }

  // 5. Asignar el nuevo curso a los usuarios de prueba o estudiantes si no tienen grado
  const usersWithoutGrade = await prisma.user.findMany({
    where: { role: 'STUDENT', gradeId: null }
  });

  for (const u of usersWithoutGrade) {
    await prisma.user.update({
      where: { id: u.id },
      data: { gradeId: grade.id }
    });
    console.log(`  👤 Estudiante "${u.email}" asignado automáticamente al curso de Inglés.`);
  }

  console.log(`\n🎉 ¡CURSO Y MATERIA CREADOS CON ÉXITO!`);
  console.log(`👉 Curso: "${grade.name}" (${grade.educationLevel})`);
  console.log(`👉 Materia: "${subject.name}"`);
  console.log(`👉 5 Unidades temáticas completas.`);
  console.log(`👉 ${totalQuestionsCount} preguntas y juegos interactivos inyectados.`);
}

main()
  .catch((e) => {
    console.error('❌ Error al inyectar curso de inglés:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
