export interface User{
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    token: string;
}



export interface AuthCredentials{
    email: string;
    password: string;
}



export interface RegisterData extends AuthCredentials{
    name: string;
}