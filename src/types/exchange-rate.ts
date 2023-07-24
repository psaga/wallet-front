export type ExchangeRate = {
    id: string;
    currency: string;
    rate: number;
}

export type UpdateExchangeRateDto = Omit<ExchangeRate, "id">