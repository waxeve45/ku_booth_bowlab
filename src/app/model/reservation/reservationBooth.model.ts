// To parse this data:
//
//   import { Convert } from "./file";
//
//   const reservationBooth = Convert.toReservationBooth(json);

export interface ReservationBooth {
    zoneName: string;
    boothDetails: BoothDetail[];
    ReservationStatus: string;
    reservationDate: string;
    fullDate: string;
    reservationID: number;
    work_date_Start: string;
    totalPrice: any;
  }
  
  export interface BoothDetail {
    boothName: string;
    boothPrice: number;
  }
  
  // Converts JSON strings to/from your types
  export class Convert {
    public static toReservationBooth(json: string): ReservationBooth[] {
      return JSON.parse(json);
    }
  
    public static reservationBoothToJson(value: ReservationBooth[]): string {
      return JSON.stringify(value);
    }
  }