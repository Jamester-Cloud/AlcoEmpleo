import OpenAI from "openai";
/**
 * 
 * @param jobTitle 
 * @param quizType 
 * @param dificulty 
 * @returns object with quiz questions and answers
 */
export async function deepSeekQuizGenerator(
  jobTitle: string,
  quizType: string,
  dificulty: string
) {
  let result;
  console.log(jobTitle, quizType, dificulty);
  const client = new OpenAI({
    apiKey: process.env.QUIZ_KEY,
    baseURL: "https://api.deepseek.com",
    dangerouslyAllowBrowser: true,
  });

  if (quizType === "Psicotecnico") {
    result = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "Necesito datos en json asi: [{pregunta:'', respuestas:[{respuesta}], respuestaCorrecta:'', tipoPregunta:''}], solo eso",
        },
        {
          role: "user",
          content: `Crea un instrumento de evaluación con 5 preguntas de selección múltiple y 5 preguntas de desarrollo que sirva para medir con fines corporativos las habilidades blandas, 
            en forma precisa, específicamente que nos permita precisar el nivel que posee una persona en cuanto a sus habilidades de:
            comunicación efectiva, 
            liderazgo, 
            trabajo en equipo, 
            resolución de conflictos, 
            empatía, 
            adaptabilidad 
            y honestidad. Asegurate de incluir la respuesta correcta dentro de las preguntas de seleccion multiple, siempre por favor, no las dejes vacias y las de desarrollo solo necesito 
            la pregunta para que el candidato la responda. Tambien necesito que me categorizes el tipo de pregunta, si es "seleccionMultiple" o "Psicotecnica" manten esos valores por peticion, recordando siempre que son 5 preguntas de seleccion multiple, y 5 preguntas de desarrollo`,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });
  } else {
    result = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "Necesito datos en json asi: [{pregunta:'', respuestas:[{respuesta}], respuestaCorrecta:''}], solo eso",
        },
        {
          role: "user",
          content: `Dame 5 preguntas importantes que le harias a un ${jobTitle} 
            para certificarlo en un cargo dentro de una empresa, 
            junto con la respuesta correcta y su vez con un grado de dificultad ${dificulty} en español. 
            Cambia las preguntas por cada consulta por favor y asegurate de que la respuesta correcta 
            este entre las respuestas generadas por favor. 
            Para cargos como "abogado", el contexto siempre sera la ley venezolana, asegurate de investigar bien si es el caso. De no serlo, sigue con el cargo proporcionado
            `,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });
  }

  const {message:{content}} = result.choices[0];
  const quiz = JSON.parse(content || '{}')
  return quiz;
}


/** 
 *@param answers
* @param candidateId
* @param quizId
* @return object with quiz calification 
*/ 
export async function deepSeekQuizEvaluator(){

}