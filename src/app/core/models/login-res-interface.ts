export interface LoginResInterface {


    message: string;
    user: {
        name: string;
        email: string;
        role: string;
    };
    token: string;
}
