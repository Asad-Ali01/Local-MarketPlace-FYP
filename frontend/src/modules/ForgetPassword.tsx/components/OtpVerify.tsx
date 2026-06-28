import { useOtpSendApiMutation, useOtpVerifyApiMutation } from '@/features/otp/otpApi'
import { Button, Input, type InputRef } from 'antd'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router'

function OtpVerify() {
    const otpRef = useRef<InputRef>(null)
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email
    const[otpVerify] = useOtpVerifyApiMutation()
      const [otpApi,{isLoading}] = useOtpSendApiMutation();
      const handleOtpSend = async() => {
        try {
        const res = await otpApi({email}).unwrap();
        toast.success(res.message)
        } catch (e:any) {
          toast.error(e.data.message);
        }
      }
    const handleClick = async() => {
        try {
          const res =  await otpVerify({otp:otpRef.current?.input?.value,email}).unwrap()
          console.log(res);
           navigate('/otp/reset-password',{
          state:{
            resetToken:res.data?.resetToken
          }
        })
        } catch (e:any) {
            toast.error(e.data.message)
        } 
    }
  return (
    <div className='flex px-2 sm:w-1/2 xl:w-1/3'>
      <div>

        <Input ref={otpRef} placeholder='Enter otp' />
        <Button className='mt-2' type='primary' onClick={handleOtpSend}>Resend OTP</Button>
      </div>
      

        <Button type='primary' onClick={handleClick}>Continue</Button>
      
        
    </div>
  )
}

export default OtpVerify