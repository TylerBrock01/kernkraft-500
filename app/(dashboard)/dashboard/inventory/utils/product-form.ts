import { getProductImages } from './product';
import {
    MetadataRow,
    PRODUCT_TYPES,
    ProductDetail,
    ProductFormValues,
    ProductType
} from "@/app/features/inventory/types";


// Math.random y no crypto.randomUUID: este último no existe en http:// (p. ej. probando desde el celular por IP local)
const newRowId = () => Math.random().toString(36).slice(2, 10);

export const createMetadataRow = (key = '', value = ''): MetadataRow => ({
    id: newRowId(),
    key,
    value,
});

export const createEmptyForm = (): ProductFormValues => ({
    name: '',
    description: '',
    price: '',
    stock: '0',
    type: 'retail',
    images: [],
    metadata: [],
});

const isProductType = (value: unknown): value is ProductType =>
    (PRODUCT_TYPES as readonly unknown[]).includes(value);

const metadataToRows = (metadata: ProductDetail['metadata']): MetadataRow[] =>
    Object.entries(metadata ?? {}).map(([key, value]) =>
        createMetadataRow(key, typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)),
    );

/** Producto del backend → valores iniciales del formulario (o formulario vacío al crear). */
export function toFormValues(product?: ProductDetail | null): ProductFormValues {
    if (!product) return createEmptyForm();

    return {
        name: product.name,
        description: product.description ?? '',
        price: String(Number(product.price)),
        stock: String(Number(product.stock)),
        type: isProductType(product.type) ? product.type : 'retail',
        images: getProductImages(product),
        metadata: metadataToRows(product.metadata),
    };
}

// Solo es número si no tiene ceros a la izquierda: "00123" (un SKU) se queda como texto
const NUMBER_PATTERN = /^-?(0|[1-9]\d*)(\.\d+)?$/;

function parseMetadataValue(raw: string): string | number | boolean {
    const lower = raw.toLowerCase();
    if (lower === 'true') return true;
    if (lower === 'false') return false;
    if (NUMBER_PATTERN.test(raw)) return Number(raw);
    return raw;
}

export function metadataRowsToObject(rows: MetadataRow[]): Record<string, string | number | boolean> {
    const result: Record<string, string | number | boolean> = {};
    for (const row of rows) {
        const key = row.key.trim();
        const value = row.value.trim();
        if (key && value) result[key] = parseMetadataValue(value);
    }
    return result;
}

/** Devuelve el primer error encontrado, o null si todo está bien. */
export function validateProductForm(values: ProductFormValues): string | null {
    if (!values.name.trim()) return 'El nombre es obligatorio.';

    const price = Number(values.price);
    if (values.price.trim() === '' || !Number.isFinite(price) || price < 0) {
        return 'El precio debe ser un número mayor o igual a 0.';
    }

    const stock = Number(values.stock);
    if (values.stock.trim() === '' || !Number.isInteger(stock) || stock < 0) {
        return 'El stock debe ser un entero mayor o igual a 0.';
    }

    const keys = values.metadata.map((row) => row.key.trim()).filter(Boolean);
    if (new Set(keys).size !== keys.length) return 'Hay atributos con el mismo nombre.';

    return null;
}

/** Mismo contrato que ya tenía tu backend: image (portada), images[] y metadata como JSON. */
export function buildProductFormData(values: ProductFormValues): FormData {
    const body = new FormData();
    body.append('name', values.name.trim());
    body.append('description', values.description.trim());
    body.append('price', String(Number(values.price)));
    body.append('stock', String(Number(values.stock)));
    body.append('type', values.type);

    if (values.images.length > 0) {
        body.append('image', values.images[0]); // portada
        values.images.forEach((url) => body.append('images[]', url));
    }

    const metadata = metadataRowsToObject(values.metadata);
    if (Object.keys(metadata).length > 0) body.append('metadata', JSON.stringify(metadata));

    return body;
}