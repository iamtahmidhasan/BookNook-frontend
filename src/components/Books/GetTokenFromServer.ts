import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react'

export default async function GetTokenFromServer() {
  const jwtToken = await auth.api.getToken({
    headers : await headers()
  })
  return jwtToken
}
