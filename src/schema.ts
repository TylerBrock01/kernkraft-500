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

export const categoriesResponseSchema = z.array(CategorySchema)

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});
// shoppin cart
const shoppingCartContentSchema = ProductSchema.pick({
    name: true,
    price: true,
    image: true,
    stock: true
}).extend({
    productId: z.number(),
    quantity: z.number()
})
export const shoppingCartSchema = z.array(shoppingCartContentSchema)

export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof shoppingCartSchema>
export type CartItem = z.infer<typeof shoppingCartContentSchema>