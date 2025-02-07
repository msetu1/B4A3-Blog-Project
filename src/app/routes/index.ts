import { Router } from 'express';
import { AdminRoutes } from '../module/admin/admin.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { BlogRoutes } from '../module/blog/blog.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
