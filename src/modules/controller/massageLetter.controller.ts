import { Request, Response } from 'express'

export default class MessageControler {
  public static direksi = async (req: Request, res: Response) => {
    console.log('here')
    return res.render('pages/messageDireksi.pug')
  }
  public static sekretariat = async (req: Request, res: Response) => {
    console.log('here')
    return res.render('pages/messageSekretariat.pug')
  }
}
