import { useOtpPasswordResetApiMutation } from '@/features/otp/otpApi'
import { Button, Input, type InputRef } from 'antd'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router'
import { passwordSchema } from '@/types/global.schemas'
function OtpResetPassword() {
    const newPasswordRef = useRef<InputRef>(null)
    const confirmNewPasswordRef = useRef<InputRef>(null)
    const [otpResetPasswordApi,{isLoading}] = useOtpPasswordResetApiMutation()
    const location = useLocation();
    const navigate = useNavigate();
    const resetToken = location.state.resetToken
    const handleSubmit = async() => {
        try {
            const newPasswordValue = newPasswordRef.current?.input?.value
            const confirmPasswordValue = confirmNewPasswordRef.current?.input?.value
            // Empty check
            if(newPasswordValue?.trim() == "" || confirmPasswordValue?.trim() == ""  ){
                toast.error("New password and confirm password can't be empty")
            }
            console.log("Token is: ",resetToken);
            //validate password with zod
            const result = passwordSchema.safeParse(newPasswordValue);
            if(!result.success){
                toast.error(result.error.issues[0].message)
                return;
            }
            if(newPasswordValue != confirmPasswordValue){
                toast.error("Password do not match");
                return;
            }
            if(newPasswordValue && confirmPasswordValue){
                await otpResetPasswordApi({resetToken,newPassword:newPasswordValue,confirmPassword:confirmPasswordValue}).unwrap()
                
                navigate('/login')
            }
        } catch (e:any) {
            // toast.error(e.data.message)
            console.log(e);
        }
    }
  return (
    <div className='grid justify-items-start gap-3'>
        {/* <div> */}

        <Input className='sm:!w-1/2' ref={newPasswordRef} placeholder='Enter new password'/>
        <Input className='sm:!w-1/2' ref={confirmNewPasswordRef} placeholder='Enter confirm password'/>
        {/* </div> */}
        <Button disabled={isLoading} onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default OtpResetPassword