import { ref } from 'vue'
import { defineStore } from 'pinia'
import ExchangeRateService from '@/services/exchange-rate'
const exchangeRatesResult = await ExchangeRateService.findAll();

export const useCurrencyStore = defineStore('currency', () => {
  const selectedCurrency = ref(exchangeRatesResult[0])
  const exchangeRates = ref(exchangeRatesResult)

  function toogleCurrency(currency: string, newExchangeRate?: number) {
    const exchangeRate = exchangeRatesResult.find(exchangeRate => exchangeRate.currency === currency);
    if (exchangeRate) {
      if (newExchangeRate) {
        exchangeRate.rate = newExchangeRate;
      }
      selectedCurrency.value = {...exchangeRate};
    }
  }

  return { selectedCurrency, toogleCurrency, exchangeRates }
})
