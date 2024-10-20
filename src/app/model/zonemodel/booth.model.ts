// To parse this data:
//
//   import { Convert } from "./file";
//
//   const booth = Convert.toBooth(json);

export interface Booth {
    boothName:   string;
    boothID:     string;
    boothStatus: string;
    boothPrice:  string;
    boothSize:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBooth(json: string): Booth {
        return JSON.parse(json);
    }

    public static boothToJson(value: Booth): string {
        return JSON.stringify(value);
    }
}
