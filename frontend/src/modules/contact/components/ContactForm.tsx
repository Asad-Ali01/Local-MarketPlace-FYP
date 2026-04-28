import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "antd";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { contactSchema, type contactSchemaType } from "../schemas/contactSchema";

function ContactForm() {
  const form = useForm<contactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleContact = async (data: contactSchemaType) => {
    console.log(data);

    try {
      // 👉 Replace with API later
      await new Promise((res) => setTimeout(res, 1000));

      toast.success("Message sent successfully!");
      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="w-11/12 mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleContact)} className="space-y-4">
          
          {/* Name */}
          <div>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...field} />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Email */}
          <div>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" {...field} />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Subject */}
          <div>
            <Controller
              name="subject"
              control={form.control}
              render={({ field }) => (
                <>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...field} />
                  {form.formState.errors.subject && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Message */}
          <div>
            <Controller
              name="message"
              control={form.control}
              render={({ field }) => (
                <>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="w-full border rounded-md p-2 min-h-25"
                    {...field}
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;