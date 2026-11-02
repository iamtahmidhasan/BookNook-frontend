import { authClient } from '@/lib/auth-client';
import React from 'react'

export default async function GetTokenFromClient() {
  const { data, error } = await authClient.token()
if (error) {
  // handle error
}
if (data) {
  const jwtToken = data.token
  // Use this token for authenticated requests to external services
}
    return data?.token
}
