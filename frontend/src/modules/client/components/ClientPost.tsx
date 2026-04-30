"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, Input, InputNumber, Select, DatePicker, Button, Card, Radio, Tag } from "antd";


// ---------------- Schema ----------------
const clientPostSchema = z.object({
  title: z.string().min(10, "Title is too short"),
  description: z.string().min(50, "Description must be detailed"),

  category: z.string().min(2),
  subCategory: z.string().optional(),

  budgetType: z.enum(["fixed", "hourly"]),
  budget: z.coerce.number().min(5),

  deadline: z.any().optional(),

  experienceLevel: z.enum(["beginner", "intermediate", "expert"]),

  skills: z.string().optional(),

  locationType: z.enum(["remote", "onsite"]),

  urgency: z.enum(["low", "medium", "high"]),
});

export type ClientPostFormValues = z.infer<typeof clientPostSchema>;

export default function ClientPostForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientPostSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subCategory: "",
      budgetType: "fixed",
      budget: 50,
      experienceLevel: "beginner",
      skills: "",
      locationType: "remote",
      urgency: "medium",
    },
  });

  const onSubmit = (data: ClientPostFormValues) => {
    console.log("CLIENT POST:", data);
    // API CALL: POST /api/jobs/create
  };
const { TextArea } = Input;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card title="Create a Job Post" className="shadow-lg">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>

          {/* Title */}
          <Form.Item
            label="Job Title"
            validateStatus={errors.title ? "error" : ""}
            help={errors.title?.message}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input placeholder="Need a React Developer for dashboard" {...field} />
              )}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Project Description">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea rows={6} placeholder="Describe your project in detail..." {...field} />
              )}
            />
          </Form.Item>

          {/* Category */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Category">
              <Controller
                name="category"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item label="Sub Category">
              <Controller
                name="subCategory"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Budget Type">
              <Controller
                name="budgetType"
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Radio value="fixed">Fixed</Radio>
                    <Radio value="hourly">Hourly</Radio>
                  </Radio.Group>
                )}
              />
            </Form.Item>

            <Form.Item label="Budget (PKR)">
              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <InputNumber className="w-full" {...field} />
                )}
              />
            </Form.Item>
          </div>

          {/* Experience + Urgency */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Experience Level">
              <Controller
                name="experienceLevel"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <Select.Option value="beginner">Beginner</Select.Option>
                    <Select.Option value="intermediate">Intermediate</Select.Option>
                    <Select.Option value="expert">Expert</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>

            <Form.Item label="Urgency">
              <Controller
                name="urgency"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <Select.Option value="low">Low</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="high">High</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>
          </div>

          {/* Skills */}
          <Form.Item label="Required Skills (comma separated)">
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Input placeholder="react, nodejs, plumbing, ac repair" {...field} />
              )}
            />
          </Form.Item>

          {/* Location */}
          <Form.Item label="Work Type">
            <Controller
              name="locationType"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="remote">Remote</Radio>
                  <Radio value="onsite">On-site</Radio>
                </Radio.Group>
              )}
            />
          </Form.Item>

          {/* Submit */}
          <Button type="primary" htmlType="submit" className="w-full">
            Post Job
          </Button>
        </Form>
      </Card>
    </div>
  );
}