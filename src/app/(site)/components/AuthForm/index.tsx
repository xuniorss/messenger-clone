'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useCallback, useState, useEffect } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { AuthSocialButton } from '../AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'

export const AuthForm = () => {
   const [variant, setVariant] = useState<Variant>('LOGIN')
   const [isLoading, setIsLoading] = useState(false)
   const session = useSession()
   const router = useRouter()

   useEffect(() => {
      if (session?.status === 'authenticated') {
         router.push('/users')
      }
   }, [router, session?.status])

   const toggleVariant = useCallback(() => {
      if (variant === 'LOGIN') return setVariant('REGISTER')

      setVariant('LOGIN')
   }, [variant])

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: { name: '', email: '', password: '' },
   })

   const onSubmit: SubmitHandler<FieldValues> = useCallback(
      (data) => {
         setIsLoading(true)

         if (variant === 'REGISTER') {
            axios
               .post('/api/register', data)
               .then(() => signIn('credentials', data))
               .catch(() => toast.error('Alguma coisa deu errado.'))
               .finally(() => setIsLoading(false))
         }

         if (variant === 'LOGIN') {
            signIn('credentials', { ...data, redirect: false })
               .then((callback) => {
                  if (callback?.error) return toast.error('Invalid credentials')
                  if (callback?.ok && !callback?.error) {
                     toast.success('Logado')
                     router.push('/users')
                  }
               })
               .finally(() => setIsLoading(false))
         }
      },
      [variant, router]
   )

   const socialAction = useCallback((action: 'github' | 'google') => {
      setIsLoading(true)

      signIn(action, { redirect: false })
         .then((callback) => {
            if (callback?.error) return toast.error('Invalid credentials')
            if (callback?.ok && !callback?.error) return toast.success('Logado')
         })
         .finally(() => setIsLoading(false))
   }, [])

   return (
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
         <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
               {variant === 'REGISTER' && (
                  <Input
                     id="name"
                     label="Nome"
                     type="text"
                     register={register}
                     errors={errors}
                     disabled={isLoading}
                  />
               )}
               <Input
                  id="email"
                  label="Email"
                  type="email"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
               />

               <Input
                  id="password"
                  label="Senha"
                  type="password"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
               />
               <div>
                  <Button disabled={isLoading} fullWidth type="submit">
                     {variant === 'LOGIN' ? 'Acessar' : 'Cadastrar-se'}
                  </Button>
               </div>
            </form>

            <div className="mt-6">
               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                     <span className="bg-white px-2 text-gray-500">
                        Ou continue com
                     </span>
                  </div>
               </div>

               <div className="mt-6 flex gap-2">
                  <AuthSocialButton
                     icon={BsGithub}
                     onClick={() => socialAction('github')}
                  />

                  <AuthSocialButton
                     icon={BsGoogle}
                     onClick={() => socialAction('google')}
                  />
               </div>
            </div>

            <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
               <div>
                  {variant === 'LOGIN'
                     ? 'Novo no Messenger?'
                     : 'Já tem uma conta?'}
               </div>
               <div
                  onClick={toggleVariant}
                  className="cursor-pointer underline"
               >
                  {variant === 'LOGIN' ? 'Crie sua conta' : 'Acessar'}
               </div>
            </div>
         </div>
      </div>
   )
}
