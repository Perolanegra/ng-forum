export interface UserModel {
    email: string;
    name: string;
    lastName?: string;
    id_nivel?: number;
    statusMsg?: string;
    phone?: string;
    ddd?: string;
    username: string;
    password: string;
    photoURL: string;
    birthDate?: Date;
    created_at?: Date;
    deleted_at?: Date;
    updated_at?: Date;
  }