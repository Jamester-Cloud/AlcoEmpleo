export const prompt = `
        Crea un instrumento de evaluación con 10 preguntas de  selección múltiple que sirva para medir con fines corporativos las habilidades blandas, 
        en forma precisa, específicamente que nos permita precisar el nivel que posee una persona en cuanto a sus habilidades de:
        comunicación efectiva, 
        liderazgo, 
        trabajo en equipo, 
        resolución de conflictos, 
        empatía, 
        adaptabilidad 
        y honestidad
        `;

export const promptPsy = (cargoDeseado)=>{
        return `Dame 5 preguntas importantes que le harias a un ${cargoDeseado} para certificarlo en un cargo dentro empresa, junto con la respuestas correctas y su vez con un grado de dificultad ${dificultad} en español. Cambia las preguntas por cada consulta por favor y asegurate de que la respuesta correcta este entre las respuestas generadas por favor.`;
}