import Image from "next/image";

export default function Hero(){
    return (
        <div className="bg-black relative ">
            <Image className=" object-cover opacity-50" src={"https://cdn.pixabay.com/photo/2019/02/22/12/31/fashion-4013456_1280.jpg"}
                   alt={"hero"}
                   width="2500"
                   height="2500"/>
            <h1 className="text-3xl font-bold text-black dark:text-white absolute">VASK8</h1>
        </div>
    )
}