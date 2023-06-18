import express,{Express} from 'express';
import taskRoutes from '../routes/taskRoutes';
import userRoutes from '../routes/userRoutes'

const router: Express = express();

router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

export default router;