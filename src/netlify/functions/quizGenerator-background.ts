import type { Context } from "@netlify/functions";
import { deepSeekQuizGenerator } from "@/services/deepsekAI";


export default async (req: Request, context: Context) => {
    console.log("quizGenerator-background")
    const json = await req.json();
    console.log(json);
    return new Response("Hello, world!")
}