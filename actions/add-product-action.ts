"use server"
type ActionStateType = {
    errors: string[]
    successs: string

}
export async function addProduct(prevState: ActionStateType, formData: FormData) {
    console.log('addproduct')
    return {
        errors: [],
        successs: [],
    }
}