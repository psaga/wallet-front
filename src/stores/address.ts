import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Address } from '@/types/address';

export const useAddressStore = defineStore('address', () => {
  const addresses = ref([] as Address[])

  function setAddresses(newAddresses: Address[]) {
    addresses.value = newAddresses;
  }

  return { addresses, setAddresses }
})
