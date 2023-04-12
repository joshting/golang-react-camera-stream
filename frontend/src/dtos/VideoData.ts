import { DetectionData } from "./DetectionData";

export interface VideoData {
    frame: string;
    faces: DetectionData[];
}