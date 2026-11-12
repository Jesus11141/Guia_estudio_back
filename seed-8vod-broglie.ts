import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏛️ Creando Institución, Curso 8vo D y Guía de Estudio de Inglés...');

  // 1. Crear o actualizar la Institución "Unidad Educativa Louis Victor de Broglie"
  let institution = await prisma.institution.findFirst({
    where: {
      OR: [
        { name: 'Unidad Educativa Louis Victor de Broglie' },
        { name: 'Unidad Educativa Louis Victor de Vougle' },
      ],
    },
  });

  if (!institution) {
    institution = await prisma.institution.create({
      data: {
        name: 'Unidad Educativa Louis Victor de Broglie',
        logoUrl: null,
      },
    });
    console.log('✅ Institución creada:', institution.name);
  } else {
    console.log('ℹ️ Institución existente:', institution.name);
  }

  // 2. Crear o actualizar el Grado / Curso "8vo D"
  let grade = await prisma.grade.findFirst({
    where: { name: '8vo D' },
  });

  if (!grade) {
    grade = await prisma.grade.create({
      data: {
        name: '8vo D',
        educationLevel: 'Educación General Básica Superior',
      },
    });
    console.log('✅ Grado creado:', grade.name);
  } else {
    console.log('ℹ️ Grado ya existente:', grade.name);
  }

  // 3. Crear o actualizar la Materia "Inglés" vinculada a "8vo D"
  let subject = await prisma.subject.findFirst({
    where: {
      name: 'Inglés',
      gradeId: grade.id,
    },
  });

  if (!subject) {
    subject = await prisma.subject.create({
      data: {
        name: 'Inglés',
        gradeId: grade.id,
      },
    });
    console.log('✅ Materia creada:', subject.name, 'en', grade.name);
  } else {
    console.log('ℹ️ Materia ya existente:', subject.name);
  }

  // 4. Limpieza de lecciones previas de esta materia para evitar duplicados
  const existingLessons = await prisma.lesson.findMany({
    where: { subjectId: subject.id },
  });
  if (existingLessons.length > 0) {
    console.log(`🧹 Limpiando ${existingLessons.length} lecciones previas para actualizar con la nueva guía...`);
    await prisma.lesson.deleteMany({
      where: { subjectId: subject.id },
    });
  }

  // 5. Contenido exhaustivo de la Guía de Estudio (10 Unidades Temáticas con Banco de Preguntas)
  const curriculum = [
    // ==========================================
    // UNIT 1: Articles A / AN & Phonetic Rules
    // ==========================================
    {
      title: 'Unit 1: Indefinite Articles A / AN & Phonetics',
      orderIndex: 1,
      content: `### Unit 1: Indefinite Articles A / AN & Phonetic Rules (Artículos Indefinidos y Reglas Fonéticas)

#### 1. Regla General de Uso
En inglés, **"A"** y **"AN"** significan **"un"** o **"una"**. Se utilizan exclusivamente con sustantivos singulares contables.

* **Se usa "A" cuando la siguiente palabra empieza con sonido de CONSONANTE:**
  - *a cat* (un gato)
  - *a dog* (un perro)
  - *a pen* (un esfero)
  - *a book* (un libro)

* **Se usa "AN" cuando la siguiente palabra empieza con sonido de VOCAL (A, E, I, O, U):**
  - *an apple* (una manzana)
  - *an orange* (una naranja)
  - *an eraser* (un borrador)
  - *an elephant* (un elefante)

---

#### 2. Casos Especiales de Fonética (¡Muy Importante!)
La regla depende del **sonido hablado**, no de cómo se escribe:

1. **Cuando la letra "H" es MUDA:**
   - Si la "H" no se pronuncia, el primer sonido es de vocal; por lo tanto, usamos **AN**:
     - *an hour* (/aʊər/ - una hora)
     - *an honest person* (/ɒnɪst/ - una persona honesta)
   - *Nota:* Si la "H" suena como una "J" suave, usamos **A**:
     - *a house* (una casa)
     - *a horse* (un caballo)

2. **Cuando la vocal "U" suena como semiconsonante (/juː/ tipo "iu"):**
   - Si la "U" suena como en *you*, se considera sonido consonántico; por lo tanto, usamos **A**:
     - *a uniform* (un uniforme)
     - *a unicorn* (un unicornio)
     - *a university* (una universidad)
   - *Nota:* Si la "U" suena como vocal corta (/ʌ/), usamos **AN**:
     - *an umbrella* (un paraguas)`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la forma correcta para decir "una manzana"?',
          optionA: 'a apple',
          optionB: 'an apple',
          optionC: 'the apple',
          optionD: 'apple an',
          correctOption: 'B',
          explanation: '"Apple" inicia con sonido de vocal (/æ/), por lo que se debe usar "an".',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Por qué se dice "an hour" en lugar de "a hour"?',
          optionA: 'Porque hour es plural',
          optionB: 'Porque la letra H es muda y el sonido inicial es de vocal',
          optionC: 'Porque hour es un verbo',
          optionD: 'Porque siempre que hay H se usa an',
          correctOption: 'B',
          explanation: 'La letra "h" en "hour" no suena, por lo que la palabra inicia fonéticamente con sonido de vocal.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la opción correcta para "uniforme"?',
          optionA: 'an uniform',
          optionB: 'a uniform',
          optionC: 'a uniforms',
          optionD: 'an uniforms',
          correctOption: 'B',
          explanation: '"Uniform" inicia con sonido semiconsonante (/juː/), por lo que lleva el artículo "a".',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración: "I have ____ new eraser and ____ orange notebook."',
          optionA: 'a / an',
          optionB: 'an / a',
          optionC: 'a / a',
          optionD: 'an / an',
          correctOption: 'A',
          explanation: '"New" inicia con consonante (a new eraser) y "orange" inicia con vocal (an orange notebook).',
        },
      ],
    },

    // ==========================================
    // UNIT 2: School Supplies
    // ==========================================
    {
      title: 'Unit 2: Classroom Vocabulary & School Supplies',
      orderIndex: 2,
      content: `### Unit 2: School Supplies (Útiles Escolares)

#### 1. Los 12 Útiles Escolares Esenciales del Cuaderno
Aprende a identificar y escribir los objetos de tu aula de clases:

1. **An eraser** = Un borrador
2. **A timetable** = Un horario de clases
3. **A paint brush** = Un pincel
4. **A pen** = Un esfero / bolígrafo
5. **A sharpener** = Un sacapuntas
6. **A pencil case** = Una cartuchera
7. **A laptop** = Una computadora portátil
8. **A school bag** = Una mochila escolar
9. **A notebook** = Un cuaderno
10. **A ruler** = Una regla
11. **A glue / glue stick** = Una goma / pegamento
12. **A pencil** = Un lápiz

---

#### 2. Ejemplos Prácticos en el Aula
* *I have a pencil in my pencil case.* (Tengo un lápiz en mi cartuchera).
* *She cuts with scissors and sticks with a glue.* (Ella corta con tijeras y pega con goma).
* *Open your notebook on page ten.* (Abre tu cuaderno en la página diez).
* *Where is my school bag?* (¿Dónde está mi mochila?).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se dice "sacapuntas" en inglés?',
          optionA: 'Pencil case',
          optionB: 'Sharpener',
          optionC: 'Ruler',
          optionD: 'Paint brush',
          correctOption: 'B',
          explanation: '"Sharpener" significa sacapuntas.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si guardas tus lápices y borradores, ¿en qué objeto los guardas?',
          optionA: 'Timetable',
          optionB: 'Pencil case',
          optionC: 'Ruler',
          optionD: 'Glue',
          correctOption: 'B',
          explanation: '"Pencil case" es la cartuchera donde se guardan los útiles pequeños.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál de los siguientes útiles escolares lleva el artículo "AN"?',
          optionA: 'Notebook',
          optionB: 'Ruler',
          optionC: 'Eraser',
          optionD: 'Pen',
          correctOption: 'C',
          explanation: '"Eraser" empieza con vocal, por lo que lleva "an eraser".',
        },
      ],
    },

    // ==========================================
    // UNIT 3: School Subjects & Timetables
    // ==========================================
    {
      title: 'Unit 3: School Subjects & The Weekly Schedule',
      orderIndex: 3,
      content: `### Unit 3: School Subjects & Weekly Schedule (Materias Escolares y Horario)

#### 1. Las 10 Materias Escolares
Aprende los nombres de las asignaturas que estudias en 8vo grado:

1. **Art** = Arte / Educación Cultural y Artística
2. **Drama** = Teatro / Actuación
3. **English** = Inglés
4. **Geography** = Geografía
5. **History** = Historia
6. **Math** = Matemáticas
7. **Music** = Música
8. **Science** = Ciencias Naturales
9. **P.E. (Physical Education)** = Educación Física
10. **I.T. (Information Technology)** = Computación / Informática

---

#### 2. Días de la Semana y Preguntas Clave
* **Days of the week:** *Monday* (Lunes), *Tuesday* (Martes), *Wednesday* (Miércoles), *Thursday* (Jueves), *Friday* (Viernes).
* **Preguntar por tu materia favorita:**
  - *What is your favorite school subject?* (¿Cuál es tu materia escolar favorita?)
  - *My favorite subject is English because it is fun.* (Mi materia favorita es inglés porque es divertida).
* **Consultar tu horario (*Timetable*):**
  - *On Monday, I have Math and Science.* (El lunes tengo Matemáticas y Ciencias).
  - *On Thursday, we have P.E. in the soccer field.* (El jueves tenemos Educación Física en la cancha).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué significan las siglas "P.E." en el horario escolar?',
          optionA: 'Public Education',
          optionB: 'Physical Education (Educación Física)',
          optionC: 'Personal English',
          optionD: 'Project Evaluation',
          correctOption: 'B',
          explanation: '"P.E." significa "Physical Education", la materia de deportes y actividad física.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la materia donde estudias los continentes, países y mapas?',
          optionA: 'Drama',
          optionB: 'Music',
          optionC: 'Geography',
          optionD: 'Math',
          correctOption: 'C',
          explanation: '"Geography" (Geografía) es la ciencia que estudia los mapas, países y relieves.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo respondes a "What is your favorite subject?"',
          optionA: 'I am 11 years old.',
          optionB: 'My favorite subject is Science.',
          optionC: 'I am from Ecuador.',
          optionD: 'Yes, I am happy.',
          correctOption: 'B',
          explanation: 'La respuesta correcta habla de la materia favorita ("My favorite subject is Science").',
        },
      ],
    },

    // ==========================================
    // UNIT 4: Verb TO BE - Affirmative Form
    // ==========================================
    {
      title: 'Unit 4: Verb TO BE - Affirmative & Personal Pronouns',
      orderIndex: 4,
      content: `### Unit 4: Verb TO BE - Affirmative Form (Ser o Estar)

#### 1. Pronombres Personales y Conjugación
El verbo **TO BE** significa **SER** o **ESTAR**. Cambia de forma según el pronombre:

| Pronombre | Verbo TO BE | Contracción | Significado |
| :--- | :--- | :--- | :--- |
| **I** | **am** | *I'm* | Yo soy / Yo estoy |
| **You** | **are** | *You're* | Tú eres / Tú estás (Usted) |
| **He** | **is** | *He's* | Él es / Él está |
| **She** | **is** | *She's* | Ella es / Ella está |
| **It** | **is** | *It's* | Eso es / Eso está (Cosa o animal) |
| **We** | **are** | *We're* | Nosotros somos / estamos |
| **You** | **are** | *You're* | Ustedes son / están |
| **They** | **are** | *They're* | Ellos son / están |

---

#### 2. Los 3 Usos Clave del Verbo TO BE
1. **Para expresar EDAD (¡En inglés se usa TO BE, NO el verbo tener!):**
   - *I am 11 years old.* (Tengo 11 años).
   - *He is 12 years old.* (Él tiene 12 años).
   - *Pablo is 12 years old.* (Pablo tiene 12 años).

2. **Para expresar EMOCIONES y ESTADOS:**
   - *I am happy.* (Estoy feliz).
   - *He is sad.* (Él está triste).
   - *My dad is ill.* (Mi papá está enfermo).
   - *They are tired.* (Ellos están cansados).

3. **Para indicar LUGAR o UBICACIÓN:**
   - *I am in the classroom.* (Estoy en el aula).
   - *She is in the kitchen.* (Ella está en la cocina).
   - *They are in the garden.* (Ellos están en el jardín).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración: "She ____ a teacher."',
          optionA: 'am',
          optionB: 'are',
          optionC: 'is',
          optionD: 'be',
          correctOption: 'C',
          explanation: 'Con la tercera persona singular femenina (She) se usa "is".',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se dice en inglés: "Yo tengo 11 años"?',
          optionA: 'I have 11 years.',
          optionB: 'I am 11 years old.',
          optionC: 'I has 11 years old.',
          optionD: 'I are 11 years old.',
          correctOption: 'B',
          explanation: 'En inglés la edad se expresa obligatoriamente con el verbo TO BE ("I am 11 years old").',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa: "The pizza ____ delicious and the dogs ____ big."',
          optionA: 'is / are',
          optionB: 'are / is',
          optionC: 'am / are',
          optionD: 'is / is',
          correctOption: 'A',
          explanation: '"The pizza" es singular (is) y "the dogs" es plural (are).',
        },
      ],
    },

    // ==========================================
    // UNIT 5: Verb TO BE - Negative Form
    // ==========================================
    {
      title: 'Unit 5: Verb TO BE - Negative Form & Contractions',
      orderIndex: 5,
      content: `### Unit 5: Verb TO BE - Negative Form (Forma Negativa y Contracciones)

#### 1. Estructura de la Negación
Para formar oraciones negativas, agregamos **NOT** inmediatamente después del verbo TO BE:

* **I am not** $\rightarrow$ *I'm not*
* **He is not** $\rightarrow$ *He isn't* / *He's not*
* **She is not** $\rightarrow$ *She isn't* / *She's not*
* **It is not** $\rightarrow$ *It isn't* / *It's not*
* **We are not** $\rightarrow$ *We aren't* / *We're not*
* **You are not** $\rightarrow$ *You aren't* / *You're not*
* **They are not** $\rightarrow$ *They aren't* / *They're not*

---

#### 2. Las 16 Oraciones de Práctica de las Fichas
Repasa y memoriza estos ejemplos reales de clase:
1. *It* **isn't** *raining.* (No está lloviendo).
2. *My shoes* **aren't** *new.* (Mis zapatos no son nuevos).
3. *Mom* **isn't** *in the kitchen.* (Mamá no está en la cocina).
4. *We* **aren't** *at the park.* (No estamos en el parque).
5. *I* **am not** *tired today.* (No estoy cansado hoy).
6. *He* **isn't** *my brother.* (Él no es mi hermano).
7. *They* **aren't** *at home.* (Ellos no están en casa).
8. *She* **isn't** *happy with the result.* (Ella no está feliz con el resultado).
9. *The cat* **isn't** *on the bed.* (El gato no está sobre la cama).
10. *You* **aren't** *a student.* (Tú no eres estudiante).
11. *The apples* **aren't** *green.* (Las manzanas no son verdes).
12. *We* **aren't** *late for class.* (No llegamos tarde a clase).
13. *I* **am not** *an adult.* (Yo no soy un adulto).
14. *He* **isn't** *ready yet.* (Él no está listo todavía).
15. *Dogs* **aren't** *unfriendly.* (Los perros no son antipáticos).
16. *The movie* **isn't** *interesting.* (La película no está interesante).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la contracción negativa correcta de "He is not"?',
          optionA: 'He amn\'t',
          optionB: 'He isn\'t',
          optionC: 'He aren\'t',
          optionD: 'He not is',
          correctOption: 'B',
          explanation: '"Is not" se contrae como "isn\'t".',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración: "My shoes ____ new."',
          optionA: 'isn\'t',
          optionB: 'am not',
          optionC: 'aren\'t',
          optionD: 'not are',
          correctOption: 'C',
          explanation: '"My shoes" es un sujeto plural (zapatos), por lo que se usa "aren\'t".',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa: "I ____ tired, but my brother ____ at home."',
          optionA: 'am not / isn\'t',
          optionB: 'isn\'t / aren\'t',
          optionC: 'aren\'t / isn\'t',
          optionD: 'am not / aren\'t',
          correctOption: 'A',
          explanation: 'Con "I" se usa "am not" y con "my brother" (he) se usa "isn\'t".',
        },
      ],
    },

    // ==========================================
    // UNIT 6: Verb TO BE - Interrogative Form & Short Answers
    // ==========================================
    {
      title: 'Unit 6: Verb TO BE - Interrogative Form & Short Answers',
      orderIndex: 6,
      content: `### Unit 6: Verb TO BE - Interrogative Form & Short Answers (Preguntas y Respuestas Cortas)

#### 1. Regla de Inversión para Preguntas
Para hacer preguntas con el verbo TO BE, simplemente **invertimos el orden** del sujeto y del verbo:

* Afirmativo: **Subject + Verb TO BE + Complement.** (*You are happy.*)
* Pregunta: **Verb TO BE + Subject + Complement + ?** (*Are you happy?*)

---

#### 2. Banco de Preguntas y Respuestas Cortas (*Short Answers*)
Aprende a responder de forma concisa y natural:

1. *Are you happy?*
   - $\rightarrow$ **Yes, I am.** / **No, I am not (I'm not).**
2. *Is she at school?*
   - $\rightarrow$ **Yes, she is.** / **No, she isn't.**
3. *Is he ten years old?*
   - $\rightarrow$ **Yes, he is.** / **No, he isn't.**
4. *Are they in the park?*
   - $\rightarrow$ **Yes, they are.** / **No, they aren't.**
5. *Is it sunny today?*
   - $\rightarrow$ **Yes, it is.** / **No, it isn't.**
6. *Are we late?*
   - $\rightarrow$ **Yes, we are.** / **No, we aren't.**
7. *Is your mother a doctor?*
   - $\rightarrow$ **Yes, she is.** / **No, she isn't.**
8. *Are the dogs big?*
   - $\rightarrow$ **Yes, they are.** / **No, they aren't.**
9. *Is the book on the table?*
   - $\rightarrow$ **Yes, it is.** / **No, it isn't.**
10. *Is he in the kitchen?*
    - $\rightarrow$ **Yes, he is.** / **No, he isn't.**`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si te preguntan: "Are you Ecuadorian?", ¿cómo respondes afirmativamente?',
          optionA: 'Yes, you are.',
          optionB: 'Yes, I am.',
          optionC: 'Yes, I is.',
          optionD: 'Yes, it is.',
          correctOption: 'B',
          explanation: 'Al responder sobre ti mismo (tú), la respuesta afirmativa corta es "Yes, I am."',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la pregunta: "____ your mother a doctor?"',
          optionA: 'Are',
          optionB: 'Am',
          optionC: 'Is',
          optionD: 'Be',
          correctOption: 'C',
          explanation: '"Your mother" equivale al pronombre "she" (ella), por lo que la pregunta inicia con "Is".',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la respuesta negativa corta para: "Is the cat under the chair?"',
          optionA: 'No, they aren\'t.',
          optionB: 'No, he isn\'t.',
          optionC: 'No, it isn\'t.',
          optionD: 'No, I\'m not.',
          correctOption: 'C',
          explanation: '"The cat" es un animal en singular, representado por el pronombre "it". La respuesta es "No, it isn\'t".',
        },
      ],
    },

    // ==========================================
    // UNIT 7: Demonstratives THIS vs THAT
    // ==========================================
    {
      title: 'Unit 7: Demonstratives - THIS vs THAT',
      orderIndex: 7,
      content: `### Unit 7: Demonstratives - THIS vs THAT (Demostrativos de Distancia)

#### 1. Concepto de Distancia en Singular
Los demostrativos indican si un objeto está cerca o lejos de la persona que habla:

1. **THIS (Cerca $\rightarrow$ "Este, Esta, Esto"):**
   - Se utiliza para señañar un objeto que está al alcance de la mano o cerca:
     - *This is my dog.* (Este es mi perro).
     - *This is your pencil.* (Este es tu lápiz).
     - *This is our classroom.* (Esta es nuestra aula).

2. **THAT (Lejos $\rightarrow$ "Ese, Esa, Eso, Aquel, Aquella"):**
   - Se utiliza para señalar un objeto que está distante o alejado:
     - *That is my timetable.* (Aquel es mi horario).
     - *That is your ruler.* (Esa es tu regla).
     - *That is his notebook.* (Ese es el cuaderno de él).

---

#### 2. Tabla Comparativa de Plurales
* Singular cerca: **THIS** (*This is a book*) $\leftrightarrow$ Plural cerca: **THESE** (*These are books*)
* Singular lejos: **THAT** (*That is a star*) $\leftrightarrow$ Plural lejos: **THOSE** (*Those are stars*)`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si tienes un lápiz en tu mano, ¿cuál demostrativo debes usar?',
          optionA: 'That is my pencil.',
          optionB: 'This is my pencil.',
          optionC: 'Those is my pencil.',
          optionD: 'These is my pencil.',
          correctOption: 'B',
          explanation: '"This" se usa para objetos singulares que están cerca o al alcance de la mano.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Señalas un horario de clases que está en la pared al otro lado del aula. ¿Qué dices?',
          optionA: 'This is my timetable.',
          optionB: 'That is my timetable.',
          optionC: 'These is my timetable.',
          optionD: 'Those are my timetable.',
          correctOption: 'B',
          explanation: '"That" se utiliza para objetos que están distantes o lejos de quien habla.',
        },
      ],
    },

    // ==========================================
    // UNIT 8: Possessive Adjectives
    // ==========================================
    {
      title: 'Unit 8: Possessive Adjectives (My, Your, His, Her...)',
      orderIndex: 8,
      content: `### Unit 8: Possessive Adjectives (Adjetivos Posesivos)

#### 1. Tabla de Correspondencia entre Pronombre y Posesivo
Los adjetivos posesivos indican a quién le pertenece un objeto:

| Pronombre Personal | Adjetivo Posesivo | Significado en Español |
| :--- | :--- | :--- |
| **I** (Yo) | **My** | Mi / Mis |
| **You** (Tú) | **Your** | Tu / Tus |
| **He** (Él) | **His** | Su / Sus (de él) |
| **She** (Ella) | **Her** | Su / Sus (de ella) |
| **It** (Cosa/Animal) | **Its** | Su / Sus (de una cosa o mascota) |
| **We** (Nosotros) | **Our** | Nuestro(a) / Nuestros(as) |
| **You** (Ustedes) | **Your** | Su / Sus (de ustedes) |
| **They** (Ellos) | **Their** | Su / Sus (de ellos o ellas) |

---

#### 2. Ejemplos Prácticos
* *This is **my** dog.* (Este es mi perro).
* *This is **his** dog.* (Este es el perro de él - por ejemplo, de Pedro).
* *This is **her** dog.* (Este es el perro de ella - por ejemplo, de María).
* *This is **our** school.* (Esta es nuestra escuela: Louis Victor de Broglie).
* *That is **their** classroom.* (Esa es el aula de ellos).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si el libro pertenece a Carlos (él), ¿cómo dices "su libro"?',
          optionA: 'Her book',
          optionB: 'His book',
          optionC: 'My book',
          optionD: 'Their book',
          correctOption: 'B',
          explanation: '"His" es el adjetivo posesivo para indicar posesión de un hombre o chico ("de él").',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es el posesivo correspondiente al pronombre "We" (Nosotros)?',
          optionA: 'Our',
          optionB: 'Their',
          optionC: 'Your',
          optionD: 'Its',
          correctOption: 'A',
          explanation: '"Our" significa "nuestro/a" o "nuestros/as" y corresponde a "We".',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa: "Maria is studying with ____ best friend."',
          optionA: 'his',
          optionB: 'her',
          optionC: 'its',
          optionD: 'my',
          correctOption: 'B',
          explanation: 'Maria es mujer (she), por lo que su posesivo correspondiente es "her".',
        },
      ],
    },

    // ==========================================
    // UNIT 9: WH- Questions
    // ==========================================
    {
      title: 'Unit 9: WH- Questions (What, Where, How old, How)',
      orderIndex: 9,
      content: `### Unit 9: WH- Questions (Preguntas de Información)

#### 1. Las 4 Preguntas Clave del Cuaderno
A diferencia de las preguntas de "Sí/No", las preguntas con **WH-** solicitan información específica:

1. **WHAT? (¿Qué? / ¿Cuál?):**
   - *What is your name?* (¿Cuál es tu nombre?)
   - $\rightarrow$ *My name is Alisson Duarte.* (Mi nombre es Alisson Duarte).
   - $\rightarrow$ *My name is Roger Toaquiza.* (Mi nombre es Roger Toaquiza).

2. **WHERE? (¿Dónde?):**
   - *Where are you from?* (¿De dónde eres?)
   - $\rightarrow$ *I am from Ecuador.* (Soy de Ecuador).

3. **HOW OLD? (¿Cuántos años tienes? / ¿Qué edad tienes?):**
   - *How old are you?* (¿Qué edad tienes?)
   - $\rightarrow$ *I am 11 years old.* (Tengo 11 años).
   - $\rightarrow$ *I am 12 years old.* (Tengo 12 años).

4. **HOW? (¿Cómo estás? - Estado de ánimo o salud):**
   - *How are you?* (¿Cómo estás?)
   - $\rightarrow$ *I am tired.* (Estoy cansado/a).
   - $\rightarrow$ *I am happy.* (Estoy feliz).
   - $\rightarrow$ *I am hungry.* (Tengo hambre).
   - $\rightarrow$ *I am sleepy.* (Tengo sueño).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si alguien te pregunta: "Where are you from?", ¿qué información te está pidiendo?',
          optionA: 'Tu nombre',
          optionB: 'Tu país o ciudad de origen',
          optionC: 'Tu edad',
          optionD: 'Tu materia favorita',
          correctOption: 'B',
          explanation: '"Where are you from?" pregunta por el lugar o país de origen ("I am from Ecuador").',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la pregunta correcta para saber la edad de una persona?',
          optionA: 'How years do you have?',
          optionB: 'How old are you?',
          optionC: 'What is your age old?',
          optionD: 'Where are you old?',
          correctOption: 'B',
          explanation: '"How old are you?" es la fórmula correcta y estándar en inglés para preguntar la edad.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si un estudiante dice: "I am sleepy", ¿cómo se siente?',
          optionA: 'Enojado',
          optionB: 'Con sueño',
          optionC: 'Asustado',
          optionD: 'Con hambre',
          correctOption: 'B',
          explanation: '"Sleepy" significa con sueño o somnoliento.',
        },
      ],
    },

    // ==========================================
    // UNIT 10: Reading & Project: Spooky Spaghetti
    // ==========================================
    {
      title: 'Unit 10: Reading & Cooking Project - Spooky Spaghetti',
      orderIndex: 10,
      content: `### Unit 10: Reading & Project - "Spooky Spaghetti" (Comprensión Lectora y Proyecto)

#### 1. Proyecto Temático Escolar (29 de Octubre)
En esta unidad se practica la lectura de recetas en inglés, vocabulario de cocina y verbos en modo imperativo (instrucciones).

* **Objetivo:** Preparar 10 vasitos de degustación de "Spooky Spaghetti" para la fiesta escolar.

---

#### 2. Ingredientes (*Ingredients*)
* *Spaghetti pasta* (Pasta de espagueti)
* *Vegetables for stir-fry* (Verduras para el refrito)
* *Red tomato sauce* (Salsa de tomate roja)
* *Green vegetable sauce* (Salsa verde de vegetales)
* *Mozzarella cheese balls* (Bolitas de queso mozzarella)
* *Black olive slices* (Rodajas de aceituna negra)
* *5 oz plastic cups* (Vasitos plásticos de 5 onzas)
* *Plastic forks* (Tenedores plásticos)

---

#### 3. Pasos de la Receta (*Step-by-Step Instructions*)
1. **Cook the pasta:** Cocinar los fideos de espagueti en agua hirviendo.
2. **Stir-fry:** Realizar un refrito con las verduras picadas.
3. **Add the sauce:** Agregar la salsa de tomate o salsa verde a los fideos.
4. **Serve and decorate:** Servir en vasitos de 5 oz y decorar con bolitas de queso y aceitunas para formar "ojos monstruosos".`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'En la receta "Spooky Spaghetti", ¿con qué ingredientes se decoran los "ojos"?',
          optionA: 'Tomates y papas',
          optionB: 'Bolitas de queso mozzarella y rodajas de aceituna negra',
          optionC: 'Zanahorias y manzanas',
          optionD: 'Chocolate y galletas',
          correctOption: 'B',
          explanation: 'Se usan bolitas de queso mozzarella y aceitunas negras para simular ojos monstruosos.',
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué significa el verbo de cocina "Cook the pasta"?',
          optionA: 'Comprar la pasta',
          optionB: 'Cocinar la pasta',
          optionC: 'Cortar la pasta',
          optionD: 'Guardar la pasta',
          correctOption: 'B',
          explanation: '"Cook" significa cocinar.',
        },
      ],
    },
  ];

  // 6. Inserción de las lecciones y sus preguntas en la base de datos
  for (const item of curriculum) {
    const lesson = await prisma.lesson.create({
      data: {
        subjectId: subject.id,
        title: item.title,
        orderIndex: item.orderIndex,
        content: item.content,
      },
    });

    console.log(`📖 Unidad creada: [${lesson.orderIndex}] ${lesson.title}`);

    for (const q of item.questions) {
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
        },
      });
    }
  }

  console.log('🎉 ¡Inyección completada exitosamente! (Institución, Grado 8vo D, Materia y 10 Unidades creadas sin usuarios)');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la inyección:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
