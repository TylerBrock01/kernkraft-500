"use server"
import {ErrorResponseSchema, Product, ProductFormSchema} from "@/src/schema";

type ActionStateType = {
    errors: string[]
    success: string

}
export async function updateProduct(productId: Product['id'], prevState: ActionStateType, formData: FormData) {

    const product = ProductFormSchema.safeParse({
        name : formData.get('name'),
        price : formData.get('price'),
        stock: formData.get('stock'),
        categoryId: formData.get('categoryId'),
    })

    if (!product.success) {
        return {
            errors: product.error.issues.map(iss => iss.message),
            success:''
        }
    }

    const url = `${process.env.API_URL}/products/${productId}`
    const request = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.data)
    })
    const json = await request.json()

    if (!request.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success:''
        }
    }
    return {
        errors: [],
        success: 'Producto Actualizao com sucesso',
    }
}