// components/UI/ToastNotification.tsx
"use client"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'

export default function ToastNotification() {
    return (
        <ToastContainer
            theme="dark"
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            // Personalización de clases para el look VASK8
            toastClassName={() =>
                "relative flex p-1 min-h-10 rounded-none justify-between overflow-hidden cursor-pointer bg-zinc-950 border border-white/10 shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-4"
            }
            className={() => "flex text-[10px] font-black uppercase tracking-widest p-3 text-white italic"}
            progressClassName="vask8-toast-progress"
        />
    )
}