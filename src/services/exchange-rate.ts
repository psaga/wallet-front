import type { ExchangeRate, UpdateExchangeRateDto } from '@/types/exchange-rate';
import axios from 'axios';

class ExchangeRateService {
    update = async (id: string, updateExchangeRateDto: UpdateExchangeRateDto) => {
        const response = await axios.put(`api/exchange-rates/${id}`, updateExchangeRateDto);
        return response.data;
    };

    findAll = async (): Promise<ExchangeRate[]> => {
        const response = await axios.get("api/exchange-rates");
        return response.data;
    };
}

export default new ExchangeRateService();