import { ref, remove, set } from 'firebase/database'
import { realtimeDB } from '@/firebase/index'
import type { ImageInfo } from '@/types'

class ImageService {
  async save(imageData: ImageInfo) {
    await set(ref(realtimeDB, `${imageData.itemID}`), imageData)
  }

  async load() {
    return ref(realtimeDB)
  }

  async delete(userID: number) {
    await remove(ref(realtimeDB, `${userID}`))
  }
}

const imageService = new ImageService()

export default imageService
