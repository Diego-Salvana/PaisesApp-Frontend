export interface Auth {
   email: string;
   password: string;
}

export interface User extends Auth {
   username: string;
   favorites?: string[];
}

export interface ResponseUser {
   username: string;
   favorites?: string[];
   JWToken: string;
}

export interface ResponseFavorites {
   updatedFavorites: string[];
}

export interface CurrentUser {
   username?: string;
}
