// To parse this data:
//
//   import { Convert } from "./file";
//
//   const work = Convert.toWork(json);

// export interface Work {
// workCode: any;
//     workName:        string;
//     work_date_Start: string;
//     work_date_End:   string;
// }
export class Work {
    workID!: string;
    workName!: string;
    work_date_Start!: string;
    work_date_End!: string;
  }

// Converts JSON strings to/from your types
export class Convert {
    public static toWork(json: string): Work {
        return JSON.parse(json);
    }

    public static workToJson(value: Work): string {
        return JSON.stringify(value);
    }
}
