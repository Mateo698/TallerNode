import {object,string,array,TypeOf} from "zod";

export const UserSchema = object({
    name: string({
        required_error: "Name is required",
    }),
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
        required_error: "Password is required",
    }).min(8),
    groups: array(string({
            required_error: "Group is required",
    })).min(1),
});