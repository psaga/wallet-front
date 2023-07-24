export type Address = {
    id: string;
    account: string;
    isFavorite: boolean;
    isOld: boolean;
    balance?: string;
}

export type CreateAddressDto = {
    account: string;
    isOld: boolean;
}

export type UpdateAddressDto = {
    isFavorite: boolean;
}