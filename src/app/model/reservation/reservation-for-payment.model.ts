// To parse this data:
//
//   import { Convert } from "./file";
//
//   const reservationBoothForPayment = Convert.toReservationBoothForPayment(json);

export interface ReservationBoothForPayment {
    boothName: string;
    zoneName: string;
    boothPrice: number;
    boothStatus: string;
    ReservationStatus: string;
    Product: string;
    boothID: string;
    ReservationDate: string;
    totalPrice: number;
    boothSize: String;
  }
  
  // Converts JSON strings to/from your types
  export class Convert {
    public static toReservationBoothForPayment(
      json: string
    ): ReservationBoothForPayment[] {
      return JSON.parse(json);
    }
  
    public static reservationBoothForPaymentToJson(
      value: ReservationBoothForPayment[]
    ): string {
      return JSON.stringify(value);
    }
  }