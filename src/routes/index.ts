import { Router } from "express";
import authRouter from "../modules/seller/seller.route.js";
import testRouter from "../modules/test/test.route.js"
import userRouter from '../modules/user/user.route.js'

const router = Router()

type RouteType = {
  path: string;
  route: any;
};

const routes: RouteType[] = [
  {
    path: "/seller",
    route: authRouter,
  },
  {
    path:"/test",
    route:testRouter
  },
  {
    path:"/me",
    route:userRouter
  }
];

routes.forEach(({path,route}) => {
    router.use(path,route)
});

export default router
