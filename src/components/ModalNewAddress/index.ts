import { defineComponent, reactive } from "vue";
import AddressService from '@/services/address'
import { isAddress } from 'ethers';
import { Modal as BootstrapModal }  from "bootstrap";
import type {Modal as BootstrapModalType} from '@types/bootstrap';
import { useAddressStore } from "@/stores/address";
import { storeToRefs } from "pinia";

const addressStore = useAddressStore() 
const { addresses } = storeToRefs(addressStore)
const {setAddresses} = addressStore;

const state = reactive({
  modalNewAddress: {} as BootstrapModalType,
})

export default defineComponent({
    name: "ModalNewAddress",
    data() {
      return {
        addresses,
        newAddress: "",
        repeatedAddress: false,
        invalidAddress: false,
      };
    },
    methods: {
      async addNewAddress() {
        if (!isAddress(this.newAddress)) {
          this.invalidAddress = true;
          return;
        }
        if (this.addresses.find(address => address.account === this.newAddress)) {
          this.repeatedAddress = true;
          return;
        }
        const isAddressOld = await AddressService.getIsAddressOld(this.newAddress);
        const newAddress = await AddressService.addAddress({account: this.newAddress, isOld: isAddressOld});
        setAddresses([...this.addresses, newAddress]);
        state.modalNewAddress.hide();
      },
    },
    watch: {
        newAddress() {
          this.repeatedAddress = false;
          this.invalidAddress = false;
        },
    },
    async mounted() {
      state.modalNewAddress = new BootstrapModal('#addNewAddressModal', {})
    },
  });