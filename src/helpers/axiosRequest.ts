import axios from "axios";
import { Request } from "@/app/interfaces/types";
export async function axiosRequestHandler(req: Request, type: string) {
  let response;
  if (type === "post") {
    console.log(req.data);
    response = await axios.post(req.url, req.data);
  }
  if (type === "get") {
    response = await axios.get(req.url);
  }
  return response;
}
