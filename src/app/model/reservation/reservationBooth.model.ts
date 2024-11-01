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
    Product:       Product[];
  }

  export interface Product {
    Product: string;
}


  export interface BoothDetail {
    boothName: string;
    boothPrice: number;
  }
  
  // Converts JSON strings to/from your types
  export class Convert {
    public static toReservationbooth(json: string): ReservationBooth {
        return JSON.parse(json);
    }

    public static reservationboothToJson(value: ReservationBooth): string {
        return JSON.stringify(value);
    }

    public static toProduct(json: string): Product {
        return JSON.parse(json);
    }

    public static productToJson(value: Product): string {
        return JSON.stringify(value);
    }

    public static toBoothDetail(json: string): BoothDetail {
        return JSON.parse(json);
    }

    public static boothDetailToJson(value: BoothDetail): string {
        return JSON.stringify(value);
    }
}