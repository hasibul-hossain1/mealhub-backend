import { Router } from "express";
import authRouter from "../modules/seller/seller.route";
import testRouter from "../modules/test/test.route"

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
  }
];

routes.forEach(({path,route}) => {
    router.use(path,route)
});

export default router
