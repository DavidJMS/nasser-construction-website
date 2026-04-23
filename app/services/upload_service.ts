import type { MultipartFile } from '@adonisjs/core/bodyparser'
import drive from '@adonisjs/drive/services/main'
import string from '@adonisjs/core/helpers/string'

class UploadService {
  /**
   * Uploads a file to the default disk and returns its URL.
   */
  async upload(file: MultipartFile, folder: string) {
    const fileName = `${Date.now()}-${string.uuid()}.${file.extname}`
    const fileKey = `${folder}/${fileName}`

    await file.moveToDisk(fileKey)
    return await drive.use().getUrl(fileKey)
  }

  /**
   * Deletes a file from the default disk given its URL.
   */
  async delete(url: string | null) {
    if (!url) return

    // Extract key from URL (assuming the routeBasePath is '/uploads')
    // In a more robust implementation, this could be more dynamic.
    const key = url.replace('/uploads/', '')

    try {
      const exists = await drive.use().exists(key)
      if (exists) {
        await drive.use().delete(key)
      }
    } catch (error) {
      console.error(`[UploadService] Failed to delete file: ${url}`, error)
    }
  }
}

const uploadService = new UploadService()
export default uploadService
