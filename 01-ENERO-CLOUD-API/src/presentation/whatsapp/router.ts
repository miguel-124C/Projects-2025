import { Router } from 'express';
import { WhatsAppController } from './controller';
import { WhatsAppCloudApi } from '../services/whatsapp-cloud-api.service';

export class WhatsAppRoutes {


  static get routes(): Router {

    const router = Router();
    
    const whatsAppCloudApi = new WhatsAppCloudApi();
    const controller = new WhatsAppController( whatsAppCloudApi );

    // Definir las rutas
    router.get('/notifications', controller.verifyToken );
    router.post('/notifications', controller.messages );
    
    router.post('/sendMessage', controller.sendMessage );

    return router;
  }


}