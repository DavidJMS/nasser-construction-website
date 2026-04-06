import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/utils/client'
import { sileo } from 'sileo'
import { useMemo } from 'react'
import { Hero } from '../types'

export function useHeroForm(hero: Hero) {
  const [form] = Form.useForm()

  const initialValues = useMemo(
    () => ({
      ...hero,
      images: [
        ...(hero.image1
          ? [{ uid: '-1', name: '01. Principal', status: 'done', url: hero.image1 }]
          : []),
        ...(hero.image2
          ? [{ uid: '-2', name: '02. Superpuesta', status: 'done', url: hero.image2 }]
          : []),
        ...(hero.image3
          ? [{ uid: '-3', name: '03. Flotante', status: 'done', url: hero.image3 }]
          : []),
      ],
    }),
    [hero]
  )

  const { mutate: updateHero, isPending } = useMutation(
    api.adminHero.update.mutationOptions({
      onSuccess: () => {
        sileo.success({ title: 'Sección Hero actualizada con éxito' })
      },
      onError: (error: any) => {
        sileo.error({
          title: 'Error de Guardado',
          description:
            error.response?.data?.message || 'Error técnico al procesar la actualización',
        })
      },
    })
  )

  const onFinish = (values: any) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(values).forEach((key) => {
      if (key === 'images') {
        const fileList = values[key] || []
        // Map by index: 0 -> image1, 1 -> image2, 2 -> image3
        if (fileList[0]) formData.append('image1', fileList[0].originFileObj || fileList[0].url)
        if (fileList[1]) formData.append('image2', fileList[1].originFileObj || fileList[1].url)
        if (fileList[2]) formData.append('image3', fileList[2].originFileObj || fileList[2].url)
      } else if (
        !['image1', 'image2', 'image3'].includes(key) &&
        values[key] !== null &&
        values[key] !== undefined
      ) {
        formData.append(key, values[key])
      }
    })

    updateHero({
      body: formData,
    } as any)
  }

  return { form, initialValues, onFinish, isPending }
}
