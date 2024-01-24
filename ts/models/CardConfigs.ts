export interface MainCardConfig {
    title: string;
    delivery: "Classroom" | "Online" | "Both";
    startDate: string;
    endDate: string;
    id: number;
}

export interface CourseCardConfig extends MainCardConfig {
    reg: string;
    imageUrl: string;
    automatedDaysCount: string;
    price: string;
}

export interface DetailsCardConfig extends CourseCardConfig {
    description: string;
}