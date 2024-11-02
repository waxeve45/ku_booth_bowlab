// To parse this data:
//
//   import { Convert } from "./file";
//
//   const statusReser = Convert.toStatusReser(json);

export interface StatusReser {
    userID:            string;
    reservationID:     string;
    boothID:           string;
    Product:           string;
    ReservationStatus: string;
    boothStatus:       string;
    boothName:         string;
    payment_slip:      string;
    prefix:            string;
    fname:             string;
    lname:             string;
    zoneName:          string;
    zoneID:            string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStatusReser(json: string): StatusReser {
        return JSON.parse(json);
    }

    public static statusReserToJson(value: StatusReser): string {
        return JSON.stringify(value);
    }
}
