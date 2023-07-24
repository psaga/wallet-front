import type { Address } from "@/types/address";
import { defineComponent } from "vue";
import AddressService from '@/services/address'
import { ethers } from 'ethers';
import { storeToRefs } from "pinia";
import { useAddressStore } from "@/stores/address";
import { useCurrencyStore } from "@/stores/currency";

const currencyStore = useCurrencyStore()
const {selectedCurrency} = storeToRefs(currencyStore);

const addressStore = useAddressStore() 
const { addresses } = storeToRefs(addressStore)

export default defineComponent({
    name: "AddressesComponent",
    data() {
      return {
        addresses,
        loading: true,
        selectedCurrency,
        sortByFavorite: false,
      };
    },
    methods: {
      async getAddresses() {
        this.addresses = await AddressService.getAddresses();
      },
      async getAddressesBalance() {
        if(this.addresses.length) {
            const concatenatedAddresses = this.addresses.map(address => address.account).join(", ");
            const addressesBalanceWei = await AddressService.getAddressesBalance(concatenatedAddresses);
            addressesBalanceWei.forEach((address, idx) => {
              this.addresses[idx].balance = ethers.formatEther(address.balance);
            });
        }
      },
      async toogleFavoriteAddress(address: Address) {
        const updatedAddress = await AddressService.updateAddress(address.id, {isFavorite: !address.isFavorite})
        address.isFavorite = updatedAddress.isFavorite;
      },
      toogleSortByFavorite() {
        this.sortByFavorite = !this.sortByFavorite;
      },
    },
    watch: {
      async addresses() {
        await this.getAddressesBalance();
      },
      sortByFavorite() {
        if(this.sortByFavorite) {
            this.addresses.sort((firstAddress, secondAddress) => (firstAddress.isFavorite === secondAddress.isFavorite)? 0 : firstAddress.isFavorite? -1 : 1)
        } else {
            this.addresses.sort((firstAddress, secondAddress) => parseInt(firstAddress.id) - parseInt(secondAddress.id))
        }
      }
    },
    async mounted() {
      await this.getAddresses();
      await this.getAddressesBalance();
      this.loading = false;
      setInterval(this.getAddressesBalance, 60000); 
    },
    computed: {
      totalBalance() {
        return this.addresses.reduce((accumulator, address) => {
          const balance = address && address.balance ? Number(address.balance) : 0;
          return accumulator + balance;
        }, 0);
      }
    }
  });