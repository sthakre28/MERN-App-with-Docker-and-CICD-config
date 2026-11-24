const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const departments = ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'Operations'];
const statuses = ['Active', 'Inactive'];

export const validateEmployee = (request, response, next) => {
  const { employeeId, firstName, lastName, email, department, designation, salary, status, joiningDate } = request.body;
  const errors = {};

  if (!employeeId?.trim()) errors.employeeId = 'Employee ID is required.';
  if (!firstName?.trim()) errors.firstName = 'First name is required.';
  if (!lastName?.trim()) errors.lastName = 'Last name is required.';
  if (!email?.trim() || !emailPattern.test(email)) errors.email = 'Enter a valid email address.';
  if (!departments.includes(department)) errors.department = 'Select a valid department.';
  if (!designation?.trim()) errors.designation = 'Designation is required.';
  if (salary === undefined || Number.isNaN(Number(salary)) || Number(salary) < 0) errors.salary = 'Salary must be a non-negative number.';
  if (!statuses.includes(status)) errors.status = 'Select a valid status.';
  if (!joiningDate || Number.isNaN(Date.parse(joiningDate))) errors.joiningDate = 'Enter a valid joining date.';

  if (Object.keys(errors).length > 0) return response.status(400).json({ message: 'Please correct the highlighted fields.', errors });
  next();
};
