/**
 * Image Optimization Utilities
 * Resize and compress images before API calls to reduce costs and improve speed
 */

const MAX_DIMENSION = 1024 // Max width or height for API
const JPEG_QUALITY = 0.85

/**
 * Resize image to fit within max dimensions while maintaining aspect ratio
 */
export async function optimizeImage(dataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const { width, height } = img

            // Calculate new dimensions
            let newWidth = width
            let newHeight = height

            if (width > height && width > MAX_DIMENSION) {
                newWidth = MAX_DIMENSION
                newHeight = Math.round(height * (MAX_DIMENSION / width))
            } else if (height > MAX_DIMENSION) {
                newHeight = MAX_DIMENSION
                newWidth = Math.round(width * (MAX_DIMENSION / height))
            }

            // Skip if already small enough
            if (newWidth === width && newHeight === height) {
                resolve(dataUrl)
                return
            }

            // Create canvas and resize
            const canvas = document.createElement("canvas")
            canvas.width = newWidth
            canvas.height = newHeight

            const ctx = canvas.getContext("2d")
            if (!ctx) {
                reject(new Error("Failed to get canvas context"))
                return
            }

            // Use high-quality scaling
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = "high"
            ctx.drawImage(img, 0, 0, newWidth, newHeight)

            // Convert to optimized JPEG
            const optimizedDataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY)

            console.log(`Image optimized: ${width}x${height} -> ${newWidth}x${newHeight}`)
            console.log(`Size: ${Math.round(dataUrl.length / 1024)}KB -> ${Math.round(optimizedDataUrl.length / 1024)}KB`)

            resolve(optimizedDataUrl)
        }

        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = dataUrl
    })
}

/**
 * Get image dimensions from data URL
 */
export async function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve({ width: img.width, height: img.height })
        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = dataUrl
    })
}
