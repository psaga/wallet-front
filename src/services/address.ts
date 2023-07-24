import type { Address, CreateAddressDto, UpdateAddressDto } from '@/types/address';
import axios from 'axios';
import { toRaw } from 'vue';

const ETHER_SCAN_ADDRESS_API = 'https://api.etherscan.io/api?module=account'
const YEAR_AGO_UNIX = 31536000;

class AddressService {
    addAddress = async (createAddressDto: CreateAddressDto): Promise<Address> => {
        console.log(toRaw(createAddressDto))
        const response = await axios.post("api/addresses", createAddressDto);
        return response.data;
    };

    updateAddress = async (addressId: string, updateAddressDto: UpdateAddressDto) => {
        const response = await axios.put(`api/addresses/${addressId}`, updateAddressDto);
        return response.data;
    };

    deleteAddress = async (addressId: string) => {
        console.log(addressId)
        const response = await axios.delete(`api/addresses/${addressId}`);
        return response.data;
    }

    getAddress = async (addressAccount: string): Promise<Address> => {
        const response = await axios.get(`api/addresses/${addressAccount}`);
        return JSON.parse(JSON.stringify(response.data));
    };

    getAddresses = async (): Promise<Address[]> => {
        const response = await axios.get("api/addresses");
        return JSON.parse(JSON.stringify(response.data));
    };

    getAddressesBalance = async (addresses: string): Promise<any []> => {
        const response = await axios.get(`${ETHER_SCAN_ADDRESS_API}&action=balancemulti&address=${addresses}&tag=latest&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`);
        return response.data.result;
    };

    getAddressBalance = async (address: string): Promise<any> => {
        const response = await axios.get(`${ETHER_SCAN_ADDRESS_API}&action=balance&address=${address}&tag=latest&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`);
        return response.data.result;
    };

    getIsAddressOld = async (address: string): Promise<boolean> => {
        const response = await axios.get(`${ETHER_SCAN_ADDRESS_API}&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`);
        const transactions = response.data.result;
        const currentDateUnix = Math.floor(Date.now() / 1000);
        const isOld = transactions.length && transactions[0].timeStamp < (currentDateUnix - YEAR_AGO_UNIX) as boolean;
        return isOld;
    }

}

export default new AddressService();