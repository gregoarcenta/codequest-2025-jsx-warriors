export interface ResetPasswordPayload {
    id: string;
    email: string;
    iat: number;
    exp: number;
    jti?: string;
}