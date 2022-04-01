import { Request, Response } from 'express';
import { RSISARequest } from '../typings/request';

export default class DashboardControler {
  public static index = async (req: RSISARequest, res: Response) => {
    return res.render('pages/home2.pug');
  };
}
