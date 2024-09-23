import { Router } from 'express';
import { UserController } from '../Controllers/controllerUser';
import { PostController } from '../Controllers/controllerPost';
import { InstituicaoController } from '../Controllers/controllerInstituicao';
import { CommentController } from '../Controllers/controllerComment';
import { AuthMiddleware } from '../middlewares/AteticacaoMiddleware';
import { AuteticaControleer } from '../Controllers/AuthController';
import { upload } from '../upload';

const router = Router();

const userController = new UserController();
const auteticaControler = new AuteticaControleer();

const postController = new PostController();
const instituicaoController = new InstituicaoController();
const commentController = new CommentController();

// Rotas de Usuários
router.post('/login', auteticaControler.auteticacao);
router.post('/register', userController.create);

router
	.route('/user/me')
	.get(AuthMiddleware, userController.read)
	.patch(AuthMiddleware, userController.update)
	.delete(AuthMiddleware, userController.delete);

router.patch(
	'/user/me/upload',
	AuthMiddleware,
	upload.single('image'),
	userController.updateImage
);

// Rotas da Postagem
router
	.route('/post')
	.post(AuthMiddleware, postController.create)
	.get(AuthMiddleware, postController.readAll);
router
	.route('/post/:postId')
	.put(AuthMiddleware, postController.update)
	.delete(AuthMiddleware, postController.delete);
router.get('/post/user', AuthMiddleware, postController.readByUser)

// Rotas da Instituição
router
	.route('/instituicao')
	.post(AuthMiddleware, instituicaoController.create)
	.get(AuthMiddleware, instituicaoController.readAll);
router
	.route('/instituicao/:instituicaoId')
	.delete(AuthMiddleware, instituicaoController.delete)
	.put(AuthMiddleware, instituicaoController.update);

// Rotas dos Comentários da Postagem
router
	.route('/post/:postId/comment')
	.post(AuthMiddleware, commentController.create)
	.get(AuthMiddleware, commentController.readAll);
router
	.route('/post/:postId/comment/:id')
	.get(AuthMiddleware, commentController.read)
	.put(AuthMiddleware, commentController.update)
	.delete(AuthMiddleware, commentController.delete);

export default router;
