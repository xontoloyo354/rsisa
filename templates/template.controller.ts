import { Response, Router } from 'express';
import RepositoryNameRepository from './ModuleName.repository';
import { ModuleNameRequestSchema } from './ModuleName.schema';

const ModuleNameRouter = Router();
ModuleNameRouter.get(
  '/',
  asyncHandler(async (req: CekTokoRequest, res: Response) => {
    return res.render('pages/ParentName/ModuleName/index.pug');
  }),
);
ModuleNameRouter.get(
  '/json',
  asyncHandler(async (req: CekTokoRequest, res: Response) => {
    const dataList = await RepositoryNameRepository.datatable(
      req.query.search,
      req.query.offset,
      req.query.limit,
    );
    res.json({
      rows: dataList.rows,
      total: dataList.count,
      totalNotFiltered: dataList.count,
    });
  }),
);
ModuleNameRouter.post(
  '/create',
  apiMiddleware,
  asyncHandler(async (req: CekTokoRequest, res: Response) => {
    delete req.body._csrf;
    const { error, value } = ModuleNameRequestSchema.validate(req.body, {
      abortEarly: false,
    });
    if (redirectBackIfError(error, req, res)) {
      return;
    }
    const data = await RepositoryNameRepository.create(req.user, value);
    ChangeLogService.getInstance().create({
      userId: req.user.id,
      module: ChangeLogModule.ref,
      relatedId: data.id,
      type: ChangeLogType.create,
      description: 'Tambah ModuleName',
      previousData: {},
      nextData: data,
    });
    res.json(data);
  }),
);
ModuleNameRouter.put(
  '/:id/update',
  apiMiddleware,
  asyncHandler(async (req: CekTokoRequest, res: Response) => {
    delete req.body._csrf;
    const { error, value } = ModuleNameRequestSchema.validate(req.body);
    if (redirectBackIfError(error, req, res)) {
      return;
    }
    const oldData = await RepositoryNameRepository.get(req.params.id);
    const data = await RepositoryNameRepository.update(req.user, req.params.id, value);
    ChangeLogService.getInstance().create({
      userId: req.user.id,
      module: ChangeLogModule.ref,
      relatedId: data.id,
      type: ChangeLogType.update,
      description: 'Update ModuleName',
      previousData: oldData,
      nextData: data,
    });
    res.json(data);
  }),
);
ModuleNameRouter.get(
  '/:id/delete',
  apiMiddleware,
  asyncHandler(async (req: CekTokoRequest, res: Response) => {
    const oldData = await RepositoryNameRepository.get(req.params.id);
    await RepositoryNameRepository.delete(req.user, req.params.id);
    ChangeLogService.getInstance().create({
      userId: req.user.id,
      module: ChangeLogModule.ref,
      relatedId: oldData.id,
      type: ChangeLogType.delete,
      description: 'Hapus Potongan  ModuleName',
      previousData: oldData,
      nextData: null,
    });
    res.json({ message: 'ModuleName berhasil dihapus' });
  }),
);
const ModuleNameController = Router();
ModuleNameController.use('/UrlName', isAuthenticated, ModuleNameRouter);
export default ModuleNameController;
