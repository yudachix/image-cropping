export const readAsDataUrl = (blob: Blob) => (
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    const handleLoad = (): void => {
      if (typeof reader.result !== 'string') {
        // TODO
        reject();

        return;
      }

      reader.removeEventListener('error', handleError);

      resolve(reader.result);
    };
    const handleError = (err: unknown): void => {
      reader.removeEventListener('load', handleLoad);

      reject(err);
    };

    reader.addEventListener('load', handleLoad, { once: true });
    reader.addEventListener('error', handleError, { once: true });

    reader.readAsDataURL(blob);
  })
);
