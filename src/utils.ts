export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function isValidPage(value: number) {
    if (value == null) {
        return false;
    }

    if (typeof value !== 'number' && isNaN(value)) {
        return false;
    }
    if (value <= 0) {
        return false;
    }

    if (!Number.isInteger(value)) {
        return false;
    }

    return true;
}

export function getImagePath(image: string) {
    const cloudBaseUrl = 'https://res.cloudinary.com';

    if (image.startsWith(cloudBaseUrl)) {
        return image
    }else{
        return `${process.env.API_URL}/img/${image}`
    }
}