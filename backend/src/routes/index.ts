import express,{Express} from 'express';
import taskRoutes from '../routes/taskRoutes';
import userRoutes from '../routes/userRoutes'

const router: Express = express();

router.use('/task', taskRoutes);
router.use('/user', userRoutes);

export default router;