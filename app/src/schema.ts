import {z} from 'zod'

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    stock: z.number(),
    category: z.number().or(z.object({
        id: z.number()
    }))
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});