import { Schema, model, Types, Document } from 'mongoose';
import { IJob } from '../types/job.types';



const jobSchema = new Schema<IJob>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      minlength: [10, 'Job title must be at least 10 characters'],
      maxlength: [150, 'Job title cannot exceed 150 characters'],
    },

    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
      minlength: [30, 'Job description must be at least 30 characters'],
      maxlength: [10000, 'Job description cannot exceed 10000 characters'],
    },

    category: {
      type: String,
      required: [true, 'Job category is required'],
      trim: true,
    },

    skills: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      required: true,
      validate: {
        validator: (skills: string[]) =>
          skills.length > 0 &&
          skills.every((skill) => skill.length > 0),
        message: 'At least one valid skill is required',
      },
    },
    applicationsCount:{
      type:Number,
      default:0
    },
    budgetType: {
      type: String,
      enum: ['fixed', 'range'],
      required: true,
    },

    budgetMin: {
      type: Number,
      required: [true, 'Minimum budget is required'],
      min: [1, 'Budget must be greater than zero'],
    },

    budgetMax: {
      type: Number,
      required: [true, 'Maximum budget is required'],
      min: [1, 'Budget must be greater than zero'],
    },

    deadline: {
      type: Date,
      required: [true, 'Job deadline is required'],
      validate: {
        validator: (deadline: Date) =>
          deadline instanceof Date &&
          !Number.isNaN(deadline.getTime()) &&
          deadline > new Date(),
        message: 'Deadline must be in the future',
      },
    },

    status: {
      type: String,
      enum: ['open', 'in_progress', 'completed', 'cancelled'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  },
);

// Validate budget consistency.
jobSchema.pre('validate', function () {
  if (this.budgetMin > this.budgetMax) {
    this.invalidate(
      'budgetMax',
      'Maximum budget must be greater than or equal to minimum budget',
    );
  }

  if (
    this.budgetType === 'fixed' &&
    this.budgetMin !== this.budgetMax
  ) {
    this.invalidate(
      'budgetMax',
      'For a fixed budget, minimum and maximum must be equal',
    );
  }
});

// Useful for fetching a client's jobs and sorting newest first.
jobSchema.index({ client: 1, createdAt: -1 });

// Useful for provider job browsing.
jobSchema.index({ status: 1, createdAt: -1 });

export const Job = model<IJob>('Job', jobSchema);



