export interface Request {
    success: boolean;
    result: {
        links: {
            source: number;
            target: number;
        };
        nodes: {
            id: number;
            label: string;
            node: [{
                background?: string;
                content?: string;
                inputs?: any;
                media?: string;
                redirect?: number;
                subtitle?: string;
                title?: string;
                waypoint?: any;
            }];
        };
    };
    message?: string;
}