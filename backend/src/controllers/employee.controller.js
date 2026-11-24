import Employee from '../models/employee.model.js';

export const getEmployees = async (request, response) => {
  const { search = '', department, status } = request.query;
  const filters = {};
  if (search.trim()) filters.$or = [
    { firstName: { $regex: search.trim(), $options: 'i' } },
    { lastName: { $regex: search.trim(), $options: 'i' } },
    { employeeId: { $regex: search.trim(), $options: 'i' } }
  ];
  if (department) filters.department = department;
  if (status) filters.status = status;
  const employees = await Employee.find(filters).sort({ createdAt: -1 });
  response.json(employees);
};

export const getEmployee = async (request, response) => {
  const employee = await Employee.findById(request.params.id);
  if (!employee) return response.status(404).json({ message: 'Employee not found.' });
  response.json(employee);
};

export const createEmployee = async (request, response) => {
  const employee = await Employee.create(request.body);
  response.status(201).json(employee);
};

export const updateEmployee = async (request, response) => {
  const employee = await Employee.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
  if (!employee) return response.status(404).json({ message: 'Employee not found.' });
  response.json(employee);
};

export const deleteEmployee = async (request, response) => {
  const employee = await Employee.findByIdAndDelete(request.params.id);
  if (!employee) return response.status(404).json({ message: 'Employee not found.' });
  response.status(204).send();
};
