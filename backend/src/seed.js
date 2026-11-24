import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from './config/db.js';
import Employee from './models/employee.model.js';

const employees = [
  ['EMP-1001', 'Avery', 'Morgan', 'avery.morgan@example.com', 'Engineering', 'Senior Software Engineer', 98000, 'Active', '2022-03-14'],
  ['EMP-1002', 'Jordan', 'Lee', 'jordan.lee@example.com', 'Engineering', 'Frontend Developer', 84000, 'Active', '2023-01-09'],
  ['EMP-1003', 'Priya', 'Shah', 'priya.shah@example.com', 'Human Resources', 'People Operations Manager', 76000, 'Active', '2021-08-23'],
  ['EMP-1004', 'Mateo', 'Rivera', 'mateo.rivera@example.com', 'Finance', 'Financial Analyst', 72000, 'Active', '2024-02-05'],
  ['EMP-1005', 'Nora', 'Bennett', 'nora.bennett@example.com', 'Marketing', 'Content Strategist', 68000, 'Inactive', '2020-11-16'],
  ['EMP-1006', 'Elias', 'Kim', 'elias.kim@example.com', 'Operations', 'Operations Lead', 79000, 'Active', '2022-06-20'],
  ['EMP-1007', 'Sofia', 'Turner', 'sofia.turner@example.com', 'Engineering', 'QA Engineer', 74000, 'Active', '2023-04-17'],
  ['EMP-1008', 'Caleb', 'Nguyen', 'caleb.nguyen@example.com', 'Finance', 'Finance Manager', 92000, 'Active', '2019-09-30'],
  ['EMP-1009', 'Amara', 'Wilson', 'amara.wilson@example.com', 'Marketing', 'Brand Manager', 81000, 'Active', '2021-12-01'],
  ['EMP-1010', 'Theo', 'Carter', 'theo.carter@example.com', 'Operations', 'Logistics Coordinator', 61000, 'Inactive', '2024-05-13'],
  ['EMP-1011', 'Maya', 'Patel', 'maya.patel@example.com', 'Human Resources', 'Recruiter', 65000, 'Active', '2023-07-24'],
  ['EMP-1012', 'Owen', 'Foster', 'owen.foster@example.com', 'Engineering', 'Backend Developer', 88000, 'Active', '2022-10-10'],
  ['EMP-1013', 'Lena', 'Brooks', 'lena.brooks@example.com', 'Operations', 'Office Coordinator', 57000, 'Active', '2024-01-22'],
  ['EMP-1014', 'Ravi', 'Desai', 'ravi.desai@example.com', 'Finance', 'Accountant', 69000, 'Inactive', '2020-04-06'],
  ['EMP-1015', 'Isla', 'Reed', 'isla.reed@example.com', 'Marketing', 'Marketing Coordinator', 59000, 'Active', '2024-08-19']
].map(([employeeId, firstName, lastName, email, department, designation, salary, status, joiningDate]) => ({ employeeId, firstName, lastName, email, department, designation, salary, status, joiningDate }));

try {
  await connectDatabase();
  await Promise.all(employees.map((employee) => Employee.updateOne({ employeeId: employee.employeeId }, { $set: employee }, { upsert: true })));
  console.log(`Seeded ${employees.length} employees.`);
} catch (error) {
  console.error(`Seed failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
