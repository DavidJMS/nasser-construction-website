import { Form, message } from 'antd'
import { router } from '@inertiajs/react'
import { useState } from 'react'
import type { AboutUsData } from '../types'

export function useAboutUsForm(aboutUs: AboutUsData) {
  const [form] = Form.useForm()
  const [isPending, setIsPending] = useState(false)

  const initialValues = {
    categoryTag: aboutUs.categoryTag,
    titleMain: aboutUs.titleMain,
    titleHighlight: aboutUs.titleHighlight,
    titleSuffix: aboutUs.titleSuffix,
    description: aboutUs.description,
    buttonText: aboutUs.buttonText,
    buttonLink: aboutUs.buttonLink,
    features: aboutUs.features,
    image1: aboutUs.image1 ? [{ url: aboutUs.image1 }] : [],
    image2: aboutUs.image2 ? [{ url: aboutUs.image2 }] : [],
  }

  const onFinish = (values: any) => {
    setIsPending(true)

    // Convert to FormData for file uploads
    const formData = new FormData()
    formData.append('_method', 'PATCH') // For AdonisJS PATCH spoofing if needed, though router.patch handles it

    Object.keys(values).forEach((key) => {
      if (key === 'features') {
        formData.append('features', JSON.stringify(values[key]))
      } else if (key === 'image1' || key === 'image2') {
        if (values[key]?.[0]?.originFileObj) {
          formData.append(key, values[key][0].originFileObj)
        }
      } else {
        formData.append(key, values[key] || '')
      }
    })

    router.post('/admin/about-us', formData, {
      forceFormData: true,
      onSuccess: () => {
        message.success('Sección About Us actualizada')
        setIsPending(false)
      },
      onError: () => {
        message.error('Error al actualizar')
        setIsPending(false)
      },
    })
  }

  return { form, initialValues, onFinish, isPending }
}
