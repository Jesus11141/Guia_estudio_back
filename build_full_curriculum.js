const fs = require('fs');
const path = require('path');

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
        questionText: '¿Cuál es la forma correcta para decir "una manzana" en inglés?',
        optionA: 'a apple',
        optionB: 'an apple',
        optionC: 'the apple',
        optionD: 'apple an',
        correctOption: 'B',
        explanation: '"Apple" inicia con sonido de vocal (/æ/), por lo que se debe usar "an".',
      },
      {
        questionText: '¿Por qué se dice "an hour" en lugar de "a hour"?',
        optionA: 'Porque hour es plural',
        optionB: 'Porque la letra H es muda y el sonido inicial es de vocal',
        optionC: 'Porque hour es un verbo',
        optionD: 'Porque siempre que hay H se usa an',
        correctOption: 'B',
        explanation: 'La letra "h" en "hour" no suena, por lo que la palabra inicia fonéticamente con sonido de vocal.',
      },
      {
        questionText: '¿Cuál es la opción correcta para "uniforme"?',
        optionA: 'an uniform',
        optionB: 'a uniform',
        optionC: 'a uniforms',
        optionD: 'an uniforms',
        correctOption: 'B',
        explanation: '"Uniform" inicia con sonido semiconsonante (/juː/), por lo que lleva el artículo "a".',
      },
      {
        questionText: 'Completa la oración: "I have ____ new eraser and ____ orange notebook."',
        optionA: 'a / an',
        optionB: 'an / a',
        optionC: 'a / a',
        optionD: 'an / an',
        correctOption: 'A',
        explanation: '"New" inicia con consonante (a new eraser) y "orange" inicia con vocal (an orange notebook).',
      },
      {
        questionText: '¿Cuál de las siguientes palabras requiere el artículo "A"?',
        optionA: 'elephant',
        optionB: 'cat',
        optionC: 'hour',
        optionD: 'ice cream',
        correctOption: 'B',
        explanation: '"Cat" inicia con sonido consonántico /k/, por lo que lleva "a cat".',
      },
      {
        questionText: '¿Cuál de las siguientes palabras requiere el artículo "AN"?',
        optionA: 'dog',
        optionB: 'table',
        optionC: 'eraser',
        optionD: 'pen',
        correctOption: 'C',
        explanation: '"Eraser" empieza con sonido vocálico, por lo que se dice "an eraser".',
      },
      {
        questionText: 'Selecciona la opción correcta: "He is ____ honest man."',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the one',
        optionD: 'two',
        correctOption: 'B',
        explanation: 'En "honest", la H es muda; la palabra empieza con sonido de vocal, por lo que lleva "an honest man".',
      },
      {
        questionText: 'Selecciona la opción correcta: "She studies at ____ university in Quito."',
        optionA: 'an',
        optionB: 'a',
        optionC: 'many',
        optionD: 'some',
        correctOption: 'B',
        explanation: '"University" empieza con sonido semiconsonante /juː/, requiriendo "a university".',
      },
      {
        questionText: 'Completa: "Take ____ umbrella because it is raining."',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the an',
        optionD: 'two',
        correctOption: 'B',
        explanation: '"Umbrella" tiene sonido vocálico corto /ʌ/, por lo que se usa "an umbrella".',
      },
      {
        questionText: '¿Cuál es la frase correcta para "una casa"?',
        optionA: 'an house',
        optionB: 'a house',
        optionC: 'house a',
        optionD: 'an houses',
        correctOption: 'B',
        explanation: 'En "house" la H no es muda, suena como una J suave (sonido consonántico), por eso se usa "a house".',
      },
      {
        questionText: 'Completa: "There is ____ pencil and ____ ink bottle on the desk."',
        optionA: 'a / an',
        optionB: 'an / a',
        optionC: 'a / a',
        optionD: 'an / an',
        correctOption: 'A',
        explanation: '"Pencil" lleva "a" (consonante) e "ink bottle" lleva "an" (vocal).',
      },
      {
        questionText: '¿Por qué decimos "a unicorn"?',
        optionA: 'Porque unicorn empieza con consonante escrita',
        optionB: 'Porque unicorn empieza con el sonido semiconsonántico /juː/',
        optionC: 'Porque unicorn es una palabra en plural',
        optionD: 'Porque todos los animales llevan a',
        correctOption: 'B',
        explanation: 'La letra U en "unicorn" suena como "iu" (/juː/), que es un sonido consonántico en inglés.',
      },
      {
        questionText: '¿Cuál oración es gramaticalmente correcta?',
        optionA: 'I see a airplane in the sky.',
        optionB: 'I see an airplane in the sky.',
        optionC: 'I see an plane in the sky.',
        optionD: 'I see a airplane flying.',
        correctOption: 'B',
        explanation: '"Airplane" inicia con vocal, por lo que exige el artículo "an".',
      },
      {
        questionText: 'Completa: "He is waiting for ____ bus."',
        optionA: 'an',
        optionB: 'a',
        optionC: 'one an',
        optionD: 'a an',
        correctOption: 'B',
        explanation: '"Bus" inicia con consonante /b/, por lo que se usa "a bus".',
      },
      {
        questionText: '¿Cuál de estos sustantivos va con "AN"?',
        optionA: 'Horse',
        optionB: 'Hospital',
        optionC: 'Orange',
        optionD: 'Hotel',
        correctOption: 'C',
        explanation: '"Orange" inicia con sonido vocal /ɒ/, requiriendo "an orange". En horse, hospital y hotel la H suena como consonante.',
      },
      {
        questionText: 'Elige la opción que completa la oración: "It was ____ honor to meet you."',
        optionA: 'a',
        optionB: 'an',
        optionC: 'the a',
        optionD: 'any',
        correctOption: 'B',
        explanation: '"Honor" tiene H muda, por lo que lleva "an honor".',
      },
      {
        questionText: 'Completa: "My sister wants ____ puppy and ____ kitten."',
        optionA: 'an / an',
        optionB: 'a / a',
        optionC: 'a / an',
        optionD: 'an / a',
        correctOption: 'B',
        explanation: 'Tanto "puppy" como "kitten" inician con sonido consonántico (/p/ y /k/), por lo que ambas llevan "a".',
      },
      {
        questionText: '¿Cuál frase tiene un error en el uso de los artículos?',
        optionA: 'She has a red dress.',
        optionB: 'He is an actor.',
        optionC: 'I bought a eraser yesterday.',
        optionD: 'We saw an elephant.',
        correctOption: 'C',
        explanation: '"A eraser" es incorrecto; debe ser "an eraser" porque eraser empieza con vocal.',
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
        questionText: '¿Cómo se dice "sacapuntas" en inglés?',
        optionA: 'Pencil case',
        optionB: 'Sharpener',
        optionC: 'Ruler',
        optionD: 'Paint brush',
        correctOption: 'B',
        explanation: '"Sharpener" significa sacapuntas.',
      },
      {
        questionText: 'Si guardas tus lápices y borradores, ¿en qué objeto los guardas?',
        optionA: 'Timetable',
        optionB: 'Pencil case',
        optionC: 'Ruler',
        optionD: 'Glue',
        correctOption: 'B',
        explanation: '"Pencil case" es la cartuchera donde se guardan los útiles pequeños.',
      },
      {
        questionText: '¿Cuál de los siguientes útiles escolares lleva el artículo "AN"?',
        optionA: 'Notebook',
        optionB: 'Ruler',
        optionC: 'Eraser',
        optionD: 'Pen',
        correctOption: 'C',
        explanation: '"Eraser" empieza con vocal, por lo que lleva "an eraser".',
      },
      {
        questionText: '¿Qué objeto usas para trazar líneas rectas?',
        optionA: 'A ruler',
        optionB: 'A paintbrush',
        optionC: 'A school bag',
        optionD: 'A laptop',
        correctOption: 'A',
        explanation: '"A ruler" (una regla) se usa para medir y trazar líneas rectas.',
      },
      {
        questionText: '¿Cómo se llama el objeto donde pegas recortes en tu cuaderno?',
        optionA: 'Eraser',
        optionB: 'Glue',
        optionC: 'Pencil',
        optionD: 'Timetable',
        correctOption: 'B',
        explanation: '"Glue" significa pegamento o goma.',
      },
      {
        questionText: '¿Qué es un "timetable"?',
        optionA: 'Un reloj de pulsera',
        optionB: 'Una mesa redonda',
        optionC: 'Un horario de clases',
        optionD: 'Un calendario anual',
        correctOption: 'C',
        explanation: '"Timetable" es el horario escolar con las materias por horas y días.',
      },
      {
        questionText: '¿Cuál útil utilizas para pintar en la clase de Arte?',
        optionA: 'A paintbrush',
        optionB: 'A sharpener',
        optionC: 'A notebook',
        optionD: 'A timetable',
        correctOption: 'A',
        explanation: '"A paintbrush" significa un pincel.',
      },
      {
        questionText: '¿Cómo se dice "mochila escolar" en inglés?',
        optionA: 'School book',
        optionB: 'School bag',
        optionC: 'School desk',
        optionD: 'School yard',
        correctOption: 'B',
        explanation: '"School bag" o "backpack" significa mochila escolar.',
      },
      {
        questionText: '¿Cuál es la diferencia entre "a pen" y "a pencil"?',
        optionA: 'Pen es borrador y pencil es lápiz',
        optionB: 'Pen es esfero/bolígrafo y pencil es lápiz de grafito',
        optionC: 'Pen es regla y pencil es pintura',
        optionD: 'Son exactamente lo mismo',
        correctOption: 'B',
        explanation: '"Pen" es bolígrafo/esfero (tinta) y "pencil" es lápiz (grafito).',
      },
      {
        questionText: 'Completa: "I write my homework in my ____."',
        optionA: 'notebook',
        optionB: 'sharpener',
        optionC: 'glue',
        optionD: 'scissors',
        correctOption: 'A',
        explanation: 'Escribimos las tareas en el cuaderno ("notebook").',
      },
      {
        questionText: '¿Qué utilizas cuando te equivocas escribiendo con lápiz?',
        optionA: 'A ruler',
        optionB: 'An eraser',
        optionC: 'A timetable',
        optionD: 'A laptop',
        correctOption: 'B',
        explanation: '"An eraser" es el borrador que elimina los trazos de lápiz.',
      },
      {
        questionText: 'Si tienes tu lápiz sin punta, ¿qué necesitas usar?',
        optionA: 'A paintbrush',
        optionB: 'A pencil case',
        optionC: 'A sharpener',
        optionD: 'A notebook',
        correctOption: 'C',
        explanation: 'El sacapuntas ("sharpener") sirve para sacar punta al lápiz.',
      },
      {
        questionText: 'Completa con el plural correcto: "I have three ____ in my pencil case."',
        optionA: 'pencils',
        optionB: 'pencil',
        optionC: 'a pencil',
        optionD: 'penciles',
        correctOption: 'A',
        explanation: 'El plural regular de pencil es "pencils".',
      },
      {
        questionText: '¿Qué dispositivo electrónico portátil usas para investigar?',
        optionA: 'A laptop',
        optionB: 'A ruler',
        optionC: 'A glue',
        optionD: 'A timetable',
        correctOption: 'A',
        explanation: '"Laptop" es la computadora portátil.',
      },
      {
        questionText: 'Traduce: "Ese es mi borrador."',
        optionA: 'That is my eraser.',
        optionB: 'This is my ruler.',
        optionC: 'That is my pencil case.',
        optionD: 'This is a notebook.',
        correctOption: 'A',
        explanation: '"That is my eraser" traduce "Ese es mi borrador".',
      },
      {
        questionText: '¿Cuál es el plural correcto de "notebook"?',
        optionA: 'notebooks',
        optionB: 'notebookes',
        optionC: 'a notebooks',
        optionD: 'notebookies',
        correctOption: 'A',
        explanation: 'El plural de notebook es simplemente "notebooks".',
      },
      {
        questionText: 'Completa: "My mother bought me a new ____ for all my books."',
        optionA: 'school bag',
        optionB: 'sharpener',
        optionC: 'pen',
        optionD: 'glue',
        correctOption: 'A',
        explanation: 'Guardamos y transportamos todos los libros en la mochila ("school bag").',
      },
      {
        questionText: '¿Qué útiles encuentras dentro de una "pencil case"?',
        optionA: 'Table, chair, board',
        optionB: 'Pen, pencil, eraser, sharpener',
        optionC: 'Car, bike, bus',
        optionD: 'Apple, orange, pizza',
        correctOption: 'B',
        explanation: 'En la cartuchera guardamos esferos, lápices, borrador y sacapuntas.',
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
        questionText: '¿Qué significan las siglas "P.E." en el horario escolar?',
        optionA: 'Public Education',
        optionB: 'Physical Education (Educación Física)',
        optionC: 'Personal English',
        optionD: 'Project Evaluation',
        correctOption: 'B',
        explanation: '"P.E." significa "Physical Education", la materia de deportes y actividad física.',
      },
      {
        questionText: '¿Cuál es la materia donde estudias los continentes, países y mapas?',
        optionA: 'Drama',
        optionB: 'Music',
        optionC: 'Geography',
        optionD: 'Math',
        correctOption: 'C',
        explanation: '"Geography" (Geografía) es la ciencia que estudia los mapas, países y relieves.',
      },
      {
        questionText: '¿Cómo respondes a "What is your favorite subject?"',
        optionA: 'I am 11 years old.',
        optionB: 'My favorite subject is Science.',
        optionC: 'I am from Ecuador.',
        optionD: 'Yes, I am happy.',
        correctOption: 'B',
        explanation: 'La respuesta correcta habla de la materia favorita ("My favorite subject is Science").',
      },
      {
        questionText: '¿Qué significan las siglas "I.T."?',
        optionA: 'International Team',
        optionB: 'Information Technology (Computación/Informática)',
        optionC: 'Interesting Topic',
        optionD: 'Internal Teaching',
        correctOption: 'B',
        explanation: '"I.T." significa "Information Technology", correspondiente a informática y computación.',
      },
      {
        questionText: '¿En qué materia resuelves sumas, restas y ecuaciones?',
        optionA: 'Music',
        optionB: 'Math',
        optionC: 'Art',
        optionD: 'History',
        correctOption: 'B',
        explanation: '"Math" (Matemáticas) es la asignatura donde se estudian los números y operaciones.',
      },
      {
        questionText: '¿En qué materia actúas y realizas obras de teatro?',
        optionA: 'Drama',
        optionB: 'Geography',
        optionC: 'Science',
        optionD: 'I.T.',
        correctOption: 'A',
        explanation: '"Drama" es la clase de teatro y artes escénicas.',
      },
      {
        questionText: '¿En qué materia estudias el pasado, los héroes y las fechas históricas?',
        optionA: 'P.E.',
        optionB: 'History',
        optionC: 'Art',
        optionD: 'Math',
        correctOption: 'B',
        explanation: '"History" (Historia) estudia los acontecimientos y personajes del pasado.',
      },
      {
        questionText: '¿En qué materia tocas instrumentos musicales y cantas?',
        optionA: 'Music',
        optionB: 'Science',
        optionC: 'Geography',
        optionD: 'Drama',
        correctOption: 'A',
        explanation: '"Music" es la clase de música.',
      },
      {
        questionText: '¿En qué materia haces experimentos con plantas y animales?',
        optionA: 'Science',
        optionB: 'Math',
        optionC: 'Art',
        optionD: 'English',
        correctOption: 'A',
        explanation: '"Science" (Ciencias Naturales) estudia los seres vivos y la naturaleza.',
      },
      {
        questionText: '¿En qué materia dibujas, pintas y usas acuarelas?',
        optionA: 'Art',
        optionB: 'History',
        optionC: 'P.E.',
        optionD: 'I.T.',
        correctOption: 'A',
        explanation: '"Art" es la clase de dibujo, pintura y artes plásticas.',
      },
      {
        questionText: '¿Qué preposición en inglés se utiliza antes de los días de la semana (Monday, Friday)?',
        optionA: 'in',
        optionB: 'on',
        optionC: 'at',
        optionD: 'to',
        correctOption: 'B',
        explanation: 'En inglés siempre se utiliza "on" con los días de la semana (ej: on Monday, on Friday).',
      },
      {
        questionText: 'Completa: "____ Friday, we have English class at 8:00 AM."',
        optionA: 'At',
        optionB: 'In',
        optionC: 'On',
        optionD: 'For',
        correctOption: 'C',
        explanation: 'Los días de la semana llevan la preposición "On".',
      },
      {
        questionText: '¿Cuál es el orden correcto de los primeros 3 días lectivos de la semana?',
        optionA: 'Monday, Tuesday, Wednesday',
        optionB: 'Tuesday, Sunday, Friday',
        optionC: 'Wednesday, Thursday, Monday',
        optionD: 'Saturday, Sunday, Monday',
        correctOption: 'A',
        explanation: 'Lunes, Martes y Miércoles son Monday, Tuesday, Wednesday.',
      },
      {
        questionText: '¿Cómo se dice "Jueves" en inglés?',
        optionA: 'Tuesday',
        optionB: 'Thursday',
        optionC: 'Wednesday',
        optionD: 'Friday',
        correctOption: 'B',
        explanation: '"Thursday" significa Jueves ("Tuesday" es martes).',
      },
      {
        questionText: 'Completa: "We play soccer in the ____ class."',
        optionA: 'P.E.',
        optionB: 'Math',
        optionC: 'History',
        optionD: 'Art',
        correctOption: 'A',
        explanation: 'En la clase de Educación Física (P.E.) se practican deportes como el fútbol.',
      },
      {
        questionText: 'Completa: "I like ____ because I love learning about countries and continents."',
        optionA: 'Music',
        optionB: 'Geography',
        optionC: 'Drama',
        optionD: 'Math',
        correctOption: 'B',
        explanation: 'La materia que estudia los países y continentes es Geography.',
      },
      {
        questionText: '¿Cuál es la traducción de "horario escolar"?',
        optionA: 'School timetable',
        optionB: 'School watch',
        optionC: 'School hour',
        optionD: 'School bell',
        correctOption: 'A',
        explanation: '"School timetable" significa horario escolar.',
      },
      {
        questionText: 'Si alguien dice "My favorite subject is English", ¿qué significa?',
        optionA: 'No me gusta el inglés',
        optionB: 'Mi materia favorita es inglés',
        optionC: 'Tengo examen de inglés hoy',
        optionD: 'El profesor de inglés es nuevo',
        correctOption: 'B',
        explanation: '"My favorite subject is English" significa "Mi materia favorita es inglés".',
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
        questionText: 'Completa la oración de la ficha: "She ____ a teacher."',
        optionA: 'am',
        optionB: 'are',
        optionC: 'is',
        optionD: 'be',
        correctOption: 'C',
        explanation: 'Con la tercera persona singular femenina (She) se usa "is".',
      },
      {
        questionText: '¿Cómo se dice en inglés: "Yo tengo 11 años"?',
        optionA: 'I have 11 years.',
        optionB: 'I am 11 years old.',
        optionC: 'I has 11 years old.',
        optionD: 'I are 11 years old.',
        correctOption: 'B',
        explanation: 'En inglés la edad se expresa obligatoriamente con el verbo TO BE ("I am 11 years old").',
      },
      {
        questionText: 'Completa la oración: "The pizza ____ delicious."',
        optionA: 'are',
        optionB: 'is',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'B',
        explanation: '"The pizza" es singular (equivale a "it"), por lo que lleva "is".',
      },
      {
        questionText: 'Completa: "We ____ good friends."',
        optionA: 'is',
        optionB: 'am',
        optionC: 'are',
        optionD: 'be',
        correctOption: 'C',
        explanation: 'Con el pronombre plural "We" se usa "are".',
      },
      {
        questionText: 'Completa la oración de la ficha: "He ____ sad today."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'not',
        correctOption: 'A',
        explanation: 'Con "He" se conjuga como "is".',
      },
      {
        questionText: 'Completa: "My dad ____ ill in bed."',
        optionA: 'are',
        optionB: 'am',
        optionC: 'is',
        optionD: 'be',
        correctOption: 'C',
        explanation: '"My dad" equivale a "He", por lo que lleva "is".',
      },
      {
        questionText: 'Completa: "They ____ old people."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'B',
        explanation: 'Con "They" la forma afirmativa es "are".',
      },
      {
        questionText: 'Completa la oración del taller: "He ____ a boxer."',
        optionA: 'am',
        optionB: 'are',
        optionC: 'is',
        optionD: 'be',
        correctOption: 'C',
        explanation: 'La profesión en singular con He lleva "is": "He is a boxer".',
      },
      {
        questionText: 'Completa: "You ____ very tall and strong."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'B',
        explanation: 'Con "You" siempre se utiliza "are".',
      },
      {
        questionText: 'Completa la ficha: "She ____ beautiful."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'has',
        correctOption: 'A',
        explanation: '"She is beautiful" es la forma correcta.',
      },
      {
        questionText: 'Completa: "My family ____ big."',
        optionA: 'are',
        optionB: 'is',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'B',
        explanation: '"My family" es un sustantivo colectivo en singular (equivale a "it"), por lo que lleva "is".',
      },
      {
        questionText: 'Completa: "I ____ a student at Louis Victor de Broglie."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'C',
        explanation: 'La primera persona "I" siempre se conjuga con "am".',
      },
      {
        questionText: 'Completa: "Tom ____ a barber."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'A',
        explanation: 'Tom es un nombre masculino singular (He), lleva "is".',
      },
      {
        questionText: 'Completa: "Jenny ____ a nurse at the hospital."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'A',
        explanation: 'Jenny (She) lleva "is".',
      },
      {
        questionText: 'Completa: "It ____ a kangaroo from Australia."',
        optionA: 'am',
        optionB: 'is',
        optionC: 'are',
        optionD: 'be',
        correctOption: 'B',
        explanation: 'El animal "It" se conjuga con "is".',
      },
      {
        questionText: 'Completa: "They ____ in love."',
        optionA: 'is',
        optionB: 'am',
        optionC: 'are',
        optionD: 'be',
        correctOption: 'C',
        explanation: 'Con el pronombre "They" se usa "are".',
      },
      {
        questionText: '¿Cuál es la contracción correcta de "I am"?',
        optionA: 'I\'m',
        optionB: 'Im',
        optionC: 'I\'is',
        optionD: 'I\'am',
        correctOption: 'A',
        explanation: '"I am" se contrae como "I\'m".',
      },
      {
        questionText: '¿Cuál es la contracción de "We are"?',
        optionA: 'We\'s',
        optionB: 'We\'re',
        optionC: 'Were',
        optionD: 'We\'m',
        correctOption: 'B',
        explanation: '"We are" se contrae como "We\'re".',
      },
      {
        questionText: 'Completa: "The dogs ____ in the garden."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'B',
        explanation: '"The dogs" es plural (they), por lo que se utiliza "are".',
      },
      {
        questionText: 'Completa: "Pablo ____ 12 years old."',
        optionA: 'is',
        optionB: 'are',
        optionC: 'has',
        optionD: 'have',
        correctOption: 'A',
        explanation: 'Para la edad de una persona se usa TO BE ("Pablo is 12 years old").',
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
        questionText: '¿Cuál es la contracción negativa correcta de "He is not"?',
        optionA: 'He amn\'t',
        optionB: 'He isn\'t',
        optionC: 'He aren\'t',
        optionD: 'He not is',
        correctOption: 'B',
        explanation: '"Is not" se contrae como "isn\'t".',
      },
      {
        questionText: 'Completa la oración del taller: "It ____ raining today."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not is',
        correctOption: 'A',
        explanation: 'Con "It" se utiliza "isn\'t" (is not).',
      },
      {
        questionText: 'Completa: "My shoes ____ new."',
        optionA: 'isn\'t',
        optionB: 'am not',
        optionC: 'aren\'t',
        optionD: 'not are',
        correctOption: 'C',
        explanation: '"My shoes" es un sujeto plural (zapatos), por lo que se usa "aren\'t".',
      },
      {
        questionText: 'Completa: "Mom ____ in the kitchen."',
        optionA: 'aren\'t',
        optionB: 'isn\'t',
        optionC: 'am not',
        optionD: 'not be',
        correctOption: 'B',
        explanation: 'Mom (She) lleva "isn\'t".',
      },
      {
        questionText: 'Completa: "We ____ at the park."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not is',
        correctOption: 'B',
        explanation: '"We" se niega con "aren\'t" (are not).',
      },
      {
        questionText: 'Completa: "I ____ tired today."',
        optionA: 'am not',
        optionB: 'isn\'t',
        optionC: 'aren\'t',
        optionD: 'not am',
        correctOption: 'A',
        explanation: 'Con "I" la forma negativa es "am not".',
      },
      {
        questionText: 'Completa: "He ____ my brother."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'be not',
        correctOption: 'A',
        explanation: 'Con "He" se usa "isn\'t".',
      },
      {
        questionText: 'Completa: "They ____ at home right now."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not are',
        correctOption: 'B',
        explanation: 'Con "They" la negación es "aren\'t".',
      },
      {
        questionText: 'Completa: "She ____ happy with the result."',
        optionA: 'aren\'t',
        optionB: 'isn\'t',
        optionC: 'am not',
        optionD: 'not is',
        correctOption: 'B',
        explanation: '"She" se niega con "isn\'t".',
      },
      {
        questionText: 'Completa: "The cat ____ on the bed."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not be',
        correctOption: 'A',
        explanation: '"The cat" es singular (it), por lo que lleva "isn\'t".',
      },
      {
        questionText: 'Completa: "You ____ a teacher, you are a student."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not are',
        correctOption: 'B',
        explanation: 'Con "You" la negación correcta es "aren\'t".',
      },
      {
        questionText: 'Completa: "The apples ____ green; they are red."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'be not',
        correctOption: 'B',
        explanation: '"The apples" es plural (they), lleva "aren\'t".',
      },
      {
        questionText: 'Completa: "We ____ late for class; we are on time."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not are',
        correctOption: 'B',
        explanation: 'Con "We" se usa "aren\'t".',
      },
      {
        questionText: 'Completa: "I ____ an adult; I am 11 years old."',
        optionA: 'am not',
        optionB: 'isn\'t',
        optionC: 'aren\'t',
        optionD: 'not am',
        correctOption: 'A',
        explanation: 'Con "I" la negación correcta es "am not".',
      },
      {
        questionText: 'Completa: "He ____ ready yet."',
        optionA: 'aren\'t',
        optionB: 'isn\'t',
        optionC: 'am not',
        optionD: 'not be',
        correctOption: 'B',
        explanation: 'Con "He" se usa "isn\'t".',
      },
      {
        questionText: 'Completa: "Dogs ____ unfriendly animals."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not is',
        correctOption: 'B',
        explanation: '"Dogs" es plural (they), lleva "aren\'t".',
      },
      {
        questionText: 'Completa: "The movie ____ interesting; it is boring."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not is',
        correctOption: 'A',
        explanation: '"The movie" es singular (it), lleva "isn\'t".',
      },
      {
        questionText: '¿Cuál oración es la correcta para decir "No somos de Colombia"?',
        optionA: 'We aren\'t from Colombia.',
        optionB: 'We isn\'t from Colombia.',
        optionC: 'We not are from Colombia.',
        optionD: 'We am not from Colombia.',
        correctOption: 'A',
        explanation: '"We aren\'t from Colombia" es la negación gramaticalmente correcta.',
      },
      {
        questionText: 'Traduce: "Él no está en la cocina."',
        optionA: 'He isn\'t in the kitchen.',
        optionB: 'He aren\'t in the kitchen.',
        optionC: 'He not in kitchen.',
        optionD: 'He is in kitchen not.',
        correctOption: 'A',
        explanation: '"He isn\'t in the kitchen" traduce exactamente "Él no está en la cocina".',
      },
      {
        questionText: 'Completa: "I ____ in Quito; I am in Cuenca."',
        optionA: 'isn\'t',
        optionB: 'aren\'t',
        optionC: 'am not',
        optionD: 'not be',
        correctOption: 'C',
        explanation: 'La negación para la primera persona singular "I" es "am not".',
      },
    ],
  },

  // ==========================================
  // UNIT 6: Verb TO BE - Interrogative Form
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
        questionText: 'Si te preguntan: "Are you happy?", ¿cuál es la respuesta afirmativa corta correcta?',
        optionA: 'Yes, you are.',
        optionB: 'Yes, I am.',
        optionC: 'Yes, I is.',
        optionD: 'Yes, it is.',
        correctOption: 'B',
        explanation: 'Al responder sobre ti mismo (tú), la respuesta afirmativa corta es "Yes, I am."',
      },
      {
        questionText: 'Completa la pregunta: "____ she at school?"',
        optionA: 'Are',
        optionB: 'Is',
        optionC: 'Am',
        optionD: 'Be',
        correctOption: 'B',
        explanation: 'Con el pronombre "she" la pregunta inicia con "Is".',
      },
      {
        questionText: '¿Cuál es la respuesta negativa corta para: "Is he ten years old?"',
        optionA: 'No, he isn\'t.',
        optionB: 'No, he not.',
        optionC: 'No, he aren\'t.',
        optionD: 'No, he don\'t.',
        correctOption: 'A',
        explanation: 'La respuesta negativa corta para He es "No, he isn\'t" o "No, he is not".',
      },
      {
        questionText: 'Completa: "____ they in the park?" -> "Yes, they ____."',
        optionA: 'Is / is',
        optionB: 'Are / are',
        optionC: 'Are / is',
        optionD: 'Am / are',
        correctOption: 'B',
        explanation: 'Con "they" se utiliza "Are" tanto en la pregunta como en la respuesta: "Are they...? Yes, they are."',
      },
      {
        questionText: 'Pregunta: "Is it sunny today?" -> Respuesta negativa:',
        optionA: 'No, it aren\'t.',
        optionB: 'No, it isn\'t.',
        optionC: 'No, it not.',
        optionD: 'No, they isn\'t.',
        correctOption: 'B',
        explanation: 'Con "it" la respuesta negativa es "No, it isn\'t".',
      },
      {
        questionText: 'Completa la pregunta: "____ we late for class?"',
        optionA: 'Am',
        optionB: 'Is',
        optionC: 'Are',
        optionD: 'Do',
        correctOption: 'C',
        explanation: 'Con "we" se pregunta usando "Are we late?".',
      },
      {
        questionText: 'Pregunta: "Is your mother a doctor?" -> Respuesta afirmativa:',
        optionA: 'Yes, she is.',
        optionB: 'Yes, he is.',
        optionC: 'Yes, you are.',
        optionD: 'Yes, she are.',
        correctOption: 'A',
        explanation: '"Your mother" es femenino (she), por lo que se responde "Yes, she is."',
      },
      {
        questionText: 'Pregunta: "Are the dogs big?" -> Respuesta negativa:',
        optionA: 'No, it isn\'t.',
        optionB: 'No, they aren\'t.',
        optionC: 'No, they not.',
        optionD: 'No, he isn\'t.',
        correctOption: 'B',
        explanation: '"The dogs" es plural (they), por lo que la respuesta es "No, they aren\'t."',
      },
      {
        questionText: 'Completa: "____ I your best friend?" -> "Yes, you ____."',
        optionA: 'Am / are',
        optionB: 'Is / is',
        optionC: 'Are / am',
        optionD: 'Am / is',
        correctOption: 'A',
        explanation: 'Pregunto con "Am I...?" y la otra persona responde con "Yes, you are."',
      },
      {
        questionText: 'Pregunta: "Is the book on the table?" -> Respuesta negativa:',
        optionA: 'No, they aren\'t.',
        optionB: 'No, it isn\'t.',
        optionC: 'No, he isn\'t.',
        optionD: 'No, it not.',
        correctOption: 'B',
        explanation: '"The book" es un objeto singular (it), respondiéndose "No, it isn\'t."',
      },
      {
        questionText: 'Completa: "____ your father at home?" -> "Yes, he ____."',
        optionA: 'Is / is',
        optionB: 'Are / are',
        optionC: 'Is / are',
        optionD: 'Are / is',
        correctOption: 'A',
        explanation: '"Your father" es masculino singular (he), por lo que se usa "Is": "Is your father...? Yes, he is."',
      },
      {
        questionText: 'Pregunta: "Are the children tired?" -> Respuesta negativa:',
        optionA: 'No, he isn\'t.',
        optionB: 'No, she isn\'t.',
        optionC: 'No, they aren\'t.',
        optionD: 'No, it isn\'t.',
        correctOption: 'C',
        explanation: '"The children" es plural (los niños = they), respondiéndose "No, they aren\'t."',
      },
      {
        questionText: 'Pregunta: "Is it a good movie?" -> Respuesta afirmativa:',
        optionA: 'Yes, they are.',
        optionB: 'Yes, it is.',
        optionC: 'Yes, she is.',
        optionD: 'Yes, he is.',
        correctOption: 'B',
        explanation: 'La película es una cosa (it), por lo que se responde "Yes, it is."',
      },
      {
        questionText: 'Pregunta: "Are you from Ecuador?" -> Respuesta negativa:',
        optionA: 'No, I am not.',
        optionB: 'No, you aren\'t.',
        optionC: 'No, he isn\'t.',
        optionD: 'No, they aren\'t.',
        correctOption: 'A',
        explanation: 'Si te preguntan a ti, respondes "No, I am not."',
      },
      {
        questionText: 'Pregunta: "Is she my teacher?" -> Respuesta afirmativa:',
        optionA: 'Yes, he is.',
        optionB: 'Yes, she is.',
        optionC: 'Yes, it is.',
        optionD: 'Yes, you are.',
        correctOption: 'B',
        explanation: 'Con "she" la respuesta afirmativa es "Yes, she is."',
      },
      {
        questionText: 'Pregunta: "Are they cousins?" -> Respuesta negativa:',
        optionA: 'No, we aren\'t.',
        optionB: 'No, they aren\'t.',
        optionC: 'No, he isn\'t.',
        optionD: 'No, it isn\'t.',
        correctOption: 'B',
        explanation: 'Con "they" la respuesta negativa es "No, they aren\'t."',
      },
      {
        questionText: 'Pregunta: "Is he in the kitchen?" -> Respuesta afirmativa:',
        optionA: 'Yes, he is.',
        optionB: 'Yes, she is.',
        optionC: 'Yes, it is.',
        optionD: 'Yes, they are.',
        correctOption: 'A',
        explanation: 'Con "he" la respuesta afirmativa es "Yes, he is."',
      },
      {
        questionText: 'Pregunta: "Are we ready for the test?" -> Respuesta afirmativa:',
        optionA: 'Yes, I am.',
        optionB: 'Yes, we are.',
        optionC: 'Yes, they are.',
        optionD: 'Yes, you are.',
        correctOption: 'B',
        explanation: 'Preguntando por nosotros (we), se responde "Yes, we are."',
      },
      {
        questionText: 'Pregunta: "Is the cat under the chair?" -> Respuesta negativa:',
        optionA: 'No, they aren\'t.',
        optionB: 'No, it isn\'t.',
        optionC: 'No, he isn\'t.',
        optionD: 'No, she isn\'t.',
        correctOption: 'B',
        explanation: 'El gato (cat) es animal singular (it), respondiéndose "No, it isn\'t."',
      },
      {
        questionText: 'Pregunta: "Are your friends busy?" -> Respuesta afirmativa:',
        optionA: 'Yes, they are.',
        optionB: 'Yes, he is.',
        optionC: 'Yes, she is.',
        optionD: 'Yes, we are.',
        correctOption: 'A',
        explanation: '"Your friends" es plural (they), respondiéndose "Yes, they are."',
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
   - Se utiliza para señalar un objeto que está al alcance de la mano o cerca:
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
        questionText: 'Si tienes un lápiz en tu mano, ¿cuál demostrativo debes usar?',
        optionA: 'That is my pencil.',
        optionB: 'This is my pencil.',
        optionC: 'Those is my pencil.',
        optionD: 'These is my pencil.',
        correctOption: 'B',
        explanation: '"This" se usa para objetos singulares que están cerca o al alcance de la mano.',
      },
      {
        questionText: 'Señalas un horario de clases que está en la pared al otro lado del aula. ¿Qué dices?',
        optionA: 'This is my timetable.',
        optionB: 'That is my timetable.',
        optionC: 'These is my timetable.',
        optionD: 'Those are my timetable.',
        correctOption: 'B',
        explanation: '"That" se utiliza para objetos que están distantes o lejos de quien habla.',
      },
      {
        questionText: '¿Cuál es el significado de "THIS"?',
        optionA: 'Aquel, aquella',
        optionB: 'Este, esta, esto (cerca)',
        optionC: 'Esos, esas',
        optionD: 'Aquellos, aquellas',
        correctOption: 'B',
        explanation: '"This" indica cercanía: este, esta o esto.',
      },
      {
        questionText: '¿Cuál es el significado de "THAT"?',
        optionA: 'Este, esta',
        optionB: 'Ese, esa, aquel, aquella (lejos)',
        optionC: 'Estos, estas',
        optionD: 'Aquí mismo',
        correctOption: 'B',
        explanation: '"That" indica distancia o lejanía: ese, esa, aquel, aquella.',
      },
      {
        questionText: 'Completa: "Look over there! ____ is an airplane in the sky."',
        optionA: 'This',
        optionB: 'That',
        optionC: 'These',
        optionD: 'This is',
        correctOption: 'B',
        explanation: 'El avión está lejos en el cielo ("over there"), por lo que se usa "That".',
      },
      {
        questionText: 'Sostienes tu cuaderno escolar y dices: "____ is my English notebook."',
        optionA: 'That',
        optionB: 'This',
        optionC: 'Those',
        optionD: 'They',
        correctOption: 'B',
        explanation: 'Al sostener el cuaderno en las manos (cerca), se utiliza "This".',
      },
      {
        questionText: '¿Cuál es el plural de "THIS"?',
        optionA: 'THATS',
        optionB: 'THESE',
        optionC: 'THOSE',
        optionD: 'THISES',
        correctOption: 'B',
        explanation: 'El plural de "this" (cerca) es "these" (estos, estas).',
      },
      {
        questionText: '¿Cuál es el plural de "THAT"?',
        optionA: 'THESE',
        optionB: 'THOSE',
        optionC: 'THATS',
        optionD: 'THEY',
        correctOption: 'B',
        explanation: 'El plural de "that" (lejos) es "those" (esos, esas, aquellos, aquellas).',
      },
      {
        questionText: 'Completa: "____ is my dog playing right here at my feet."',
        optionA: 'That',
        optionB: 'This',
        optionC: 'Those',
        optionD: 'There',
        correctOption: 'B',
        explanation: 'El perro está jugando aquí mismo junto a los pies (cerca), por lo que se usa "This".',
      },
      {
        questionText: 'Completa: "____ is the mountain on the horizon."',
        optionA: 'This',
        optionB: 'That',
        optionC: 'These',
        optionD: 'Those',
        correctOption: 'B',
        explanation: 'La montaña está en el horizonte lejano, por lo que se usa "That".',
      },
      {
        questionText: 'Traduce: "Esta es tu regla."',
        optionA: 'That is your ruler.',
        optionB: 'This is your ruler.',
        optionC: 'These are your ruler.',
        optionD: 'This is your glue.',
        correctOption: 'B',
        explanation: '"Esta es tu regla" traduce "This is your ruler".',
      },
      {
        questionText: 'Traduce: "Aquel es su cuaderno (de él)."',
        optionA: 'This is his notebook.',
        optionB: 'That is his notebook.',
        optionC: 'That is her notebook.',
        optionD: 'Those are his notebook.',
        correctOption: 'B',
        explanation: '"Aquel" es "That" y "de él" es "his": "That is his notebook".',
      },
      {
        questionText: 'Completa con la forma verbal correcta: "This ____ a delicious apple."',
        optionA: 'are',
        optionB: 'is',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'B',
        explanation: '"This" se refiere a un solo objeto singular, por lo que va con "is".',
      },
      {
        questionText: 'Completa: "That ____ our school building."',
        optionA: 'are',
        optionB: 'is',
        optionC: 'am',
        optionD: 'be',
        correctOption: 'B',
        explanation: '"That" es singular, por lo que se conjuga con "is".',
      },
      {
        questionText: 'Si tienes dos lápices en la mano (plural, cerca), ¿qué dices?',
        optionA: 'This is two pencils.',
        optionB: 'These are two pencils.',
        optionC: 'That is two pencils.',
        optionD: 'Those is two pencils.',
        correctOption: 'B',
        explanation: 'Para plural cercano se usa "These are".',
      },
      {
        questionText: 'Si señalas tres pájaros en un árbol lejano (plural, lejos), ¿qué dices?',
        optionA: 'These are birds.',
        optionB: 'Those are birds.',
        optionC: 'That is birds.',
        optionD: 'This is birds.',
        correctOption: 'B',
        explanation: 'Para plural lejano se usa "Those are".',
      },
      {
        questionText: '¿Cuál oración es correcta?',
        optionA: 'This is my friends.',
        optionB: 'That are my pen.',
        optionC: 'This is my new backpack.',
        optionD: 'These is a ruler.',
        correctOption: 'C',
        explanation: '"This is my new backpack" combina correctamente singular cercano con el verbo "is".',
      },
      {
        questionText: 'Completa: "Is ____ your pencil over there on the floor?"',
        optionA: 'this',
        optionB: 'that',
        optionC: 'these',
        optionD: 'they',
        correctOption: 'B',
        explanation: '"Over there" indica lejanía, por lo que la pregunta correcta usa "that".',
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
        questionText: 'Si el libro pertenece a Carlos (él), ¿cómo dices "su libro"?',
        optionA: 'Her book',
        optionB: 'His book',
        optionC: 'My book',
        optionD: 'Their book',
        correctOption: 'B',
        explanation: '"His" es el adjetivo posesivo para indicar posesión de un hombre o chico ("de él").',
      },
      {
        questionText: '¿Cuál es el posesivo correspondiente al pronombre "We" (Nosotros)?',
        optionA: 'Our',
        optionB: 'Their',
        optionC: 'Your',
        optionD: 'Its',
        correctOption: 'A',
        explanation: '"Our" significa "nuestro/a" o "nuestros/as" y corresponde a "We".',
      },
      {
        questionText: 'Completa: "Maria is studying with ____ best friend."',
        optionA: 'his',
        optionB: 'her',
        optionC: 'its',
        optionD: 'my',
        correctOption: 'B',
        explanation: 'Maria es mujer (she), por lo que su posesivo correspondiente es "her".',
      },
      {
        questionText: '¿Cuál es el posesivo correspondiente a "They" (Ellos)?',
        optionA: 'Their',
        optionB: 'Our',
        optionC: 'Her',
        optionD: 'Your',
        correctOption: 'A',
        explanation: '"Their" significa "su / sus (de ellos)".',
      },
      {
        questionText: 'Completa: "I love ____ new shoes."',
        optionA: 'my',
        optionB: 'his',
        optionC: 'her',
        optionD: 'its',
        correctOption: 'A',
        explanation: 'Al hablar de mí mismo (I), el posesivo es "my" (mis zapatos).',
      },
      {
        questionText: 'Completa: "The dog is eating ____ food."',
        optionA: 'its',
        optionB: 'it\'s',
        optionC: 'his',
        optionD: 'her',
        correctOption: 'A',
        explanation: 'Para animales u objetos, el posesivo es "its" (sin apóstrofe).',
      },
      {
        questionText: '¿Cuál es la diferencia entre "its" e "it\'s"?',
        optionA: 'Its es posesivo (su) e It\'s es contracción de It is (eso es)',
        optionB: 'Son idénticos y se usan igual',
        optionC: 'Its es plural e It\'s es singular',
        optionD: 'It\'s es posesivo e Its es verbo',
        correctOption: 'A',
        explanation: '"Its" es el adjetivo posesivo (su cola, su comida), mientras que "it\'s" es la contracción de "it is" (es/está).',
      },
      {
        questionText: 'Completa: "You must do ____ homework before playing."',
        optionA: 'your',
        optionB: 'his',
        optionC: 'their',
        optionD: 'our',
        correctOption: 'A',
        explanation: 'Con el pronombre "You", el adjetivo posesivo es "your" (tu tarea).',
      },
      {
        questionText: 'Completa: "We are proud of ____ school."',
        optionA: 'their',
        optionB: 'our',
        optionC: 'your',
        optionD: 'her',
        correctOption: 'B',
        explanation: '"We" corresponde al posesivo "our" (nuestra escuela).',
      },
      {
        questionText: 'Traduce: "Ese es su auto (de ellos)."',
        optionA: 'That is our car.',
        optionB: 'That is their car.',
        optionC: 'That is your car.',
        optionD: 'That is his car.',
        correctOption: 'B',
        explanation: '"De ellos" se traduce como "their": "That is their car".',
      },
      {
        questionText: 'Traduce: "Esta es su mochila (de ella)."',
        optionA: 'This is his school bag.',
        optionB: 'This is her school bag.',
        optionC: 'This is their school bag.',
        optionD: 'This is our school bag.',
        correctOption: 'B',
        explanation: '"De ella" se traduce como "her": "This is her school bag".',
      },
      {
        questionText: 'Completa: "Pedro lost ____ pencil case yesterday."',
        optionA: 'her',
        optionB: 'his',
        optionC: 'its',
        optionD: 'our',
        correctOption: 'B',
        explanation: 'Pedro es masculino (he), por lo que el posesivo es "his".',
      },
      {
        questionText: 'Completa: "Laura and Sofia are doing ____ project."',
        optionA: 'her',
        optionB: 'their',
        optionC: 'his',
        optionD: 'our',
        correctOption: 'B',
        explanation: 'Laura y Sofia son ellas (they), por lo que su posesivo es "their".',
      },
      {
        questionText: '¿Cuál oración usa correctamente el adjetivo posesivo?',
        optionA: 'She is riding his bicycle because her is broken.',
        optionB: 'He is washing her car because his is clean.',
        optionC: 'This is my book and that is your pen.',
        optionD: 'We are in they house.',
        correctOption: 'C',
        explanation: '"This is my book and that is your pen" usa correctamente "my" y "your".',
      },
      {
        questionText: 'Completa: "The cat licked ____ paws."',
        optionA: 'her',
        optionB: 'its',
        optionC: 'his',
        optionD: 'their',
        correctOption: 'B',
        explanation: 'Para la mascota o animal se utiliza el posesivo neutro "its".',
      },
      {
        questionText: 'Completa: "Welcome to ____ house! (Dicho por los dueños de casa a sus invitados)"',
        optionA: 'our',
        optionB: 'their',
        optionC: 'her',
        optionD: 'its',
        correctOption: 'A',
        explanation: '"Our house" significa "nuestra casa".',
      },
      {
        questionText: 'Completa: "What is ____ name? -> My name is Alisson."',
        optionA: 'his',
        optionB: 'your',
        optionC: 'her',
        optionD: 'our',
        correctOption: 'B',
        explanation: 'Para preguntar el nombre de la persona con quien hablas usas "What is your name?".',
      },
      {
        questionText: 'Elige la opción correcta para completar: "David and I love ____ English class."',
        optionA: 'their',
        optionB: 'our',
        optionC: 'your',
        optionD: 'his',
        correctOption: 'B',
        explanation: '"David and I" equivale a "We" (nosotros), por lo que el posesivo es "our".',
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
        questionText: 'Si alguien te pregunta: "Where are you from?", ¿qué información te está pidiendo?',
        optionA: 'Tu nombre',
        optionB: 'Tu país o ciudad de origen',
        optionC: 'Tu edad',
        optionD: 'Tu materia favorita',
        correctOption: 'B',
        explanation: '"Where are you from?" pregunta por el lugar o país de origen ("I am from Ecuador").',
      },
      {
        questionText: '¿Cuál es la pregunta correcta para saber la edad de una persona?',
        optionA: 'How years do you have?',
        optionB: 'How old are you?',
        optionC: 'What is your age old?',
        optionD: 'Where are you old?',
        correctOption: 'B',
        explanation: '"How old are you?" es la fórmula correcta y estándar en inglés para preguntar la edad.',
      },
      {
        questionText: 'Si un estudiante dice: "I am sleepy", ¿cómo se siente?',
        optionA: 'Enojado',
        optionB: 'Con sueño',
        optionC: 'Asustado',
        optionD: 'Con hambre',
        correctOption: 'B',
        explanation: '"Sleepy" significa con sueño o somnoliento.',
      },
      {
        questionText: 'Completa la pregunta: "____ is your name?" -> "My name is Dastan."',
        optionA: 'Where',
        optionB: 'What',
        optionC: 'How old',
        optionD: 'Who',
        correctOption: 'B',
        explanation: '"What is your name?" es la forma estándar de preguntar el nombre.',
      },
      {
        questionText: 'Si alguien te pregunta: "How are you?", ¿cuál es una respuesta adecuada?',
        optionA: 'I am 12 years old.',
        optionB: 'I am from Ecuador.',
        optionC: 'I am fine, thank you!',
        optionD: 'My name is Carlos.',
        correctOption: 'C',
        explanation: '"How are you?" pregunta por tu estado de ánimo o salud ("I am fine, thank you!").',
      },
      {
        questionText: '¿Qué significa la palabra "tired"?',
        optionA: 'Feliz',
        optionB: 'Cansado/a',
        optionC: 'Enojado/a',
        optionD: 'Hambriento/a',
        correctOption: 'B',
        explanation: '"Tired" significa cansado o fatigado.',
      },
      {
        questionText: '¿Qué significa la palabra "hungry"?',
        optionA: 'Con hambre / hambriento',
        optionB: 'Con sed',
        optionC: 'Con sueño',
        optionD: 'Aburrido',
        correctOption: 'A',
        explanation: '"Hungry" significa tener hambre.',
      },
      {
        questionText: 'Completa: "____ is your English teacher?" -> "Mr. Wilson."',
        optionA: 'Who',
        optionB: 'What',
        optionC: 'Where',
        optionD: 'How',
        correctOption: 'A',
        explanation: '"Who" significa ¿Quién?, y se usa para preguntar por personas.',
      },
      {
        questionText: 'Completa: "____ is the library?" -> "It is on the second floor."',
        optionA: 'What',
        optionB: 'Where',
        optionC: 'How old',
        optionD: 'When',
        correctOption: 'B',
        explanation: '"Where" pregunta por un lugar o ubicación (¿Dónde?).',
      },
      {
        questionText: 'Si te preguntan "How old is Pablo?", y tiene 12 años, ¿cómo respondes?',
        optionA: 'He has 12 years old.',
        optionB: 'He is 12 years old.',
        optionC: 'Pablo have 12 years.',
        optionD: 'He old 12 years.',
        correctOption: 'B',
        explanation: 'En inglés la edad siempre se responde con TO BE ("He is 12 years old").',
      },
      {
        questionText: 'Completa la pregunta: "____ are you sad?" -> "Because I lost my pencil case."',
        optionA: 'Why',
        optionB: 'Where',
        optionC: 'What',
        optionD: 'Who',
        correctOption: 'A',
        explanation: '"Why" significa ¿Por qué? y se responde con "Because...".',
      },
      {
        questionText: '¿Cuál WH- Question se utiliza para preguntar por el tiempo o la hora?',
        optionA: 'When (¿Cuándo?)',
        optionB: 'Where (¿Dónde?)',
        optionC: 'Who (¿Quién?)',
        optionD: 'Why (¿Por qué?)',
        correctOption: 'A',
        explanation: '"When" significa ¿Cuándo? y pregunta por tiempo o fechas.',
      },
      {
        questionText: 'Completa: "____ is your birthday?" -> "It is on May 15th."',
        optionA: 'Where',
        optionB: 'When',
        optionC: 'Who',
        optionD: 'How',
        correctOption: 'B',
        explanation: '"When is your birthday?" pregunta por la fecha de cumpleaños.',
      },
      {
        questionText: 'Elige la respuesta correcta a: "Where is the cat?"',
        optionA: 'It is black.',
        optionB: 'It is under the chair.',
        optionC: 'It is two years old.',
        optionD: 'Yes, it is.',
        correctOption: 'B',
        explanation: '"Where" pide una ubicación: "It is under the chair" (debajo de la silla).',
      },
      {
        questionText: '¿Cómo se pregunta en inglés: "¿De dónde es ella?"?',
        optionA: 'Where is she from?',
        optionB: 'Where she is from?',
        optionC: 'What is she from?',
        optionD: 'How is she from?',
        correctOption: 'A',
        explanation: 'La estructura interrogativa es "Where is she from?".',
      },
      {
        questionText: 'Si alguien dice "I am from Ecuador", ¿cuál es su nacionalidad?',
        optionA: 'Colombian',
        optionB: 'Ecuadorian',
        optionC: 'Mexican',
        optionD: 'American',
        correctOption: 'B',
        explanation: 'Las personas que nacieron en Ecuador son "Ecuadorian".',
      },
      {
        questionText: 'Completa la pregunta: "____ old are your parents?"',
        optionA: 'What',
        optionB: 'How',
        optionC: 'Where',
        optionD: 'Who',
        correctOption: 'B',
        explanation: '"How old" es la combinación correcta para preguntar edad.',
      },
      {
        questionText: '¿Cuál es la respuesta adecuada para "What is your favorite color?"?',
        optionA: 'I am blue.',
        optionB: 'My favorite color is blue.',
        optionC: 'Yes, I like blue.',
        optionD: 'Blue is from Ecuador.',
        correctOption: 'B',
        explanation: '"My favorite color is blue" responde directamente a la pregunta.',
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
        questionText: 'En la receta "Spooky Spaghetti", ¿con qué ingredientes se decoran los "ojos"?',
        optionA: 'Tomates y papas',
        optionB: 'Bolitas de queso mozzarella y rodajas de aceituna negra',
        optionC: 'Zanahorias y manzanas',
        optionD: 'Chocolate y galletas',
        correctOption: 'B',
        explanation: 'Se usan bolitas de queso mozzarella y aceitunas negras para simular ojos monstruosos.',
      },
      {
        questionText: '¿Qué significa el verbo de cocina "Cook the pasta"?',
        optionA: 'Comprar la pasta',
        optionB: 'Cocinar la pasta',
        optionC: 'Cortar la pasta',
        optionD: 'Guardar la pasta',
        correctOption: 'B',
        explanation: '"Cook" significa cocinar.',
      },
      {
        questionText: '¿Qué significa el verbo "Stir-fry"?',
        optionA: 'Congelar',
        optionB: 'Realizar un refrito / sofreír verduras',
        optionC: 'Hornear pan',
        optionD: 'Lavar los platos',
        correctOption: 'B',
        explanation: '"Stir-fry" significa saltear o sofreír verduras rápidamente en una sartén.',
      },
      {
        questionText: '¿Qué significa "Add the sauce"?',
        optionA: 'Botar la salsa',
        optionB: 'Agregar o añadir la salsa',
        optionC: 'Comprar salsa',
        optionD: 'Revisar la salsa',
        correctOption: 'B',
        explanation: '"Add" es el verbo imperativo que significa agregar o añadir.',
      },
      {
        questionText: '¿De qué capacidad deben ser los vasitos plásticos para la degustación?',
        optionA: '20 onzas',
        optionB: '5 onzas (5 oz plastic cups)',
        optionC: '1 litro',
        optionD: '50 mililitros',
        correctOption: 'B',
        explanation: 'La receta indica "5 oz plastic cups" (vasitos de 5 onzas).',
      },
      {
        questionText: '¿Cuántos vasos de degustación se debían preparar según la anotación del cuaderno?',
        optionA: '100 vasos',
        optionB: '10 vasos de degustación',
        optionC: '2 vasos',
        optionD: '50 vasos',
        correctOption: 'B',
        explanation: 'En el cuaderno dice claramente "10 vasos de degustación".',
      },
      {
        questionText: '¿Para qué fecha estaba programada la actividad escolar de Spooky Spaghetti?',
        optionA: '1 de Enero',
        optionB: '29 de Octubre',
        optionC: '25 de Diciembre',
        optionD: '10 de Agosto',
        correctOption: 'B',
        explanation: 'En la parte superior de la página del cuaderno dice "29 de octubre".',
      },
      {
        questionText: '¿Qué utensilios plásticos se reparten a los comensales?',
        optionA: 'Plastic spoons',
        optionB: 'Plastic forks (tenedores plásticos)',
        optionC: 'Plastic knives',
        optionD: 'Glass cups',
        correctOption: 'B',
        explanation: 'La receta lista "plastic forks" (tenedores de plástico) para comer los espaguetis.',
      },
      {
        questionText: '¿Qué dos opciones de salsas se ofrecen en la receta?',
        optionA: 'Salsa dulce y salsa agria',
        optionB: 'Red tomato sauce o Green vegetable sauce',
        optionC: 'Mayonesa y mostaza',
        optionD: 'Salsa de soya y picante',
        correctOption: 'B',
        explanation: 'La receta ofrece salsa roja de tomate ("Red tomato sauce") o salsa verde ("Green vegetable sauce").',
      },
      {
        questionText: '¿Qué significa la palabra "Spooky" en inglés?',
        optionA: 'Rápido',
        optionB: 'Tétrico / Espeluznante (temática de Halloween)',
        optionC: 'Picante',
        optionD: 'Frío',
        correctOption: 'B',
        explanation: '"Spooky" significa espeluznante o fantasmal, común en la época de Halloween.',
      },
      {
        questionText: '¿Cuál es el primer paso de la preparación?',
        optionA: 'Servir en vasitos',
        optionB: 'Cocinar la pasta (Cook the pasta)',
        optionC: 'Poner las aceitunas',
        optionD: 'Comer con el tenedor',
        correctOption: 'B',
        explanation: 'El paso 1 es "Cook the pasta" (cocinar la pasta).',
      },
      {
        questionText: '¿Qué parte del "monstruo" representan las bolitas de mozzarella y rodajas de aceituna?',
        optionA: 'Los dientes',
        optionB: 'Los ojos (eyes)',
        optionC: 'El cabello',
        optionD: 'Las manos',
        correctOption: 'B',
        explanation: 'La receta dice "decorar con ojos" (mozzarella balls with black olive slices).',
      },
      {
        questionText: 'Traduce al inglés: "Servir en vasitos y decorar."',
        optionA: 'Cook and eat.',
        optionB: 'Serve in cups and decorate.',
        optionC: 'Buy cups and clean.',
        optionD: 'Mix sauces and boil.',
        correctOption: 'B',
        explanation: '"Serve in cups and decorate" es la traducción exacta de la instrucción.',
      },
      {
        questionText: '¿Cuál es la traducción de "Black olive slices"?',
        optionA: 'Aceitunas enteras verdes',
        optionB: 'Rodajas de aceituna negra',
        optionC: 'Pimienta negra molida',
        optionD: 'Uvas negras picadas',
        correctOption: 'B',
        explanation: '"Black olive slices" significa rodajas de aceituna negra.',
      },
      {
        questionText: '¿Qué tipo de texto es "Spooky Spaghetti"?',
        optionA: 'Un poema de amor',
        optionB: 'Una receta de cocina instructiva',
        optionC: 'Una noticia de periódico',
        optionD: 'Una biografía histórica',
        correctOption: 'B',
        explanation: 'Es un texto instructivo / receta gastronómica escolar.',
      },
      {
        questionText: 'Completa: "____ the vegetables in a hot pan."',
        optionA: 'Sleep',
        optionB: 'Stir-fry',
        optionC: 'Drink',
        optionD: 'Sing',
        correctOption: 'B',
        explanation: '"Stir-fry the vegetables" (saltea/sofríe los vegetales en una sartén caliente).',
      },
      {
        questionText: '¿Qué forma verbal predomina en las instrucciones de una receta en inglés?',
        optionA: 'Modo Imperativo (Cook, Add, Serve)',
        optionB: 'Pasado continuo',
        optionC: 'Futuro con will',
        optionD: 'Condicional',
        correctOption: 'A',
        explanation: 'Las recetas usan verbos en modo imperativo para dar órdenes o instrucciones directas.',
      },
      {
        questionText: '¿Por qué esta actividad de lectura y cocina es útil para aprender inglés?',
        optionA: 'Porque no enseña palabras nuevas',
        optionB: 'Porque aplica vocabulario de comida, medidas y verbos de acción en un contexto real',
        optionC: 'Porque solo se habla en español',
        optionD: 'Porque no tiene ejercicios',
        correctOption: 'B',
        explanation: 'Conecta vocabulario cotidiano de alimentos, cantidades y verbos imperativos con la práctica real.',
      },
    ],
  },
];

// Generar código TypeScript para seed-8vod-broglie.ts
const fileHeader = `import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🏛️ Creando Institución, Curso 8vo D y Guía de Estudio de Inglés con Banco Ampliado (180+ Preguntas)...');

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
    console.log(\`🧹 Limpiando \${existingLessons.length} lecciones previas para actualizar con la nueva guía...\`);
    await prisma.lesson.deleteMany({
      where: { subjectId: subject.id },
    });
  }

  // 5. Contenido exhaustivo de la Guía de Estudio con 180+ preguntas
  const curriculum = ${JSON.stringify(curriculum, null, 2)};

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

    console.log(\`📖 Unidad creada: [\${lesson.orderIndex}] \${lesson.title} con \${item.questions.length} preguntas\`);

    for (const q of item.questions) {
      await prisma.question.create({
        data: {
          lessonId: lesson.id,
          type: 'MULTIPLE_CHOICE',
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

  // 7. Crear o actualizar el usuario exclusivo para Dastan Hidalgo
  const hashedPassword = await bcrypt.hash('123456', 10);
  const targetEmail = 'dastanh11141@gmail.com'.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({
    where: { email: targetEmail },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: targetEmail,
        password: hashedPassword,
        name: 'Dastan Hidalgo',
        role: Role.STUDENT,
        institutionId: institution.id,
        gradeId: grade.id,
        hasGames: true,
        stars: 50,
      },
    });
    console.log('👤 Usuario creado con éxito: Dastan Hidalgo (dastanh11141@gmail.com) [Clave: 123456]');
  } else {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name: 'Dastan Hidalgo',
        password: hashedPassword,
        institutionId: institution.id,
        gradeId: grade.id,
        hasGames: true,
      },
    });
    console.log('ℹ️ Usuario Dastan Hidalgo actualizado (dastanh11141@gmail.com) [Clave: 123456]');
  }

  console.log('🎉 ¡Inyección completada exitosamente! 10 Unidades con más de 180 preguntas en total.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la inyección:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

fs.writeFileSync(path.join(__dirname, 'seed-8vod-broglie.ts'), fileHeader, 'utf8');
console.log('✅ Archivo seed-8vod-broglie.ts generado exitosamente.');
