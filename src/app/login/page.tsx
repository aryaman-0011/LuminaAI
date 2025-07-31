import React from 'react'
import AuthImg from '@/public/Abstract Curves and Colors.jpeg'
import Image from 'next/image'
import Logo from '@/components/logo'

const AuthenticationPage = () => {
    return (
        <main className='h-screen grid grid-cols-2 relative'>
            <div className='relative w-full flex flex-col bg-muted p-10 text-primary-foreground'>
                <Image src={AuthImg} alt='login image' fill className='w-full h-full object-cover' />
                <div className='relative z-20 flex items-center'>
                    <Logo />
                </div>
            </div>
        </main>
    )
}

export default AuthenticationPage