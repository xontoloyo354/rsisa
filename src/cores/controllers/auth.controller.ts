import { Request, Response } from 'express'

export default class AuthControler {
  public static login = async (req: Request, res: Response) => {
    res.render('pages/login.pug', {
      errors: req.flash('error'),
    })
  }

  public static logout = async (req: Request, res: Response) => {
    req.session.destroy((error: Error) => {
      if (error) {
        throw Error(error.message);
      }
      res.redirect('/login');
    });
  }
}
