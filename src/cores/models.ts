import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import Sample from '../modules/models/sample.model';
import ChangeLog from './models/changeLog.model';
import { User } from './models/user.model';

const models = (sequelize: Sequelize) => {
  sequelize.addModels([
    User,
    Sample,
    ChangeLog,
  ])
}

const haiTokoModels = (haiToko: Sequelize) => {
  haiToko.addModels([
  ])
}

export { models, haiTokoModels }