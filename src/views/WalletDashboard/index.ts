import { defineComponent } from "vue";
import Currency from "@/components/Currency/CurrencyComponent.vue";
import ModalNewAddress from "@/components/ModalNewAddress/ModalNewAddressComponent.vue";
import Addresses from "@/components/Addresses/AddressesComponent.vue";
import { useAddressStore } from "@/stores/address";
import { storeToRefs } from "pinia";

const addressStore = useAddressStore() 
const {addresses} = storeToRefs(addressStore);

export default defineComponent({
    name: "WalletDashboard",
    components: {
      Currency,
      ModalNewAddress,
      Addresses,
    },
    computed: {
      totalBalance() {
        return addresses.value.reduce((accumulator, address) => {
          const balance = address && address.balance ? Number(address.balance) : 0;
          return accumulator + balance;
        }, 0);
      }
    }
  });