export interface IUser {
    name: string;
    email: string;
    password: string;
    preferences?: {
        location: {
            lat?: string;
            long?: string;
            address?: string;
        },
        dietary?: string[];
        cuisine?: string[];
        participateInRewards?: boolean;
    }
}