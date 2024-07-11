import router from "express";
import protect from "../middleware/protectMiddleware.js";
import { createNewSubCategory, getSubCategory } from "../controllers/subCategoryController.js"
const subCategoryRouter = router.Router();


subCategoryRouter.route("/").get(getSubCategory);
subCategoryRouter.route("/").post(createNewSubCategory);

export default subCategoryRouter;