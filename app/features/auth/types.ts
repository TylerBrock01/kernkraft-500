export interface AuthUser {
    email: string;
    name: string;
    role: string;
    businessId: string;
    plan: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResult {
    token: string;
    user: AuthUser;
}