// =============
// UserModels.ts - safekeeping of User interfaces
// =============
import { PurchasedCourse } from "./courseModels.js";

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