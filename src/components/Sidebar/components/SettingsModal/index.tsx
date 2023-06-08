'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
import { User } from '@prisma/client'
import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface SettingsModalProps {
   isOpen?: boolean
   onClose: () => void
   currentUser: User
}

export const SettingsModal = ({
   isOpen,
   onClose,
   currentUser,
}: SettingsModalProps) => {
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: currentUser?.name,
         image: currentUser?.image,
      },
   })

   const image = watch('image')

   const handleUpload = useCallback(
      (result: any) => {
         setValue('image', result?.info?.secure_url, { shouldValidate: true })
      },
      [setValue]
   )

   const onSubmit: SubmitHandler<FieldValues> = useCallback(
      (data) => {
         setIsLoading(true)

         axios
            .post('/api/settings', data)
            .then(() => {
               router.refresh()
               onClose()
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
      },
      [onClose, router]
   )

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
               <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                     Perfil
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                     Edite suas informações públicas.
                  </p>

                  <div className="mt-10 flex flex-col gap-y-8">
                     <Input
                        disabled={isLoading}
                        label="Name"
                        id="name"
                        errors={errors}
                        required
                        register={register}
                     />
                     <div>
                        <label
                           htmlFor="photo"
                           className="block text-sm font-medium leading-6 text-gray-900"
                        >
                           Foto
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                           <Image
                              width="48"
                              height="48"
                              className="rounded-full"
                              src={
                                 image ||
                                 currentUser?.image ||
                                 '/images/placeholder.jpg'
                              }
                              alt="Avatar"
                           />
                           <CldUploadButton
                              options={{ maxFiles: 1 }}
                              onUpload={handleUpload}
                              uploadPreset="iu7e84dn"
                           >
                              <Button
                                 disabled={isLoading}
                                 secondary
                                 type="button"
                              >
                                 Mudar
                              </Button>
                           </CldUploadButton>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
               <Button disabled={isLoading} secondary onClick={onClose}>
                  Cancelar
               </Button>
               <Button disabled={isLoading} type="submit">
                  Salvar
               </Button>
            </div>
         </form>
      </Modal>
   )
}
