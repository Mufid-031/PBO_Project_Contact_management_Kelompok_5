export type ContactInput = {
    name: string;
    email: string;
    telephone: string;
};

export type ContactOutput = {
    name?: string;
    email?: string;
    telephone?: string;
    message?: string;
};