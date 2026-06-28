
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, Input, InputNumber, Button, Card } from "antd";

// ---------------- Schema ----------------
const gigSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be detailed"),
  category: z.string().min(2),
  subCategory: z.string().min(2),
  tags: z.string().optional(),

  price: z.coerce.number().min(5),
  deliveryTime: z.coerce.number().min(1).max(30),
  revisions: z.coerce.number().min(0).max(20),

  features: z.object({
    sourceFiles: z.boolean().optional(),
    commercialUse: z.boolean().optional(),
    support: z.boolean().optional(),
  }),

  requirements: z.string().optional(),
  faq: z.string().optional(),
});

export type GigFormValues = z.infer<typeof gigSchema>;

export default function ProviderGigForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(gigSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subCategory: "",
      tags: "",
      price: 10,
      deliveryTime: 3,
      revisions: 2,
      features: {
        sourceFiles: false,
        commercialUse: false,
        support: false,
      },
      requirements: "",
      faq: "",
    },
  });

  const onSubmit = (data: GigFormValues) => {
    console.log("GIG DATA:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card title="Create Provider Gig" className="shadow-lg">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>

          {/* Title */}
          <Form.Item label="Gig Title" validateStatus={errors.title ? "error" : ""} help={errors.title?.message}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} placeholder="I will build a modern web app" />}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" validateStatus={errors.description ? "error" : ""} help={errors.description?.message}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input.TextArea rows={5} {...field} />}
            />
          </Form.Item>

          {/* Category */}
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

          {/* Tags */}
          <Form.Item label="Tags">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => <Input {...field} placeholder="react, nextjs, ui" />}
            />
          </Form.Item>

          {/* Pricing */}
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Price">
              <Controller
                name="price"
                control={control}
                render={({ field }) => <InputNumber {...field} className="w-full" />}
              />
            </Form.Item>

            <Form.Item label="Delivery Days">
              <Controller
                name="deliveryTime"
                control={control}
                render={({ field }) => <InputNumber {...field} className="w-full" />}
              />
            </Form.Item>

            <Form.Item label="Revisions">
              <Controller
                name="revisions"
                control={control}
                render={({ field }) => <InputNumber {...field} className="w-full" />}
              />
            </Form.Item>
          </div>


          {/* Requirements */}
          <Form.Item label="Requirements">
            <Controller
              name="requirements"
              control={control}
              render={({ field }) => <Input.TextArea rows={3} {...field} />}
            />
          </Form.Item>

          {/* FAQ */}
          <Form.Item label="FAQ">
            <Controller
              name="faq"
              control={control}
              render={({ field }) => <Input.TextArea rows={3} {...field} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Publish Gig
          </Button>

        </Form>
      </Card>
    </div>
  );
}