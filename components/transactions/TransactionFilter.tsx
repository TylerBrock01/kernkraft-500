"use client"

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import {useState} from "react";
import {format} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getSalesByDate} from "@/src/api";

type ValuePiece = Date |null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {
    const [date, setDate] = useState<Value>(new Date())
    const formattedDate = format(date!.toString(), "yyyy-MM-dd")
    const {data, isLoading} = useQuery({
        queryKey:['sales',formattedDate],
        queryFn: ()=> getSalesByDate(formattedDate)
    })

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10"}>
            <div>
                <Calendar locale="es-ES" value={date} onChange={setDate}/>
            </div>
        </div>
    )
}