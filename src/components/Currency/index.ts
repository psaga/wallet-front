import { defineComponent } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";
import ExchangeRateService from '@/services/exchange-rate'

const currencyStore = useCurrencyStore()
const {toogleCurrency} = currencyStore;
const {selectedCurrency, exchangeRates} = storeToRefs(currencyStore);

export default defineComponent({
  name: "CurrencyComponent",
  props: {
    totalBalance: {
        type: Number
    }
  },
  data() {
    return {
        selectedCurrency,
        toogleCurrency,
        exchangeRates,
        editRate: false,
        newExchangeRate: 0
    };
  },
  methods: {
    toogleEditRate() {
      this.editRate = !this.editRate;
    },
    async saveNewRate() {
      this.toogleCurrency(this.selectedCurrency.currency, this.newExchangeRate);
      await ExchangeRateService.update(this.selectedCurrency.id, {currency: this.selectedCurrency.currency, rate: this.selectedCurrency.rate});
      this.toogleEditRate();
    }
  },
});