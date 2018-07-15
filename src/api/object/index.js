import express from 'express';
import ctrl from './object.ctrl';

const router = express.Router();

router.route('/object')
.post(ctrl.post_method);

router.route('/object/:id')
.get(ctrl.get_method);

export default router;
