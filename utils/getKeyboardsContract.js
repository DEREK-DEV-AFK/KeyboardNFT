import { ethers } from "ethers";

import abi from "../utils/Keyboards.json";

const contractAddress = '0xBe8808a77Fa9a7F032Be8ef99D01396401078907';
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
    if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        return undefined;
    }
}