// components/products/UploadProductImage.tsx
"use client"

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { uploadImage } from "@/actions/upload-image-action";
import Image from "next/image";
import { getImagePath } from "@/src/utils";
import { Upload, Image as ImageIcon, FileWarning, CheckCircle2 } from "lucide-react";

export default function UploadProductImage({ currentImage }: { currentImage?: string }) {
    const [image, setImage] = useState('');

    const onDrop = useCallback(async (files: File[]) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('file', file);
        })
        const uploadedImage = await uploadImage(formData);
        return setImage(uploadedImage)
    }, [])

    const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
        accept: {
            'image/jpeg': ['.jpg'],
            'image/png': ['.png']
        },
        onDrop,
        maxFiles: 1
    })

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">
                    Hardware_Visual / Image_Upload
                </label>

                <div {...getRootProps({
                    className: `
                        relative py-16 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer
                        ${isDragActive ? 'border-yellow-400 bg-yellow-400/5' : 'border-white/10 bg-zinc-950 hover:border-white/20'} 
                        ${isDragReject ? 'border-red-500 bg-red-500/5' : ''}
                    `
                })}>
                    <input {...getInputProps()} />

                    {isDragReject ? (
                        <>
                            <FileWarning className="w-8 h-8 text-red-500" />
                            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Format_Error: Only JPG/PNG</p>
                        </>
                    ) : isDragAccept ? (
                        <>
                            <CheckCircle2 className="w-8 h-8 text-yellow-400 animate-bounce" />
                            <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Release_to_Upload</p>
                        </>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 text-zinc-700 group-hover:text-white" />
                            <div className="text-center">
                                <p className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Drag_&_Drop Visual_File</p>
                                <p className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">Recommended: 1200x1200px</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* PREVIEW SYSTEM */}
            {(image || currentImage) && (
                <div className="pt-6 border-t border-white/5 animate-in fade-in duration-500">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-3 h-3" />
                        {image ? "New_Scan_Detected" : "Current_Hardware_File"}
                    </p>

                    <div className="relative group">
                        {/* Marco de Previsualización Industrial */}
                        <div className="w-[280px] h-[380px] bg-black border border-white/10 p-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-yellow-400/40" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-yellow-400/40" />

                            <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={image ? image : getImagePath(currentImage!)}
                                    alt="Product scan"
                                    className="object-contain"
                                    fill
                                    unoptimized={true}
                                />
                            </div>
                        </div>

                        {/* Overlay de Telemetría (Solo decorativo) */}
                        <div className="absolute top-4 left-4 pointer-events-none opacity-20">
                            <p className="text-[8px] font-mono text-white tracking-[0.2em]">IMG_RES: OPTIMIZED</p>
                            <p className="text-[8px] font-mono text-white tracking-[0.2em]">TYPE: HARDWARE_SHOT</p>
                        </div>
                    </div>
                </div>
            )}

            <input
                type="hidden"
                name="image"
                defaultValue={image ? image : currentImage}
            />
        </div>
    )
}