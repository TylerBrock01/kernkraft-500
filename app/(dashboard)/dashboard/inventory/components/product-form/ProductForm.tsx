'use client';

import { useId, useState, type FormEvent } from 'react';
import { saveProduct } from '@/app/features/inventory/services/inventory.service';
import { PRODUCT_TYPES, type ProductDetail, type ProductFormValues } from '@/app/features/inventory/types';
import { getErrorMessage } from '@/app/lib/get-error-message';
import { ImageUploader } from './ImageUploader';
import { MetadataEditor } from './MetadataEditor';
import {toFormValues, validateProductForm} from "@/app/(dashboard)/dashboard/inventory/utils/product-form";
import {FormField} from "@/app/features/auth/components/ui/FormField";
import {Input} from "@/app/features/auth/components/ui/Input";

interface Props {
    productToEdit?: ProductDetail | null;
    onSuccess: () => void;
    onClose: () => void;
}

export function ProductForm({ productToEdit, onSuccess, onClose }: Props) {
    const uid = useId();
    const isEditing = !!productToEdit;

    // Se inicializa una sola vez: el formulario se monta cada vez que se abre el drawer
    const [values, setValues] = useState<ProductFormValues>(() => toFormValues(productToEdit));
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setField = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) =>
        setValues((current) => ({ ...current, [key]: value }));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting || isUploading) return;

        const validationError = validateProductForm(values);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setIsSubmitting(true);
        try {
            await saveProduct(values, productToEdit?.id);
            onSuccess();
            onClose();
        } catch (err) {
            setError(getErrorMessage(err, 'No se pudo guardar el producto.'));
            setIsSubmitting(false);
        }
    };

    const submitLabel = isSubmitting
        ? 'Guardando...'
        : isEditing
            ? 'Guardar cambios'
            : 'Registrar en Base de Datos';

    return (
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            {/* Zona con scroll; el botón de guardar queda siempre visible abajo */}
            <div className="flex-1 space-y-6 overflow-y-auto pr-1">
                <ImageUploader
                    images={values.images}
                    onAdd={(urls) => setValues((v) => ({ ...v, images: [...v.images, ...urls] }))}
                    onRemove={(index) => setValues((v) => ({ ...v, images: v.images.filter((_, i) => i !== index) }))}
                    onUploadingChange={setIsUploading}
                />

                <div role="group" aria-labelledby={`${uid}-type`} className="space-y-1.5">
          <span
              id={`${uid}-type`}
              className="ml-1 block text-[10px] font-bold uppercase tracking-widest text-zinc-500"
          >
            Clasificación
          </span>
                    <div className="grid grid-cols-3 gap-2">
                        {PRODUCT_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                aria-pressed={values.type === type}
                                onClick={() => setField('type', type)}
                                className={`rounded-lg border py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                    values.type === type
                                        ? 'border-zinc-100 bg-zinc-100 text-zinc-950'
                                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <FormField label="Nombre" htmlFor={`${uid}-name`}>
                    <Input
                        id={`${uid}-name`}
                        required
                        value={values.name}
                        onChange={(e) => setField('name', e.target.value)}
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Precio ($)" htmlFor={`${uid}-price`}>
                        <Input
                            id={`${uid}-price`}
                            required
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={values.price}
                            onChange={(e) => setField('price', e.target.value)}
                            className="font-mono"
                        />
                    </FormField>

                    <FormField label="Stock" htmlFor={`${uid}-stock`}>
                        <Input
                            id={`${uid}-stock`}
                            required
                            type="number"
                            inputMode="numeric"
                            step="1"
                            min="0"
                            value={values.stock}
                            onChange={(e) => setField('stock', e.target.value)}
                            className="font-mono"
                        />
                    </FormField>
                </div>

                <FormField label="Descripción" htmlFor={`${uid}-description`}>
          <textarea
              id={`${uid}-description`}
              rows={3}
              value={values.description}
              onChange={(e) => setField('description', e.target.value)}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
                </FormField>

                <MetadataEditor rows={values.metadata} onChange={(rows) => setField('metadata', rows)} />
            </div>

            <div className="mt-6 shrink-0 space-y-3 border-t border-zinc-800 pt-6">
                {error && (
                    <p role="alert" className="font-mono text-xs text-red-400">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="w-full rounded-lg bg-zinc-100 py-4 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isUploading ? 'Subiendo imágenes...' : submitLabel}
                </button>
            </div>
        </form>
    );
}