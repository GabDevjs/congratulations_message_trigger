import axios from "axios";
import { DataMenssagemsTypes } from "../types/sendmailer";

export const sendMailer = async (dataMensagem: DataMenssagemsTypes) => {
    const data = {
        sendMailer: dataMensagem.email,
        nome: dataMensagem.name,
        mensssagem: dataMensagem.mensssagem
    }

    try {
        const res = await axios.post('/api/email', data);
        return res;
    } catch (error) {
        return error;
    }
}