import { ref, remove, set, type DatabaseReference } from 'firebase/database'
import { realtimeDB } from '@/firebase/index'
import type { ImageInfo } from '@/types'

class ImageService {
  async save(imageData: ImageInfo): Promise<void> {
    await set(ref(realtimeDB, `${imageData.itemID}`), imageData)
  }

  async load(): Promise<DatabaseReference> {
    return ref(realtimeDB)
  }

  async delete(userID: number): Promise<void> {
    await remove(ref(realtimeDB, `${userID}`))
  }
}

const imageService = new ImageService()

export default imageService
