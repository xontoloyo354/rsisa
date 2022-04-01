import Joi from 'typesafe-joi'

export const SampleRequestSchema = Joi.object({
  category: Joi.string().required().error(new Error('category is required'))
  .valid('Surat Masuk', 'Surat Keluar', 'Surat Tersimpan').error(new Error('category value not found')),
  title: Joi.string().required().error(new Error('title is required')),
  body: Joi.string().optional().allow(null),
  isCash: Joi.bool().optional().allow(null),
})

export type SampleSchema = Joi.Literal<typeof SampleRequestSchema>