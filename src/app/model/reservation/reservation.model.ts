// To parse this data:
//
//   import { Convert, Reservation } from "./file";
//
//   const reservation = Convert.toReservation(json);

export interface Reservation {
    [x: string]: any;
        unpaid_reservations:       PaidReservationElement[];
        paid_reservations:         PaidReservationElement[];
        under_review_reservations: PaidReservationElement[];
    }
    
    export interface PaidReservationElement {
        fname:     string;
        lname:     string;
        phone:     string;
        boothName: string;
        zoneName:  string;
    }
    
    // Converts JSON strings to/from your types
    export class Convert {
        public static toReservation(json: string): Reservation {
            return JSON.parse(json);
        }
    
        public static reservationToJson(value: Reservation): string {
            return JSON.stringify(value);
        }
    }