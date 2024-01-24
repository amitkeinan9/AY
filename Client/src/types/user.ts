export interface UserDTO {
    _id?: string;
    email: string;
    username: string;
    fullName: string;
    profilePic?: string;
}

export interface EditUserDTO {
    password?: string;
    username?: string;
    fullName?: string;
    profilePic?: string;
}