"use server"
import {OrderSchema} from "@/src/schema";

export async function submitOrderAction(data: unknown) {
    const order = OrderSchema.parse(data)
    console.log('submit order action\n',order)
    return{
        errors:[],
        succes: '',
    }
}