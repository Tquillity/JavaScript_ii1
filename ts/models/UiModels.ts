// =============
// CourseModels.ts - safekeeping of UI interfaces
// =============
import { DetailedCourse } from "./courseModels";

export interface Config {
    elementType: string;
    className?: string;
    attribute?: string;
    prefix?: string;
    dataField?: string;
    textContent?: string;
}

//export interface Data {
//    [key: string]: any;
//}
export type Data = DetailedCourse;
