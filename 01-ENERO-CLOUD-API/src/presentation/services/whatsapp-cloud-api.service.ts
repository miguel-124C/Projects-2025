import { WhatsAppService } from "../interfaces/whatsapp-service";
import axios from "axios";
import { Envs } from '../../config/envs';
import { ReciveMessageWhatsAppDto } from "../../domain/dtos/recive-message-whatsapp.dto";

export class WhatsAppCloudApi implements WhatsAppService {

    private readonly basUrl = `${Envs.CLOUD_API_BASE_URL}/${Envs.CLOUD_API_VERSION}`;

    sendMessage = async (to: string, message: string) => {
        try {
            await axios({
                method: "POST",
                url: `${this.basUrl}/${Envs.WHATSAPP_BUSINESS_PHONE_NUMBER_ID}/messages`,
                data: {
                  messaging_product: "whatsapp",
                  to,
                  type: 'text', // Hacer esto dinamico
                  text: { body: message },
                },
                headers: {
                   "Content-Type": "application/json",
                   "Authorization": "Bearer " + Envs.WHATSAPP_TOKEN
                },
            });

            return true;
        } catch (error) {
            throw error;
        }
    };

    validateToken = async (mode: string, token: string, verifyToken: string) => {
        try {
            if (mode === "subscribe" && token === verifyToken) {
                console.log("WEBHOOK_VERIFIED");
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    };

    reciveMessage = async (reciveMessageWhatsAppDto: ReciveMessageWhatsAppDto ) => {
        const { contacts, messages } = reciveMessageWhatsAppDto!;
        console.log({
          "Mensaje de: " : contacts.profile,
          "Con numero: ": messages.from,
          "Escribio: ": messages.text.body,
          "A las: ": messages.timestamp,
        });
        return true;
    }
}