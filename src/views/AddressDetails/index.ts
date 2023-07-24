import { defineComponent } from "vue";
import Currency from "@/components/Currency/CurrencyComponent.vue";
import type { Address } from "@/types/address";
import AddressService from '@/services/address'
import { ethers } from "ethers";
import router from "@/router";

export default defineComponent({
    name: "AddressDetails",
    components: {
      Currency,
    },
    data() {
      return {
        currentAddress: {} as Address
      };
    },
    methods: {
        async deleteAddress() {
            await AddressService.deleteAddress(this.currentAddress.id);
            router.push('/');
        }
    },
    async mounted() {
        const addressAccount = this.$route.params.id as string;
        const curentAccount = await AddressService.getAddress(addressAccount);
        const currentBalance = await AddressService.getAddressBalance(addressAccount);
        this.currentAddress = {
            ...curentAccount,
            balance: ethers.formatEther(currentBalance),
        }
    },
  });