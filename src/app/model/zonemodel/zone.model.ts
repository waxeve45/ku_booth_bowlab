// To parse this data:
//
//   import { Convert } from "./file";
//
//   const zone = Convert.toZone(json);

export interface Zone {
  zoneID: string;          // เพิ่ม zoneID
  zoneName: string;
  Number_of_booths: string;
  workID: string;
}


// Converts JSON strings to/from your types
export class Convert {
  public static toZone(json: string): Zone {
      return JSON.parse(json);
  }

  public static zoneToJson(value: Zone): string {
      return JSON.stringify(value);
  }
}

