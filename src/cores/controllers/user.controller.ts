import { Response } from 'express'
import UserRepository from '../repository/user.repository'
import { RSISARequest } from '../typings/request'

export default class UserController {
  public static index = async (req: RSISARequest, res: Response) => {
    return res.render('pages/master/user/index.pug')
  }
  public static json = async (req: RSISARequest, res: Response) => {
    const offset = typeof req.query.q === 'string' ? req.query.q : undefined
    const limit = typeof req.query.q === 'string' ? req.query.q : undefined
    const userList = await UserRepository.datatable(req.query.search, offset, limit)
    res.json({
      rows: userList.rows,
      total: userList.count,
      totalNotFiltered: userList.count,
    })
  }
  public static create = async (req: RSISARequest, res: Response) => {
    delete req.body._csrf
    const user = await UserRepository.create(req.user.id, req.body)
    res.json(user)
  }
  public static checkUsername = async (req: RSISARequest, res: Response) => {
    const username: string = String(req.query.username)
    const user = await UserRepository.getByUsername(username)
    if (!user || user.id === Number(req.query.userId)) {
      res.json(true)
    } else {
      res.json('Nomor Handphone Sudah Ada')
    }
  }
  public static update = async (req: RSISARequest, res: Response) => {
    delete req.body._csrf
    const userId = Number(req.params.userId)
    const user = await UserRepository.update(req.user.id, userId, req.body)
    res.json(user)
  }
  public static delete = async (req: RSISARequest, res: Response) => {
    delete req.body._csrf
    const userId = Number(req.params.userId)
    await UserRepository.delete(req.user.id, userId)
    res.json({ message: 'user berhasil dihapus' })
  }
}
