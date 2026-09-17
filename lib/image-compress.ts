/**
 * Helper kompresi gambar client-side menggunakan HTML5 Canvas.
 * Mengubah gambar besar (misal foto kamera 5MB-10MB) menjadi WebP ringan (<150KB)
 * sebelum dikirim ke serverless Vercel, mencegah error 413 Payload Too Large.
 */
export async function compressImage(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.8
): Promise<File> {
  // Jangan kompres SVG atau GIF animasi
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  // Jika file sudah sangat kecil (< 150KB), langsung kembalikan
  if (file.size < 150 * 1024 && (file.type === "image/webp" || file.type === "image/jpeg")) {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.width;
      let height = img.height;

      // Hitung aspek rasio agar tidak melebihi maxWidth/maxHeight
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      // Render gambar ke canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Konversi ke format WebP efisien
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const compressedFile = new File([blob], `${baseName}.webp`, {
            type: "image/webp",
            lastModified: Date.now(),
          });

          resolve(compressedFile);
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}
