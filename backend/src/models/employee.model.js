import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    department: {
      type: String,
      required: true,
      enum: ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'Operations']
    },
    designation: { type: String, required: true, trim: true, maxlength: 100 },
    salary: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    joiningDate: { type: Date, required: true }
  },
  { timestamps: true }
);

employeeSchema.index({ firstName: 1, lastName: 1 });

export default mongoose.model('Employee', employeeSchema);
