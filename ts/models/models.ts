// =============
// models.ts - safekeeping of all interfaces
// =============

export interface PurchasedCourse {
    reg: string;
    title: string;
    delivery: string;
    price: number;
}

export interface Course extends PurchasedCourse {
    id: number;
    imageUrl: string;
    startDate: string;
    endDate: string;
    popular: boolean;
}

export interface DetailedCourse extends Course {
    automatedDaysCount: string;
    description: string;
}

export interface Admin {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    id?: number;
}

export interface User extends Admin {
    invoiceAdress?: string;
    invoiceZip?: string;
    invoiceCity?: string;
    invoiceCountry?: string;
    phone?: string;
    purchasedCourses?: PurchasedCourse[];
}

export interface Config {
    elementType: string;
    className?: string;
    attribute?: string;
    prefix?: string;
    dataField?: string;
    textContent?: string;
}

export interface Data {
    [key: string]: any;
}