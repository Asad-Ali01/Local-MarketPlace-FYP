import { useResetPasswordApiMutation } from '@/features/auth/authApi';
import { resetPasswordSchema, type resetPasswordType } from '@/schemas/global.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { useForm, type UseFormRegister } from 'react-hook-form';
import { FieldError } from '../ui/field';
import { Error } from './Error';
import { useAppDispatch } from '@/hooks/useAppDispatchSelector';
import { logoutUser } from '@/features/auth/authSlice';

type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, getValues, handleSubmit, formState } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const [resetPasswordApi] = useResetPasswordApiMutation();
  const dispatch = useAppDispatch();
  const submitHandler = async (e: resetPasswordType) => {
    const values = getValues();

    console.log(getValues());
    await resetPasswordApi(values).unwrap();
    // Call your API here
    dispatch(logoutUser());
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <section className="mb-6 flex items-start justify-between">
            <div>
              <Dialog.Title className="text-xl font-semibold">Change Password</Dialog.Title>

              <Dialog.Description className="text-sm text-gray-500">
                Update your password to keep your account secure.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button>
                <X size={18} />
              </button>
            </Dialog.Close>
          </section>

          <Form.Root onSubmit={handleSubmit(submitHandler)} className="space-y-5">
            <PasswordField
              register={register}
              label="Old Password"
              name="oldPassword"
              placeholder="Enter your current password"
              visible={showOld}
              onToggle={() => setShowOld(!showOld)}
            />
            <Error msg={formState.errors.oldPassword?.message} />

            <PasswordField
              register={register}

              label="New Password"
              name="newPassword"
              placeholder="Enter your new password"
              visible={showNew}
              onToggle={() => setShowNew(!showNew)}
            />
            <Error msg={formState.errors.newPassword?.message} />

            <PasswordField
              register={register}

              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              visible={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
            />
            <Error msg={formState?.errors?.confirmPassword?.message} />

            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="rounded-md border px-4 py-2">
                  Cancel
                </button>
              </Dialog.Close>

              <Form.Submit asChild>
                <button className="rounded-md bg-black px-4 py-2 text-white">
                  Update Password
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type PasswordFieldProps = {
  register: UseFormRegister<resetPasswordType>;
  label: string;
  name: 'oldPassword' | 'newPassword' | 'confirmPassword';
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
};

function PasswordField({
  register,
  label,
  name,
  placeholder,
  visible,
  onToggle,
}: PasswordFieldProps) {
  return (
    <Form.Field name={name}>
      <div className="mb-2 flex items-center justify-between">
        <Form.Label className="text-sm font-medium">{label}</Form.Label>

        <Form.Message match="valueMissing">Required</Form.Message>
      </div>

      <div className="relative">
        <Form.Control asChild>
          <input
            {...register(name)}
            required
            type={visible ? 'text' : 'password'}
            placeholder={placeholder}
            className="w-full rounded-md border px-3 py-2 pr-10 outline-none focus:border-blue-500"
          />
        </Form.Control>

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    </Form.Field>
  );
}
