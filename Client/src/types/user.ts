export interface User {
    _id?: string;
    email: string;
    password: string;
    username: string;
    fullName: string;
    profilePic?: string;
    refreshTokens?: string[];
}
