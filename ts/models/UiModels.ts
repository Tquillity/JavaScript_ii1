// =============
// CourseModels.ts - safekeeping of UI interfaces
// =============
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