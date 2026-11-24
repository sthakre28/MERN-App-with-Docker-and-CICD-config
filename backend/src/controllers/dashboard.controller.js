import Employee from '../models/employee.model.js';

export const getDashboardStats = async (request, response) => {
  const [totalEmployees, activeEmployees, inactiveEmployees, departments, recentEmployees] = await Promise.all([
    Employee.countDocuments(),
    Employee.countDocuments({ status: 'Active' }),
    Employee.countDocuments({ status: 'Inactive' }),
    Employee.distinct('department'),
    Employee.find().sort({ createdAt: -1 }).limit(5)
  ]);

  response.json({ totalEmployees, activeEmployees, inactiveEmployees, totalDepartments: departments.length, recentEmployees });
};
