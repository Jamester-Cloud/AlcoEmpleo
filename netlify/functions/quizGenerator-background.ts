import type { Context } from "@netlify/functions";
import { deepSeekQuizGenerator } from "@/services/deepsekAI";


export default async (req: Request, context: Context) => {
    console.log(req)
    console.log(context)
    return new Response("Hello, world!")
}