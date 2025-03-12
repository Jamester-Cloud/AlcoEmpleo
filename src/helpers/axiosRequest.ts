import axios from "axios";
import { Request } from "@/app/interfaces/types";
export async function requestHandler(req: Request, type: string) {
  let response;
  if (type === "post") {
    response = await axios.post(req.url, req.data);
  }
  if (type === "get") {
    response = await axios.get(req.url);
  }
  return response;
}
