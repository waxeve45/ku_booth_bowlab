// To parse this data:
//
//   import { Convert } from "./file";
//
//   const user = Convert.toUser(json);

export interface User {
    prefix: string;
    fname:  string;
    lname:  string;
    phone:  string;
    email:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUser(json: string): User {
        return JSON.parse(json);
    }

    public static userToJson(value: User): string {
        return JSON.stringify(value);
    }
}
