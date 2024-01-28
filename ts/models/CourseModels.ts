// =============
// CourseModels.ts - safekeeping of course interfaces
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
