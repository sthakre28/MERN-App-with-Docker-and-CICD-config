import { Router } from 'express';
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from '../controllers/employee.controller.js';
import { validateEmployee } from '../middleware/validateEmployee.js';

const router = Router();
router.route('/').get(getEmployees).post(validateEmployee, createEmployee);
router.route('/:id').get(getEmployee).put(validateEmployee, updateEmployee).delete(deleteEmployee);
export default router;
