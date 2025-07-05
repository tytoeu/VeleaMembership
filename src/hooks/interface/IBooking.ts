export interface IBooking {
    booking_date?: string;
    full_name?: string;
    phone?: string;
    email?: string;
    cover?: number
    tags?: string[]
    comment?: string | null
    timeArrival?: string;
    address?: string;
    referral?: string | null
}

export interface IBookingCancel {
    bookingId: number;
    reason: string;
}