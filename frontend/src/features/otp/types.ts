export interface IOtpVerifyRequest{
    email:string;
    otp:string | undefined | null;
}
// export interface IOTPSENDAPIRESPONSE{
//     message
// }
export interface IOtpVerifyResponse{
    data:{
        resetToken:string
    }
}

export interface IOtpPasswordResetRequest{
    newPassword:string;
    confirmPassword:string;
    resetToken:string;
}