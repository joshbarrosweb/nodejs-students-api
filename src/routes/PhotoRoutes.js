import { Router } from 'express';
import loginRequired from '../middlewares/LoginRequired';

import photoController from '../controllers/PhotoController';

const router = new Router();

router.post('/', loginRequired, photoController.store);

export default router;
