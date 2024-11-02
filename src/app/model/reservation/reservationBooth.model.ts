export interface ReservationBooth {
    zoneName: string;
    boothDetails: BoothDetail[];
    ReservationStatus: string;
    reservationDate: Date;  // Change to Date type
    fullDate: string;
    reservationID: number;
    work_date_Start: string;
    totalPrice: any;
    Product: Product[];
    payment_at: Date;  // Change to Date type
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
    public static toReservationBooth(json: string): ReservationBooth {
        const obj = JSON.parse(json);
        return {
            ...obj,
            reservationDate: new Date(obj.reservationDate),  // Convert to Date
            payment_at: new Date(obj.payment_at)             // Convert to Date
        };
    }

    public static reservationBoothToJson(value: ReservationBooth): string {
        return JSON.stringify({
            ...value,
            reservationDate: value.reservationDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),  // Format to 'day month year' in Thai
            payment_at: value.payment_at.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })  // Format to 'day month year' in Thai
        });
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
