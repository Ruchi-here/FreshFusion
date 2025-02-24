export interface ISeller {
    name: string;
    email: string;
    password: string;
    location?: {
        lat?: string;
        long?: string;
        address?: string;
    };
    timings?: {
        from?: string;
        to?: string;
    };
    details?: {
        icon?: string;
        about?: string;
    }
}