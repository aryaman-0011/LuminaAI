'use client'


import { logout } from '@/app/actions/auth-action'
import React from 'react'

const LogOutbtn = () => {

    const handleLogOut = async () => {
        await logout()
    }

    return (
        <span onClick={handleLogOut} className='inline-block w-full cursor-pointer text-destructive'>LogOutbtn</span>
    )
}

export default LogOutbtn