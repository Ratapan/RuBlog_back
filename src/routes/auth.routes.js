import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller';

const router = Router();

router.post('/signup', authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.get('/checkup/:validate', authCtrl.checkup);

export default router;