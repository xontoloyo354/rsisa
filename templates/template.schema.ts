import Joi from 'typesafe-joi';

export const ModuleNameRequestSchema = Joi.object({});

export type ModuleNameCreateRequest = Joi.Literal<typeof ModuleNameRequestSchema>;
