import {z} from 'zod'

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    stock: z.number(),
    category: z.number().or(z.object({
        id: z.number()
    })).nullish()
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
}).extend({productId: z.number(), quantity: z.number()})

export const shoppingCartSchema = z.array(shoppingCartContentSchema)

export const CouponResponseSchema = z.object({
    message: z.string(),
    coupon: z.object({
        name: z.string().default(""),
        discount: z.coerce.number().min(0).max(100).default(0),
    }).optional(),
})

const OrderContentSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
})

export const OrderSchema = z.object({
    coupon: z.string()?.optional(),
    contents: z.array(OrderContentSchema).min(1, {message: 'El Carrito no puede ir vacio'})
})

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
    message: z.string()
})

export const ErrorResponseSchema = z.object({
    message: z.array(z.string()),
    error: z.string(),
    statusCode: z.number()
})

export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.string(),
    product: ProductSchema
})
export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.string(),
    transactionDate: z.string(),
    coupon: z.string().nullable(),
    couponDiscount: z.string().nullable(),
    contents: z.array(ContentsSchema)
})

export const TransactionsResponseSchema = z.array(TransactionResponseSchema)
export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof shoppingCartSchema>
export type CartItem = z.infer<typeof shoppingCartContentSchema>
export type Coupon = z.infer<typeof CouponResponseSchema>