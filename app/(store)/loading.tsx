import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center p-10 animate-pulse">
            <Image className={"rounded-md"}
                src={'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXA2cGk5ZWhodndvZGxvNzBxcGZ1N25tZGNncnB5YjY1aTB3a2R3YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oBEUg7opRlyik/giphy.gif'}
                   alt={'imageloading'}
                   width={800}
                   height={800}
                   unoptimized={true}
            />
            <p className={"text-white text-2xl text-center"}>Cargando Productos...</p>
        </div>
    )
}
