import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/utils/client'
import { sileo } from 'sileo'
import { useMemo } from 'react'
import { router } from '@inertiajs/react'

export function useHeroForm(hero: any) {
  const [form] = Form.useForm()

  const initialValues = useMemo(
    () => ({
      ...hero,
      image1: hero?.image1 ? [{ uid: '-1', name: '01. Principal', status: 'done', url: hero.image1 }] : [],
      image2: hero?.image2 ? [{ uid: '-2', name: '02. Superpuesta', status: 'done', url: hero.image2 }] : [],
      image3: hero?.image3 ? [{ uid: '-3', name: '03. Flotante', status: 'done', url: hero.image3 }] : [],
    }),
    [hero]
  )

  const { mutate: updateHero, isPending } = useMutation(
    api.adminHero.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Sección Hero actualizada con éxito' })
        router.reload({ only: ['hero'] })
      },
      onError: (error: any) => {
        sileo.error({
          title: 'Error de Guardado',
          description: error.response?.data?.message || 'Error técnico al procesar la actualización',
        })
      },
    })
  )

  const onFinish = (values: any) => {
    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      if (['image1', 'image2', 'image3'].includes(key)) {
        const fileList = values[key] || []
        if (fileList[0]) formData.append(key, fileList[0].originFileObj || fileList[0].url)
      } else if (values[key] !== null && values[key] !== undefined) {
        formData.append(key, values[key])
      }
    })

    updateHero({ body: formData } as any)
  }

  return { form, initialValues, onFinish, isPending }
}
