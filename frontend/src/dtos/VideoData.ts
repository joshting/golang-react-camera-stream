export class VideoData {
    constructor(
        public data: string,
        public width: number,
        public height: number,
        public detector: any[],
        public tracker: any
    ){}
}