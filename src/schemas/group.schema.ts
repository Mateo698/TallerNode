import {object,string,array,TypeOf} from "zod";

export const GroupSchema = object({
    name: string({
        required_error: "Name is required",
    }),
});