import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/LoginRequired';

const router = new Router();

router.get('/', userController.index);
router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/:id', loginRequired, userController.delete);

export default router;
