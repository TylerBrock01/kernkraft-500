import React, {useState, useRef, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {api} from "@/app/lib/axios/axios";

interface ProductDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    productToEdit?: any;
}

export default function ProductDrawer({ isOpen, onClose, onSuccess,productToEdit }: ProductDrawerProps) {
    const [formData, setFormData] = useState({
        name: '', description: '', price: 0, stock: 0, type: 'retail',
    });

    const [metadataParams, setMetadataParams] = useState<{key: string, value: string}[]>([]);

    // 📸 ESTADOS PARA LA IMAGEN
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    // 🔄 EFECTO DE AUTORELLENADO (Cuando se abre el Drawer para editar)
    useEffect(() => {
        if (productToEdit && isOpen) {
            setFormData({
                name: productToEdit.name,
                description: productToEdit.description || '',
                price: Number(productToEdit.price),
                stock: Number(productToEdit.stock),
                type: productToEdit.type,
            });
            setImageUrl(productToEdit.image || null);

            // Desempaquetar el JSONB de la base de datos a filas del formulario
            if (productToEdit.metadata && Object.keys(productToEdit.metadata).length > 0) {
                const metaArray = Object.entries(productToEdit.metadata).map(([key, value]) => ({
                    key,
                    value: String(value)
                }));
                setMetadataParams(metaArray);
            } else {
                setMetadataParams([]);
            }
        } else if (!isOpen) {
            // Limpiar cuando se cierra
            setFormData({ name: '', description: '', price: 0, stock: 0, type: 'retail' });
            setMetadataParams([]);
            setImageUrl(null);
        }
    }, [productToEdit, isOpen]);
    // --- LÓGICA DE DRAG & DROP ---
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleImageUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await handleImageUpload(e.target.files[0]);
        }
    };

    const handleImageUpload = async (file: File) => {
        setIsUploading(true);
        try {
            const uploadPayload = new FormData();
            uploadPayload.append('file', file);

            // ⚠️ Ajusta esta ruta si tu endpoint está en otro lado (ej: /products/upload-image)
            const response = await api.post('/products/upload-image', uploadPayload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Cloudinary suele devolver secure_url, o adaptamos a lo que devuelva tu servicio
            const uploadedUrl = response.data.secure_url || response.data.url || response.data;
            setImageUrl(uploadedUrl);
        } catch (error) {
            console.error('Error subiendo imagen:', error);
        } finally {
            setIsUploading(false);
        }
    };
    // ------------------------------

    // --- LÓGICA DE METADATA ---
    const addMetadataRow = () => setMetadataParams([...metadataParams, { key: '', value: '' }]);
    const updateMetadata = (index: number, field: 'key' | 'value', val: string) => {
        const newParams = [...metadataParams];
        newParams[index][field] = val;
        setMetadataParams(newParams);
    };
    const removeMetadataRow = (index: number) => setMetadataParams(metadataParams.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('description', formData.description);
            formPayload.append('price', String(formData.price));
            formPayload.append('stock', String(formData.stock));
            formPayload.append('type', formData.type);

            // 📸 Si tenemos imagen, la mandamos como texto
            if (imageUrl) {
                formPayload.append('image', imageUrl);
            }

            const metadataObject: Record<string, any> = {};
            metadataParams.forEach(param => {
                const k = param.key.trim();
                const v = param.value.trim();
                if (k && v) {
                    let finalValue: any = v;
                    if (v.toLowerCase() === 'true') finalValue = true;
                    else if (v.toLowerCase() === 'false') finalValue = false;
                    else if (!isNaN(Number(v)) && v !== '') finalValue = Number(v);
                    metadataObject[k] = finalValue;
                }
            });

            if (Object.keys(metadataObject).length > 0) {
                formPayload.append('metadata', JSON.stringify(metadataObject));
            }

            // 🎯 LA MAGIA HÍBRIDA: Decide dinámicamente si hacer POST o PATCH
            if (productToEdit) {
                await api.patch(`/products/${productToEdit.id}`, formPayload, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await api.post('/products', formPayload, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            // Reset total
            setFormData({ name: '', description: '', price: 0, stock: 0, type: 'retail' });
            setMetadataParams([]);
            setImageUrl(null);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error al registrar producto:', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40" />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto">

                        <div className="flex justify-between items-center mb-10 shrink-0">
                            <h2 className="text-xl font-bold text-zinc-100">
                                {productToEdit ? 'Editar Expediente' : 'Nueva Carga'} {/* 🧠 Título dinámico */}
                            </h2>
                            <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="mb-6 space-y-6 flex-1 flex flex-col">

                            {/* 📸 DROPZONE DE IMAGEN */}

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-2 block">Fotografía del Producto</label>

                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => !imageUrl && !isUploading && fileInputRef.current?.click()}
                                    className={`relative w-full h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden ${
                                        imageUrl ? 'border-zinc-800 bg-zinc-900/50' :
                                            isDragging ? 'border-blue-500 bg-blue-500/10' :
                                                'border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50 cursor-pointer'
                                    }`}
                                >
                                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />

                                    {isUploading ? (
                                        <div className="flex flex-col items-center">
                                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                                            <span className="text-xs font-mono text-zinc-400">Subiendo a la nube...</span>
                                        </div>
                                    ) : imageUrl ? (
                                        <>
                                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setImageUrl(null); }}
                                                className="absolute top-2 right-2 w-8 h-8 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors backdrop-blur-md"
                                            >
                                                ✕
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center pointer-events-none">
                                            <span className="text-2xl mb-2 block opacity-50">📸</span>
                                            <p className="text-xs font-medium text-zinc-400">Arrastra una imagen aquí</p>
                                            <p className="text-[10px] text-zinc-600 mt-1">o haz clic para explorar</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 🏷️ SELECTOR DE TIPO */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Clasificación</label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {['retail', 'food', 'service'].map((t) => (
                                        <button key={t} type="button" onClick={() => setFormData({ ...formData, type: t })} className={`py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg border transition-all ${formData.type === t ? 'bg-zinc-100 text-zinc-950 border-zinc-100' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 📊 DATOS BÁSICOS */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Nombre</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-zinc-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Precio ($)</label>
                                    <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-zinc-500 font-mono" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Stock</label>
                                    <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-zinc-500 font-mono" />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Descripción</label>
                                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full mt-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
                            </div>

                            {/* 🧠 ZONA DE METADATA UNIVERSAL */}
                            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Atributos Dinámicos</h3>
                                </div>

                                <div className="space-y-2">
                                    {/* Fila de encabezados sutiles */}
                                    {metadataParams.length > 0 && (
                                        <div className="flex gap-2 px-1">
                                            <span className="flex-1 text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Propiedad (Ej. material)</span>
                                            <span className="flex-1 text-[9px] uppercase text-zinc-500 font-bold tracking-widest">Valor (Ej. PVC)</span>
                                            <span className="w-8"></span>
                                        </div>
                                    )}

                                    {metadataParams.map((param, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text" value={param.key} onChange={(e) => updateMetadata(index, 'key', e.target.value)}
                                                placeholder="Propiedad..."
                                                className="flex-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                                            />
                                            <input
                                                type="text" value={param.value} onChange={(e) => updateMetadata(index, 'value', e.target.value)}
                                                placeholder="Valor..."
                                                className="flex-1 bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                                            />
                                            <button
                                                type="button" onClick={() => removeMetadataRow(index)}
                                                className="w-8 flex items-center justify-center rounded-lg border border-red-900/30 text-red-500 hover:bg-red-500/10 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button" onClick={addMetadataRow}
                                        className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 hover:text-emerald-300 mt-2 block"
                                    >
                                        + Agregar Atributo
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6 mt-auto border-t border-zinc-800 shrink-0">
                                <button type="submit" className="w-full bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all">
                                    Registrar en Base de Datos
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}