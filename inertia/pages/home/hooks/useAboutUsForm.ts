import { Form } from 'antd'
import { router } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import { sileo } from 'sileo'

export function useAboutUsForm(aboutUs: any) {
  const [form] = Form.useForm()
  const [isPending, setIsPending] = useState(false)

  const initialValues = useMemo(
    () => ({
      categoryTag: aboutUs?.categoryTag,
      titleMain: aboutUs?.titleMain,
      titleHighlight: aboutUs?.titleHighlight,
      titleSuffix: aboutUs?.titleSuffix,
      description: aboutUs?.description,
      buttonText: aboutUs?.buttonText,
      buttonLink: aboutUs?.buttonLink,
      features: aboutUs?.features,
      image1: aboutUs?.image1
        ? [{ uid: '-1', name: 'Imagen 1', status: 'done', url: aboutUs.image1 }]
        : [],
      image2: aboutUs?.image2
        ? [{ uid: '-2', name: 'Imagen 2', status: 'done', url: aboutUs.image2 }]
        : [],
    }),
    [aboutUs]
  )

  const onFinish = (values: any) => {
    setIsPending(true)

    const formData = new FormData()
    formData.append('_method', 'PATCH')

    Object.keys(values).forEach((key) => {
      if (key === 'features') {
        formData.append('features', JSON.stringify(values[key] || []))
      } else if (key === 'image1' || key === 'image2') {
        const file = values[key]?.[0]
        if (file?.originFileObj) formData.append(key, file.originFileObj)
      } else if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key])
      }
    })

    router.post('/admin/about_us', formData, {
      forceFormData: true,
      onSuccess: () => {
        sileo.success({ title: 'Sección About Us actualizada' })
        router.reload({ only: ['aboutUs'] })
      },
      onError: (error: any) =>
        sileo.error({ title: error.response?.data?.message || 'Error al actualizar About Us' }),
      onFinish: () => setIsPending(false),
    })
  }

  return { form, initialValues, onFinish, isPending }
}
