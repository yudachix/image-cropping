export const loadImage = (src: string) => (
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement('img');
    const handleLoad = () => {
      img.removeEventListener('error', handleError);

      resolve(img);
    };
    const handleError = (err: unknown) => {
      img.removeEventListener('load', handleLoad);

      reject(err);
    };

    img.addEventListener('load', handleLoad, { once: true });
    img.addEventListener('error', handleError, { once: true });

    img.src = src;
  })
);
