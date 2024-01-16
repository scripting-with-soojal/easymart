import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
    CreateCategoryController,
    DeleteCategoryController,
    ShowCategoryController,
    ShowSingleCategory,
    UpdateCategoryController
} from '../controllers/CategoryController.js';

const router = express();

router.get('/showcategory', ShowCategoryController);

router.get('/showsinglecategory', ShowSingleCategory)

router.post('/createcategory', requireSignIn, isAdmin, CreateCategoryController);

router.put('/updatecategory/:slugname', requireSignIn, isAdmin, UpdateCategoryController);

router.delete('/deletecategory/:slug', requireSignIn, isAdmin, DeleteCategoryController);

export default router

