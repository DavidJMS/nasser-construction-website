import type { UploadFile } from 'antd/es/upload/interface'

type UploadValueObject = {
  uid?: string
  name?: string
  url?: string
  status?: UploadFile['status']
}

export function toUploadFileList(value: unknown): UploadFile[] {
  if (!value) return []
  if (Array.isArray(value)) return value as UploadFile[]

  if (typeof value === 'string') {
    const name = value.split('/').pop() || 'image'
    return [{ uid: value, name, status: 'done', url: value }]
  }

  if (typeof value === 'object') {
    const candidate = value as UploadValueObject
    if (typeof candidate.url === 'string') {
      return [
        {
          uid: candidate.uid ?? candidate.url,
          name: candidate.name ?? 'image',
          status: candidate.status ?? 'done',
          ...(candidate as any),
        },
      ]
    }
  }

  return []
}
