import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando inyección del Curso Completo y Profesional de INGLÉS A1.1...');

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

  // 3. Currículo Completo de 8 Unidades Temáticas con Banco Amplio de Preguntas
  const fullCurriculum = [
    // ==========================================
    // UNIT 1: Greetings, Alphabet & Personal Info
    // ==========================================
    {
      title: 'Unit 1: Greetings, Alphabet & Personal Info',
      orderIndex: 1,
      content: `### Unit 1: Greetings, Alphabet & Personal Info (Saludos, Abecedario e Información Personal)

#### 1. Formal and Informal Greetings (Saludos Formales e Informales)
* **Formal:**
  - *Good morning* (06:00 - 12:00) = Buenos días
  - *Good afternoon* (12:00 - 18:00) = Buenas tardes
  - *Good evening* (18:00 en adelante, al llegar a un lugar) = Buenas noches
* **Informal:**
  - *Hello! / Hi! / Hey!* = ¡Hola!
  - *How are you?* = ¿Cómo estás? -> *I am fine, thank you! / Very well, thanks!*
  - *What's up?* = ¿Qué tal? / ¿Qué pasa? (muy informal).
* **Farewells (Despedidas):**
  - *Goodbye! / Bye!* = ¡Adiós!
  - *See you later!* = ¡Hasta luego! / Nos vemos luego.
  - *See you tomorrow!* = ¡Hasta mañana!
  - *Good night!* = Buenas noches (¡Únicamente al despedirse para irse o ir a dormir!).

#### 2. The English Alphabet & Spelling (Deletreo y Nombres)
* El abecedario inglés cuenta con 26 letras. 
* Vocales clave: **A** (/eɪ/), **E** (/iː/), **I** (/aɪ/), **O** (/oʊ/), **U** (/juː/).
* Preguntar por deletreo:
  - *How do you spell your first name?* -> *J - O - H - N*.
  - *How do you spell your last name / surname?* -> *P - E - R - E - Z*.

#### 3. Personal Information (Datos Personales)
* *What is your full name?* -> *My full name is Carlos Andrade.*
* *What is your phone number?* -> *My phone number is 099-123-4567.* (En inglés los números de teléfono se leen dígito por dígito; el cero se suele decir "oh" o "zero").
* *What is your email address?* -> El signo **@** se pronuncia **at** y el punto **.** se pronuncia **dot** (*carlos at gmail dot com*).
* *Where are you from?* -> *I am from Ecuador.* (País).
* *What nationality are you?* -> *I am Ecuadorian.* (Nacionalidad).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Llegas a un restaurante a las 7:00 PM. ¿Cuál es el saludo formal correcto al entrar?',
          optionA: 'Good evening',
          optionB: 'Good night',
          optionC: 'Good afternoon',
          optionD: 'Goodbye',
          correctOption: 'A',
          explanation: '"Good evening" es el saludo formal que se usa al llegar a partir de las 6:00 PM. "Good night" solo se utiliza para despedirse al salir o ir a dormir.',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si alguien te pregunta: "Where are you from?", ¿cuál es la respuesta gramaticalmente correcta?',
          optionA: 'I am from Ecuador.',
          optionB: 'My name is Carlos.',
          optionC: 'I have 18 years old.',
          optionD: 'I live with my parents.',
          correctOption: 'A',
          explanation: '"Where are you from?" indaga el origen geográfico. La estructura es: Sujeto + am/is/are + from + País/Ciudad.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena las palabras para presentarte con tu nombre!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'La fórmula estándar de presentación es: "My name is [Nombre]".',
          metadata: {
            targetSentence: 'My name is Carlos',
            words: ['My', 'name', 'is', 'Carlos'],
            distractors: ['are', 'from', 'you']
          }
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena las palabras para expresar tu procedencia!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Pronombre (I) + Verbo To Be (am) + Preposición (from) + País (Ecuador).',
          metadata: {
            targetSentence: 'I am from Ecuador',
            words: ['I', 'am', 'from', 'Ecuador'],
            distractors: ['is', 'live', 'my']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se lee en voz alta el correo "ana@gmail.com" en inglés?',
          optionA: 'ana at gmail dot com',
          optionB: 'ana arroba gmail punto com',
          optionC: 'ana point gmail at com',
          optionD: 'ana slash gmail dot com',
          correctOption: 'A',
          explanation: 'En direcciones de correo electrónico en inglés, el símbolo "@" se pronuncia "at" y el punto "." se pronuncia "dot".',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo respondes de manera educada cuando alguien te dice: "Nice to meet you"?',
          optionA: 'Nice to meet you too',
          optionB: 'Good night, sir',
          optionC: 'Thank you not',
          optionD: 'Where are you from',
          correctOption: 'A',
          explanation: '"Nice to meet you too" significa "Mucho gusto en conocerte también". "Too" al final significa "también".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase de cortesía al conocer a alguien!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'La frase completa es: "Nice to meet you".',
          metadata: {
            targetSentence: 'Nice to meet you',
            words: ['Nice', 'to', 'meet', 'you'],
            distractors: ['too', 'am', 'are']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si la pregunta es: "What is your nationality?", ¿cuál es la opción correcta?',
          optionA: 'I am Colombian',
          optionB: 'I am Colombia',
          optionC: 'I from Colombia',
          optionD: 'My nationality Colombia',
          correctOption: 'A',
          explanation: 'Para nacionalidad se usa el adjetivo de nacionalidad: "I am Colombian" (o "I am Ecuadorian"), no el nombre del país.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la pregunta para saber el número telefónico de alguien!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Pregunta: "What is your phone number?".',
          metadata: {
            targetSentence: 'What is your phone number',
            words: ['What', 'is', 'your', 'phone', 'number'],
            distractors: ['are', 'name', 'you']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la forma correcta de despedirse informalmente diciendo "Hasta luego"?',
          optionA: 'See you later',
          optionB: 'Welcome back',
          optionC: 'Nice to meet you',
          optionD: 'Good evening',
          correctOption: 'A',
          explanation: '"See you later" es una de las expresiones más comunes y naturales para decir "Hasta luego" o "Nos vemos después".',
          metadata: {}
        }
      ]
    },

    // ==========================================
    // UNIT 2: The Verb "TO BE", Pronouns & Numbers
    // ==========================================
    {
      title: 'Unit 2: The Verb "TO BE", Pronouns & Numbers',
      orderIndex: 2,
      content: `### Unit 2: The Verb "TO BE", Subject Pronouns & Numbers (El Verbo Ser/Estar y Números)

#### 1. Pronombres Personales Sujeto (Subject Pronouns)
* **I** = Yo
* **You** = Tú / Usted / Ustedes
* **He** = Él (persona de género masculino)
* **She** = Ella (persona de género femenino)
* **It** = Eso / Ello (animal u objeto singular)
* **We** = Nosotros / Nosotras
* **They** = Ellos / Ellas (aplica para personas, animales u objetos en plural)

#### 2. Conjugación Completa del Verbo "To Be"
* **Forma Afirmativa:**
  - I **am** (contracción: *I'm*) -> *I am a student.*
  - You **are** (*You're*) -> *You are my friend.*
  - He **is** (*He's*) -> *He is an engineer.*
  - She **is** (*She's*) -> *She is a doctor.*
  - It **is** (*It's*) -> *It is a big dog.*
  - We **are** (*We're*) -> *We are in class.*
  - They **are** (*They're*) -> *They are teachers.*
* **Forma Negativa:**
  - Sujeto + To Be + not
  - I am not (*I'm not*) | You are not (*You aren't*)
  - He is not (*He isn't*) | She is not (*She isn't*) | It is not (*It isn't*)
  - We are not (*We aren't*) | They are not (*They aren't*)
* **Forma Interrogativa (Inversión):**
  - **Are you** happy? -> *Yes, I am. / No, I'm not.*
  - **Is he** a doctor? -> *Yes, he is. / No, he isn't.*
  - **Are they** at home? -> *Yes, they are. / No, they aren't.*

#### 3. Numbers from 0 to 100 & Age (Números y la Edad)
* 0-10: zero, one, two, three, four, five, six, seven, eight, nine, ten.
* 11-20: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.
* Decenas: thirty (30), forty (40), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90), one hundred (100).
* **¡REGLA DE ORO DE LA EDAD!**
  - En inglés la edad **se es**, no se tiene:
  - ✅ *I am 16 years old.* o *I am 16.*
  - ❌ *I have 16 years.* (¡Error gravísimo de traducción directa!).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración: "She ___ a very talented doctor."',
          optionA: 'is', optionB: 'are', optionC: 'am', optionD: 'be',
          correctOption: 'A',
          explanation: 'Para la tercera persona singular femenina (She), el verbo To Be en presente simple es siempre "is".',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se dice correctamente "Tengo 20 años" en inglés?',
          optionA: 'I am 20 years old',
          optionB: 'I have 20 years',
          optionC: 'I has 20 years old',
          optionD: 'I got 20 years',
          correctOption: 'A',
          explanation: 'En inglés la edad se expresa obligatoriamente con el verbo To Be ("I am 20 years old"), nunca con "have".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración afirmativa con el verbo To Be!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Sujeto (She) + Verbo (is) + Artículo (a) + Adjetivo (good) + Sustantivo (student).',
          metadata: {
            targetSentence: 'She is a good student',
            words: ['She', 'is', 'a', 'good', 'student'],
            distractors: ['are', 'am', 'they']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Elige la forma negativa contraída correcta: "They ___ at home right now."',
          optionA: "aren't", optionB: "isn't", optionC: 'not are', optionD: "amn't",
          correctOption: 'A',
          explanation: 'Para el sujeto plural "They", la negación contraída del verbo To Be es "aren\'t" (are not).',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la pregunta en inglés con el verbo To Be!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'En las preguntas con To Be se invierte la posición: Verbo (Are) + Sujeto (you) + Adjetivo (ready) + Complemento (for class).',
          metadata: {
            targetSentence: 'Are you ready for class',
            words: ['Are', 'you', 'ready', 'for', 'class'],
            distractors: ['Is', 'am', 'do']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la pregunta: "___ your brother an architect?"',
          optionA: 'Is', optionB: 'Are', optionC: 'Am', optionD: 'Do',
          correctOption: 'A',
          explanation: '"Your brother" equivale al pronombre "He" (él), por lo cual la pregunta se inicia con "Is".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración negativa en inglés!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura negativa: Sujeto (He) + isn\'t (is not) + Complemento (tired today).',
          metadata: {
            targetSentence: 'He is not tired today',
            words: ['He', 'is', 'not', 'tired', 'today'],
            distractors: ['are', 'am', 'no']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se escribe el número 40 en inglés?',
          optionA: 'forty', optionB: 'fourty', optionC: 'fourteen', optionD: 'fortieth',
          correctOption: 'A',
          explanation: 'El número 40 en inglés se escribe "forty" (sin la letra "u", a diferencia de "four").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase para describir un grupo de amigos!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Pronombre (We) + Verbo (are) + Adjetivo (best) + Sustantivo (friends).',
          metadata: {
            targetSentence: 'We are best friends',
            words: ['We', 'are', 'best', 'friends'],
            distractors: ['is', 'our', 'am']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la respuesta corta afirmativa para la pregunta "Is Maria at school?"?',
          optionA: 'Yes, she is.',
          optionB: 'Yes, she are.',
          optionC: 'Yes, is she.',
          optionD: 'Yes, she has.',
          correctOption: 'A',
          explanation: 'Las respuestas cortas afirmativas con To Be siguen la regla: Yes, + pronombre + verbo To Be sin contraer ("Yes, she is.").',
          metadata: {}
        }
      ]
    },

    // ==========================================
    // UNIT 3: Everyday Objects, Articles & Plurals
    // ==========================================
    {
      title: 'Unit 3: Everyday Objects, Articles & Plurals',
      orderIndex: 3,
      content: `### Unit 3: Everyday Objects, Articles & Plurals (Objetos Cotidianos, Artículos y Plurales)

#### 1. Indefinite Articles: A vs. AN (Un / Una)
* Se usa **A** antes de palabras que comiencen con **sonido de consonante**:
  - *a book* (un libro) | *a pencil* (un lápiz)
  - *a car* (un auto) | *a laptop* (una laptop)
  - *a university* (la 'u' suena como consonante /juː/).
* Se usa **AN** antes de palabras que comiencen con **sonido de vocal**:
  - *an apple* (una manzana) | *an orange* (una naranja)
  - *an elephant* (un elefante) | *an umbrella* (un paraguas)
  - *an hour* (la 'h' es muda).
* **¡OJO!** Los artículos "a" y "an" NUNCA se usan con palabras en plural (*a books* está mal, debe ser *books* o *some books*).

#### 2. Demonstratives: This, That, These, Those
* **Singular (1 solo objeto):**
  - **This** = Este / Esta (cerca de quien habla) -> *This is my phone.*
  - **That** = Ese / Aquel (lejos de quien habla) -> *That is a bird.*
* **Plural (2 o más objetos):**
  - **These** = Estos / Estas (cerca de quien habla) -> *These are my keys.*
  - **Those** = Esos / Aquellos (lejos de quien habla) -> *Those are mountains.*

#### 3. Regular and Irregular Plurals (Plurales)
* **Regla General:** Añadir **-s** (*book $\rightarrow$ books*, *chair $\rightarrow$ chairs*).
* **Terminaciones en -s, -ss, -sh, -ch, -x:** Añadir **-es** (*watch $\rightarrow$ watches*, *box $\rightarrow$ boxes*).
* **Consonante + Y:** Cambia a **-ies** (*city $\rightarrow$ cities*, *dictionary $\rightarrow$ dictionaries*).
* **Plurales Irregulares (Cambian totalmente de forma):**
  - *man $\rightarrow$ men* (hombre / hombres)
  - *woman $\rightarrow$ women* (mujer / mujeres)
  - *child $\rightarrow$ children* (niño / niños)
  - *person $\rightarrow$ people* (persona / personas / gente)
  - *tooth $\rightarrow$ teeth* (diente / dientes)
  - *foot $\rightarrow$ feet* (pie / pies)`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es el artículo indefinido correcto para la palabra "umbrella" (paraguas)?',
          optionA: 'an', optionB: 'a', optionC: 'the a', optionD: 'none',
          correctOption: 'A',
          explanation: '"Umbrella" comienza con sonido vocálico (/ʌ/), por lo que se utiliza "an": "an umbrella".',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es el plural irregular correcto de "child" (niño o niña)?',
          optionA: 'children', optionB: 'childs', optionC: 'childrens', optionD: 'childes',
          correctOption: 'A',
          explanation: '"Child" es un sustantivo irregular cuyo plural es "children". Ponerle "s" (childs o childrens) es incorrecto.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase con demostrativo y adjetivo!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'En inglés el adjetivo de color precede al sustantivo: "This is a blue notebook".',
          metadata: {
            targetSentence: 'This is a blue notebook',
            words: ['This', 'is', 'a', 'blue', 'notebook'],
            distractors: ['These', 'an', 'are']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Para señalar varios objetos que están LEJOS de ti, ¿qué palabra demostrativa utilizas?',
          optionA: 'Those', optionB: 'This', optionC: 'These', optionD: 'That',
          correctOption: 'A',
          explanation: '"Those" es el pronombre demostrativo plural para objetos lejanos ("esos" / "aquellos").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración para describir objetos en plural!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Con el demostrativo plural "These" se usa el verbo plural "are": "These books are very interesting".',
          metadata: {
            targetSentence: 'These books are very interesting',
            words: ['These', 'books', 'are', 'very', 'interesting'],
            distractors: ['This', 'is', 'an']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál de las siguientes opciones tiene un error de artículo?',
          optionA: 'a apple', optionB: 'a house', optionC: 'an engineer', optionD: 'a desk',
          correctOption: 'A',
          explanation: '"Apple" empieza con sonido de vocal, por lo que debe escribirse "an apple", no "a apple".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración para identificar pertenencias en plural!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Demonstrativo (Those) + Verbo (are) + Posesivo (my) + Sustantivo (new) + keys: "Those are my new keys".',
          metadata: {
            targetSentence: 'Those are my new keys',
            words: ['Those', 'are', 'my', 'new', 'keys'],
            distractors: ['This', 'is', 'key']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es el plural correcto de la palabra "person"?',
          optionA: 'people', optionB: 'persons', optionC: 'peoples', optionD: 'persones',
          correctOption: 'A',
          explanation: 'El plural común e irregular de "person" en inglés es "people" (personas o gente).',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración descriptiva de un objeto singular!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Demonstrativo (That) + Verbo (is) + Artículo (an) + Adjetivo (expensive) + Sustantivo (car).',
          metadata: {
            targetSentence: 'That is an expensive car',
            words: ['That', 'is', 'an', 'expensive', 'car'],
            distractors: ['a', 'are', 'These']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la forma plural correcta de la palabra "city"?',
          optionA: 'cities', optionB: 'citys', optionC: 'citieses', optionD: 'cityes',
          correctOption: 'A',
          explanation: 'Cuando una palabra termina en consonante seguida de "y", la "y" se cambia por "i" y se añade "es": city $\rightarrow$ cities.',
          metadata: {}
        }
      ]
    },

    // ==========================================
    // UNIT 4: Family Members, Possessives & Appearance
    // ==========================================
    {
      title: 'Unit 4: Family Members, Possessives & Appearance',
      orderIndex: 4,
      content: `### Unit 4: Family Members, Possessives & Appearance (La Familia, Posesivos y Apariencia)

#### 1. The Family Vocabulary (Miembros de la Familia)
* **Immediate Family:**
  - *Parents* = Padres (papá y mamá juntos)
  - *Father / Dad* = Padre / Papá | *Mother / Mom* = Madre / Mamá
  - *Siblings* = Hermanos (varones y mujeres juntos)
  - *Brother* = Hermano | *Sister* = Hermana
  - *Children* = Hijos o niños en general
  - *Son* = Hijo varón | *Daughter* = Hija mujer
* **Extended Family:**
  - *Grandparents* = Abuelos | *Grandfather* = Abuelo | *Grandmother* = Abuela
  - *Uncle* = Tío | *Aunt* = Tía | *Cousin* = Primo / Prima
  - *Nephew* = Sobrino | *Niece* = Sobrina

#### 2. Possessive Adjectives (Adjetivos Posesivos)
* I $\rightarrow$ **my** (mi/mis): *This is my brother.*
* You $\rightarrow$ **your** (tu/tus, su/sus de usted): *What is your father's job?*
* He $\rightarrow$ **his** (su/sus de él): *David lives with his parents.*
* She $\rightarrow$ **her** (su/sus de ella): *Laura loves her dog.*
* It $\rightarrow$ **its** (su/sus de cosa o animal): *The cat drinks its milk.*
* We $\rightarrow$ **our** (nuestro/nuestra/nuestros): *Our family is very united.*
* They $\rightarrow$ **their** (su/sus de ellos): *Their house is very big.*

#### 3. Possessive 'S (Genitivo Sajón)
* Se añade **'s** después del poseedor para indicar propiedad:
  - *Carlos's book* = El libro de Carlos.
  - *My mother's name is Martha.* = El nombre de mi madre es Martha.
  - *The doctor's car is white.* = El auto del doctor es blanco.

#### 4. Basic Physical & Personality Adjectives (Descripción Básica)
* *tall* (alto) vs. *short* (bajo)
* *young* (joven) vs. *old* (viejo/mayor)
* *friendly* (amigable), *smart / intelligent* (inteligente), *kind* (amable).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa con el posesivo adecuado: "Daniel is with ___ sister. Her name is Laura."',
          optionA: 'his', optionB: 'her', optionC: 'its', optionD: 'their',
          correctOption: 'A',
          explanation: 'Daniel es un varón (He), por lo que el adjetivo posesivo correspondiente a "su hermana de él" es "his".',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se traduce "El auto de mi padre" usando el genitivo sajón en inglés?',
          optionA: "My father's car",
          optionB: 'The car of my father',
          optionC: "My father car's",
          optionD: 'Car my father',
          correctOption: 'A',
          explanation: 'El genitivo sajón coloca primero el poseedor con apóstrofe y \'s\', seguido de lo que posee: "My father\'s car".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Arma la oración sobre la profesión de un familiar!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Posesivo (Her) + Sujeto (brother) + Verbo (is) + Artículo (an) + Profesión (engineer).',
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
          optionB: 'Parientes / Familiares',
          optionC: 'Primos',
          optionD: 'Hermanos',
          correctOption: 'A',
          explanation: '"Parents" es un falso cognado; no significa parientes (relatives), sino específicamente padre y madre ("padres").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase de pertenencia familiar!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: '"Our family" actúa como sujeto singular, por lo cual el verbo en presente simple lleva \'s\': "lives in Quito".',
          metadata: {
            targetSentence: 'Our family lives in Quito',
            words: ['Our', 'family', 'lives', 'in', 'Quito'],
            distractors: ['We', 'live', 'my']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa: "We love our grandparents. ___ house is very beautiful."',
          optionA: 'Their', optionB: 'Our', optionC: 'His', optionD: 'Her',
          correctOption: 'A',
          explanation: 'La casa pertenece a los abuelos (ellos / they), por lo cual el adjetivo posesivo correspondiente es "Their".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración para describir a un miembro de la familia!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Posesivo (My) + Sujeto (mother) + Verbo (is) + Adjetivos (tall and friendly).',
          metadata: {
            targetSentence: 'My mother is tall and friendly',
            words: ['My', 'mother', 'is', 'tall', 'and', 'friendly'],
            distractors: ['are', 'his', 'am']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se llama en inglés a la hija de tu tío o tía?',
          optionA: 'Cousin', optionB: 'Niece', optionC: 'Aunt', optionD: 'Sister',
          correctOption: 'A',
          explanation: '"Cousin" significa primo o prima. "Niece" es sobrina y "Aunt" es tía.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase usando el genitivo sajón de posesión!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Oración: "This is Pedro\'s new laptop".',
          metadata: {
            targetSentence: "This is Pedro's new laptop",
            words: ['This', 'is', "Pedro's", 'new', 'laptop'],
            distractors: ['are', 'Pedro', 'an']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa: "The dog is eating ___ food rapidly."',
          optionA: 'its', optionB: "it's", optionC: 'his', optionD: 'her',
          correctOption: 'A',
          explanation: '"its" (sin apóstrofe) es el adjetivo posesivo para cosas y animales. "it\'s" con apóstrofe es la contracción de "it is".',
          metadata: {}
        }
      ]
    },

    // ==========================================
    // UNIT 5: Daily Routines & Present Simple
    // ==========================================
    {
      title: 'Unit 5: Daily Routines & Present Simple',
      orderIndex: 5,
      content: `### Unit 5: Daily Routines & Present Simple (Vida Cotidiana y Presente Simple)

#### 1. Daily Routine Verbs (Verbos de Rutina Diaria)
* *wake up* = despertarse | *get up* = levantarse de la cama
* *take a shower* = tomar una ducha / bañarse
* *have breakfast* = desayunar | *have lunch* = almorzar | *have dinner* = cenar
* *go to school / work* = ir a la escuela / trabajo
* *do homework* = hacer los deberes
* *watch TV* = ver televisión
* *go to bed / sleep* = ir a la cama / dormir

#### 2. Present Simple Rules (Reglas del Presente Simple Afirmativo)
* **Para los pronombres I, You, We, They:** El verbo se mantiene en su **forma base**:
  - *I speak English.* | *We live in Ecuador.* | *They study every day.*
* **Para la 3ra persona singular (He, She, It):** Se debe modificar el verbo:
  - **Regla General:** Agregar **-s** (*work $\rightarrow$ works*, *eat $\rightarrow$ eats*, *live $\rightarrow$ lives*).
  - **Verbos terminados en -o, -sh, -ch, -ss, -x:** Agregar **-es** (*go $\rightarrow$ goes*, *watch $\rightarrow$ watches*, *wash $\rightarrow$ washes*).
  - **Consonante + Y:** Cambiar por **-ies** (*study $\rightarrow$ studies*, *fly $\rightarrow$ flies*). (¡Pero vocal + Y solo añade -s: *play $\rightarrow$ plays*!).

#### 3. Negative & Questions with Auxiliaries DO and DOES
* **Negativo:**
  - I / You / We / They + **don't** (do not) + verbo base -> *I don't eat meat.*
  - He / She / It + **doesn't** (does not) + **verbo base sin -s** -> *She doesn't work on Sundays.*
* **Preguntas:**
  - **Do** + I / you / we / they + verbo base? -> *Do you speak English?* -> *Yes, I do. / No, I don't.*
  - **Does** + he / she / it + verbo base? -> *Does he study French?* -> *Yes, he does. / No, he doesn't.*

#### 4. Adverbs of Frequency (Adverbios de Frecuencia)
* *Always* (100% - Siempre)
* *Usually* (80% - Usualmente)
* *Often* (60% - A menudo)
* *Sometimes* (50% - A veces)
* *Never* (0% - Nunca)
* **Posición:** Se colocan ANTES del verbo principal (*I **always** have breakfast*), pero DESPUÉS del verbo To Be (*He is **always** happy*).`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración en tercera persona singular: "Daniel ___ English every afternoon."',
          optionA: 'studies', optionB: 'study', optionC: 'studying', optionD: 'is study',
          correctOption: 'A',
          explanation: 'Para la tercera persona singular (He / Daniel), el verbo terminado en consonante + \'y\' cambia a \'-ies\': study $\rightarrow$ studies.',
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
          explanation: 'Con el pronombre "We", el verbo en presente simple va en su forma base ("live"). No se mezcla con el verbo To Be.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Arma la oración de rutina diaria con adverbio de frecuencia!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'El adverbio "always" va entre el sujeto y el verbo de acción: "I always study English every day".',
          metadata: {
            targetSentence: 'I always study English every day',
            words: ['I', 'always', 'study', 'English', 'every', 'day'],
            distractors: ['studies', 'am', 'is']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Elige la forma negativa correcta: "She ___ coffee in the morning."',
          optionA: "doesn't drink",
          optionB: "don't drink",
          optionC: "doesn't drinks",
          optionD: "not drink",
          correctOption: 'A',
          explanation: 'Con "She", el auxiliar negativo es "doesn\'t" y el verbo principal vuelve a su forma base sin \'s\' ("drink").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración en tercera persona singular con lugar de trabajo!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Sujeto (She) + Verbo con s (works) + Preposición y lugar (in a big hospital).',
          metadata: {
            targetSentence: 'She works in a big hospital',
            words: ['She', 'works', 'in', 'a', 'big', 'hospital'],
            distractors: ['work', 'is', 'they']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la pregunta: "___ you live in Quito or Guayaquil?"',
          optionA: 'Do', optionB: 'Does', optionC: 'Are', optionD: 'Is',
          correctOption: 'A',
          explanation: 'Para el pronombre "you" con un verbo de acción como "live", el auxiliar de pregunta en presente simple es "Do".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la pregunta en presente simple con el auxiliar DO!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura interrogativa: Auxiliar (Do) + Sujeto (you) + Verbo (play) + Objeto (soccer) + Complemento (on Saturdays)?',
          metadata: {
            targetSentence: 'Do you play soccer on Saturdays',
            words: ['Do', 'you', 'play', 'soccer', 'on', 'Saturdays'],
            distractors: ['Does', 'are', 'plays']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la forma correcta del verbo "watch" con el pronombre "He"?',
          optionA: 'watches', optionB: 'watchs', optionC: 'watchies', optionD: 'watching',
          correctOption: 'A',
          explanation: 'Los verbos que terminan en el sonido "-ch" añaden "-es" para la tercera persona: watch $\rightarrow$ watches.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración sobre la rutina matutina!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Oración: "He wakes up at seven o\'clock".',
          metadata: {
            targetSentence: "He wakes up at seven o'clock",
            words: ['He', 'wakes', 'up', 'at', 'seven', "o'clock"],
            distractors: ['wake', 'is', 'on']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué preposición de tiempo se utiliza antes de los días de la semana (Monday, Friday...)?',
          optionA: 'on', optionB: 'at', optionC: 'in', optionD: 'by',
          correctOption: 'A',
          explanation: 'Para los días de la semana siempre se utiliza la preposición "ON" ("on Monday", "on Fridays").',
          metadata: {}
        }
      ]
    },

    // ==========================================
    // UNIT 6: Food, Drinks & Ordering
    // ==========================================
    {
      title: 'Unit 6: Food, Drinks & Ordering',
      orderIndex: 6,
      content: `### Unit 6: Food, Drinks & Ordering (Comida, Bebidas y Cómo Ordenar)

#### 1. Food and Drink Vocabulary (Alimentos y Bebidas)
* **Meals (Comidas del día):**
  - *Breakfast* = Desayuno | *Lunch* = Almuerzo | *Dinner* = Cena
* **Common Foods:**
  - *bread* = pan | *cheese* = queso | *eggs* = huevos | *chicken* = pollo
  - *meat / beef* = carne de res | *fish* = pescado | *rice* = arroz
  - *apple* = manzana | *banana* = plátano | *salad* = ensalada
* **Beverages (Bebidas):**
  - *water* = agua | *milk* = leche | *coffee* = café | *tea* = té | *juice* = jugo

#### 2. Countable vs. Uncountable Nouns (Contables e Incontables)
* **Countable (Se pueden contar individualmente y tienen plural):**
  - an egg $\rightarrow$ two eggs | an apple $\rightarrow$ three apples | a sandwich $\rightarrow$ sandwiches.
* **Uncountable (No se cuentan por unidades individuales; no tienen plural en este sentido):**
  - water, milk, rice, sugar, bread, cheese, money.
  - Para medirlos se usan contenedores: *a bottle of water*, *a cup of coffee*, *a glass of milk*.

#### 3. Some vs. Any
* **SOME** (algunos/un poco de): Se usa en oraciones **afirmativas**:
  - *I have some apples.* (Contable)
  - *There is some milk in the fridge.* (Incontable)
* **ANY** (nada de / algo de / ningún): Se usa en oraciones **negativas** y en **preguntas**:
  - *We don't have any bread.* (Negativa)
  - *Do you have any questions?* (Pregunta)

#### 4. Polite Ordering (Cómo Ordenar Amablemente)
* En lugar de decir *"I want"* (quiero, suena muy directo o tosco), se dice:
  - **"I would like..."** (*Me gustaría...*) o su contracción **"I'd like..."**:
  - *I would like a cup of coffee, please.*
  - *Can I have a glass of water, please?*`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo pides amablemente un café en un restaurante en inglés?',
          optionA: 'I would like a cup of coffee, please',
          optionB: 'I want coffee now',
          optionC: 'Give me coffee please',
          optionD: 'I like a coffee',
          correctOption: 'A',
          explanation: '"I would like..." (o "I\'d like...") es la fórmula formal, educada y natural para pedir comida o bebida.',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa la oración afirmativa: "There are ___ delicious apples on the table."',
          optionA: 'some', optionB: 'any', optionC: 'a', optionD: 'an',
          correctOption: 'A',
          explanation: 'En oraciones afirmativas con sustantivos en plural se utiliza "some" ("There are some delicious apples").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase para pedir un vaso de agua con educación!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: "I would like a glass of water please".',
          metadata: {
            targetSentence: 'I would like a glass of water please',
            words: ['I', 'would', 'like', 'a', 'glass', 'of', 'water', 'please'],
            distractors: ['want', 'am', 'some']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Elige la opción correcta para una oración negativa: "We do not have ___ milk in the kitchen."',
          optionA: 'any', optionB: 'some', optionC: 'a', optionD: 'many',
          correctOption: 'A',
          explanation: 'En oraciones negativas se utiliza "any" para indicar "nada de" o "ninguna cantidad".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la pregunta sobre alimentos usando ANY!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura de pregunta: "Do you have any fresh bread"?',
          metadata: {
            targetSentence: 'Do you have any fresh bread',
            words: ['Do', 'you', 'have', 'any', 'fresh', 'bread'],
            distractors: ['some', 'has', 'are']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál de los siguientes sustantivos es INCONTABLE (Uncountable)?',
          optionA: 'water', optionB: 'apple', optionC: 'egg', optionD: 'banana',
          correctOption: 'A',
          explanation: '"Water" (agua) es un líquido incontable. Las manzanas, huevos y plátanos son contables por unidad.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración sobre el desayuno diario!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Oración: "I have eggs and coffee for breakfast".',
          metadata: {
            targetSentence: 'I have eggs and coffee for breakfast',
            words: ['I', 'have', 'eggs', 'and', 'coffee', 'for', 'breakfast'],
            distractors: ['eat', 'am', 'at']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo se llama la comida que se toma al mediodía?',
          optionA: 'Lunch', optionB: 'Breakfast', optionC: 'Dinner', optionD: 'Snack',
          correctOption: 'A',
          explanation: '"Lunch" es el almuerzo. "Breakfast" es el desayuno y "Dinner" es la cena.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase para ofrecer algo amablemente!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Pregunta de ofrecimiento de cortesía: "Would you like some orange juice"? (En ofrecimientos amables se usa "some").',
          metadata: {
            targetSentence: 'Would you like some orange juice',
            words: ['Would', 'you', 'like', 'some', 'orange', 'juice'],
            distractors: ['Do', 'any', 'are']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué frase utilizas al finalizar de comer en un restaurante para pedir la cuenta?',
          optionA: 'The check, please / The bill, please',
          optionB: 'I want menu now',
          optionC: 'How are you money',
          optionD: 'Where is food',
          correctOption: 'A',
          explanation: '"The check, please" (en inglés americano) o "The bill, please" (en inglés británico) es la forma estándar de pedir la cuenta.',
          metadata: {}
        }
      ]
    },

    // ==========================================
    // UNIT 7: City Places, Prepositions & Directions
    // ==========================================
    {
      title: 'Unit 7: City Places, Prepositions & Directions',
      orderIndex: 7,
      content: `### Unit 7: City Places, Prepositions & Directions (Lugares de la Ciudad, Preposiciones y Direcciones)

#### 1. Places in the City (Lugares en la Ciudad)
* *bank* = banco | *hospital* = hospital | *pharmacy / drugstore* = farmacia
* *supermarket* = supermercado | *school* = escuela | *library* = biblioteca
* *bookstore* = librería (donde se compran libros) | *park* = parque
* *restaurant* = restaurante | *bus stop / station* = parada o estación de buses
* *airport* = aeropuerto | *police station* = comisaría de policía

#### 2. Prepositions of Place (Preposiciones de Lugar)
* **in** = dentro de (un espacio cerrado o ciudad) -> *in the classroom, in Quito.*
* **on** = sobre una superficie o en una calle -> *on the table, on Amazonas Avenue.*
* **at** = en un punto específico o institución -> *at the bus stop, at school, at home.*
* **next to** = al lado de -> *The bank is next to the pharmacy.*
* **between** = en medio de (dos lugares) -> *The park is between the school and the hospital.*
* **behind** = detrás de | **in front of** = enfrente de
* **across from / opposite** = al frente (cruzando la calle).

#### 3. Asking for and Giving Directions (Pedir y Dar Direcciones)
* **Preguntas corteses:**
  - *Excuse me, where is the nearest bank?* (Disculpe, ¿dónde está el banco más cercano?).
  - *How can I get to the hospital?* (¿Cómo puedo llegar al hospital?).
* **Instrucciones comunes:**
  - *Go straight ahead* = Siga todo recto / continúe derecho.
  - *Turn left* = Gire a la izquierda.
  - *Turn right* = Gire a la derecha.
  - *It's on your left / right* = Está a su izquierda / derecha.`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cómo preguntas cortésmente en la calle dónde queda el banco más cercano?',
          optionA: 'Excuse me, where is the nearest bank?',
          optionB: 'Where bank is now?',
          optionC: 'Tell me where bank is',
          optionD: 'Bank where please',
          correctOption: 'A',
          explanation: '"Excuse me, where is the nearest [lugar]?" es la forma cortés, natural y correcta de preguntar por una ubicación.',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa con la preposición correcta: "The hospital is ___ the school and the bank."',
          optionA: 'between', optionB: 'next to', optionC: 'on', optionD: 'in',
          correctOption: 'A',
          explanation: '"Between" se utiliza para indicar que algo se encuentra en medio de dos puntos o lugares específicos.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase de ubicación de un lugar!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: "The supermarket is next to the pharmacy".',
          metadata: {
            targetSentence: 'The supermarket is next to the pharmacy',
            words: ['The', 'supermarket', 'is', 'next', 'to', 'the', 'pharmacy'],
            distractors: ['are', 'between', 'in']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la diferencia entre "library" y "bookstore"?',
          optionA: 'Library es biblioteca (para prestar/leer) y Bookstore es librería (para comprar libros)',
          optionB: 'Library es librería (para comprar) y Bookstore es biblioteca',
          optionC: 'Son exactamente lo mismo',
          optionD: 'Library es para ver películas',
          correctOption: 'A',
          explanation: '"Library" es otro famoso falso cognado: significa biblioteca pública o escolar. Una tienda donde se compran libros es "bookstore".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la instrucción para dar una dirección en la calle!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Instrucción: "Go straight ahead and turn left".',
          metadata: {
            targetSentence: 'Go straight ahead and turn left',
            words: ['Go', 'straight', 'ahead', 'and', 'turn', 'left'],
            distractors: ['right', 'is', 'to']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué preposición utilizas para indicar que un edificio está ubicado sobre una avenida específica (ej. Amazonas Avenue)?',
          optionA: 'on', optionB: 'in', optionC: 'at', optionD: 'under',
          correctOption: 'A',
          explanation: 'Para nombres de calles y avenidas se utiliza la preposición "ON" ("on Amazonas Avenue", "on Main Street").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la pregunta para saber cómo llegar al aeropuerto!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Pregunta: "How can I get to the airport"?',
          metadata: {
            targetSentence: 'How can I get to the airport',
            words: ['How', 'can', 'I', 'get', 'to', 'the', 'airport'],
            distractors: ['is', 'go', 'where']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué significa la indicación "Turn right at the corner"?',
          optionA: 'Gira a la derecha en la esquina',
          optionB: 'Gira a la izquierda en la esquina',
          optionC: 'Sigue todo recto',
          optionD: 'Cruza la calle con cuidado',
          correctOption: 'A',
          explanation: '"Turn right" significa girar a la derecha y "corner" significa esquina.',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la frase que indica dónde se encuentra un destino!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Oración: "The hotel is across from the park".',
          metadata: {
            targetSentence: 'The hotel is across from the park',
            words: ['The', 'hotel', 'is', 'across', 'from', 'the', 'park'],
            distractors: ['between', 'on', 'are']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Completa con la preposición de punto exacto: "She is waiting ___ the bus stop."',
          optionA: 'at', optionB: 'on', optionC: 'in', optionD: 'under',
          correctOption: 'A',
          explanation: 'Para puntos de encuentro o paradas específicas se usa la preposición "AT" ("at the bus stop").',
          metadata: {}
        }
      ]
    },

    // ==========================================
    // UNIT 8: Abilities (Can / Can't), Hobbies & Sports
    // ==========================================
    {
      title: 'Unit 8: Abilities (Can / Can\'t), Hobbies & Sports',
      orderIndex: 8,
      content: `### Unit 8: Abilities (Can / Can't), Hobbies & Sports (Habilidades, Pasatiempos y Deportes)

#### 1. The Modal Verb "CAN" (Poder / Habilidad)
* **CAN** expresa la capacidad física o mental de hacer algo, o permisos y peticiones.
* **Características clave del verbo CAN:**
  - Es igual para todos los pronombres (no se le añade '-s' con He/She/It):
    - *I can*, *She can*, *They can*.
  - Va seguido siempre de un verbo en **forma base** (infinitivo sin *to*):
    - ✅ *She can swim very well.*
    - ❌ *She can to swim.* o *She cans swim.* (¡Errores muy comunes!).
* **Forma Negativa: CANNOT o CAN'T:**
  - *I can't drive a car.* (No sé/no puedo manejar un auto).
  - *He can't speak Japanese.*
* **Forma Interrogativa (Inversión):**
  - **Can you** play the guitar? -> *Yes, I can. / No, I can't.*
  - **Can she** dance salsa? -> *Yes, she can. / No, she can't.*

#### 2. Sports & Free-Time Activities (Deportes y Pasatiempos)
* Se usan 3 verbos principales con deportes y pasatiempos:
  - **PLAY:** Para deportes de pelota o juegos competitivos:
    - *play soccer, play basketball, play tennis, play chess, play video games, play the guitar.*
  - **GO:** Para actividades que terminan en **-ing**:
    - *go swimming, go running, go cycling, go dancing.*
  - **DO:** Para artes marciales y ejercicios individuales sin pelota:
    - *do karate, do yoga, do gymnastics, do aerobics.*`,
      questions: [
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la forma gramaticalmente correcta de decir "Ella puede nadar muy bien"?',
          optionA: 'She can swim very well',
          optionB: 'She can to swim very well',
          optionC: 'She cans swim very well',
          optionD: 'She can swimming very well',
          correctOption: 'A',
          explanation: 'El verbo modal "can" no cambia en tercera persona (nunca "cans") y el verbo siguiente va en infinitivo sin "to" ("swim").',
          metadata: {}
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Elige el verbo adecuado para el deporte: "My brother and I ___ basketball on Sundays."',
          optionA: 'play', optionB: 'do', optionC: 'go', optionD: 'make',
          correctOption: 'A',
          explanation: 'Para deportes de balón o pelota y juegos de equipo se utiliza siempre el verbo "PLAY".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración sobre una habilidad especial!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Estructura: Sujeto (He) + Modal (can) + Verbo base (speak) + Objeto (three languages fluently).',
          metadata: {
            targetSentence: 'He can speak three languages fluently',
            words: ['He', 'can', 'speak', 'three', 'languages', 'fluently'],
            distractors: ['to', 'speaks', 'is']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la forma negativa contraída correcta de "can"?',
          optionA: "can't", optionB: "cann't", optionC: "don't can", optionD: "not can",
          correctOption: 'A',
          explanation: 'La contracción negativa estándar de "cannot" es "can\'t".',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la pregunta para saber si alguien toca un instrumento musical!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Pregunta: "Can you play the acoustic guitar"?',
          metadata: {
            targetSentence: 'Can you play the acoustic guitar',
            words: ['Can', 'you', 'play', 'the', 'acoustic', 'guitar'],
            distractors: ['do', 'to', 'are']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Cuál es la colocación correcta para la actividad "swimming"?',
          optionA: 'go swimming', optionB: 'play swimming', optionC: 'do swimming', optionD: 'make swimming',
          correctOption: 'A',
          explanation: 'Para las actividades deportivas y recreativas que terminan en "-ing" se utiliza el verbo "GO" ("go swimming", "go running").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la oración negativa sobre una habilidad no dominada!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Oración negativa: "I can\'t drive a manual car".',
          metadata: {
            targetSentence: "I can't drive a manual car",
            words: ['I', "can't", 'drive', 'a', 'manual', 'car'],
            distractors: ['to', 'no', 'am']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: '¿Qué verbo se usa para actividades como karate, yoga o judo?',
          optionA: 'DO', optionB: 'PLAY', optionC: 'GO', optionD: 'TAKE',
          correctOption: 'A',
          explanation: 'Para artes marciales y ejercicios de acondicionamiento sin pelota se utiliza "DO" ("do karate", "do yoga").',
          metadata: {}
        },
        {
          type: 'SENTENCE_BUILDER',
          questionText: '¡Ordena la respuesta corta afirmativa a una pregunta con CAN!',
          optionA: '-', optionB: '-', optionC: '-', optionD: '-',
          correctOption: 'A',
          explanation: 'Respuesta: "Yes she can cook delicious food".',
          metadata: {
            targetSentence: 'Yes she can cook delicious food',
            words: ['Yes', 'she', 'can', 'cook', 'delicious', 'food'],
            distractors: ['to', 'cooks', 'does']
          }
        },
        {
          type: 'MULTIPLE_CHOICE',
          questionText: 'Si alguien te pregunta: "Can you help me with this exercise?", ¿cuál es la respuesta más natural y colaborativa?',
          optionA: 'Yes, of course I can!',
          optionB: 'No, I am not.',
          optionC: 'Yes, I do help.',
          optionD: 'I can to help.',
          correctOption: 'A',
          explanation: '"Yes, of course I can!" (¡Sí, por supuesto que puedo!) responde coherentemente a la petición formulada con "Can you...?".',
          metadata: {}
        }
      ]
    }
  ];

  let totalLessonsCreated = 0;
  let totalQuestionsCreated = 0;

  for (const unit of fullCurriculum) {
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
    totalLessonsCreated++;

    // Insertar cada una de las 10 preguntas por lección
    for (const q of unit.questions) {
      const existingQuestion = await prisma.question.findFirst({
        where: {
          lessonId: lesson.id,
          questionText: q.questionText
        }
      });

      if (!existingQuestion) {
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
        totalQuestionsCreated++;
      } else {
        // Actualizar contenido y metadata para garantizar distractores y explicaciones al día
        await prisma.question.update({
          where: { id: existingQuestion.id },
          data: {
            type: q.type,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctOption: q.correctOption,
            explanation: q.explanation,
            metadata: q.metadata
          }
        });
      }
    }
  }

  // 4. Libros Digitales de Inglés para la Biblioteca
  const englishBooks = [
    {
      title: 'English A1.1: Starter & Visual Grammar Guide',
      author: 'Aprende Estudia / DJH Company',
      category: 'Inglés',
      description: 'Manual integral ilustrado de nivel A1.1. Incluye las 8 unidades: saludos, verbo To Be, números, objetos cotidianos, familia, rutina diaria, comida, lugares de la ciudad y modales de habilidad.',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      title: 'English A1: 100 Real-Life Conversation Dialogues',
      author: 'Aprende Estudia / DJH Company',
      category: 'Inglés',
      description: 'Compendio de 100 diálogos cotidianos para practicar conversación, pedir comida en restaurantes, dar direcciones y entrevistas breves en inglés.',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  ];

  for (const b of englishBooks) {
    const bookInDb = await prisma.book.findFirst({
      where: { title: b.title }
    });

    if (!bookInDb) {
      await prisma.book.create({
        data: {
          title: b.title,
          author: b.author,
          category: b.category,
          description: b.description,
          fileUrl: b.fileUrl
        }
      });
      console.log(`📚 Libro "${b.title}" agregado a la Biblioteca.`);
    }
  }

  console.log(`\n🎉 ¡CURSO DE INGLÉS COMPLETO, COMPETITIVO Y ROBUSTO INYECTADO CON ÉXITO!`);
  console.log(`👉 Curso: "${grade.name}" (${grade.educationLevel})`);
  console.log(`👉 Materia: "${subject.name}"`);
  console.log(`👉 Total de Unidades: ${totalLessonsCreated} Unidades temáticas completas.`);
  console.log(`👉 Total de Preguntas/Juegos activos: 80 ejercicios interactivos (10 por unidad).`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante la inyección:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
