import { useOtpSendApiMutation } from '@/features/otp/otpApi';
import { Button, Input } from 'antd'
import React, { useRef, type ReactElement } from 'react'
import type { InputRef } from 'antd';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export default function OtpSend() {
    const email = useRef<InputRef>(null);
    const navigate = useNavigate();
    const [otpApi,{isLoading}] = useOtpSendApiMutation();

    const handleSubmit = async() => {
      
    try {
      const emailValue = email.current?.input?.value
      if(!emailValue) return;
        const res =  await otpApi({email:emailValue}).unwrap();
        console.log(res);
        
        navigate('/otp/verify',{
          state:{
            email:emailValue
          }
        })
    } catch (error:any) {
      
      toast.error(error.data.message)
    }
    }
  return (
    <div className='h-screen m-3'>
      <div className='flex sm:w-100 mt-3 gap-2 '>

      <Input ref={email} placeholder='Enter email address'  />
      <Button type='primary' disabled={isLoading} onClick={handleSubmit}>Continue</Button>
      </div>
    </div>
  )
}
