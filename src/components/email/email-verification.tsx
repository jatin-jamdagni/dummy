import React from 'react'
import { CardWrapper } from '../auth/card-wrapper'
import BackButton from '../auth/back-button'

const EmailVerification = (token: string) => {
  return (
    <CardWrapper headerLabel='Email Verification'   >
        <BackButton label='Back' href={token} /> 
        </CardWrapper>
  )
}

export default EmailVerification