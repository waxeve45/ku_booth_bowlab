// To parse this data:
//
//   import { Convert, CheckReserv } from "./file";
//
//   const checkReserv = Convert.toCheckReserv(json);

export interface CheckReserv {
    count:   number;
    message: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCheckReserv(json: string): CheckReserv {
        return JSON.parse(json);
    }

    public static checkReservToJson(value: CheckReserv): string {
        return JSON.stringify(value);
    }
}
