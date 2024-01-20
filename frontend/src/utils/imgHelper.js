export const formatImgFromBuffer = (buffer) => {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer.data)));
     return `data:image/png;base64,${base64String}`;
}

