import { ref, set } from 'firebase/database'
import { realtimeDB } from '@/firebase/index'
import type { ImageInfo } from '@/components/types'

class ImageService {
  async save(imageData: ImageInfo) {
    await set(ref(realtimeDB, `${new Date().getTime()}`), imageData)
  }

  async load() {
    return ref(realtimeDB)
  }
}

const imageService = new ImageService()

export default imageService