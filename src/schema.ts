import {z} from 'zod'

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    stock: z.number(),
    category: (z.object({
        id: z.number(),
        name: z.string()
    })).nullish(),
    color: z.string(),
    size: z.coerce.number(),
    deck: (z.object({
        id: z.number(),
        name: z.string()
    })).nullish()

})

export const ProductResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number()
})
export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoriesResponseSchema = z.array(CategorySchema)

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});
export const DeckCategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const DeckCategoryResponseSchema = z.array(DeckCategorySchema)

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

export const ProductFormSchema = z.object({
    name: z.string()
        .min(1, {message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.coerce.number({message: 'Precio no válido'})
        .min(1, {message: 'El Precio debe ser mayor a 0'}),
    image: z.string({message: 'La imagen es obligatoria'}),
    stock: z.coerce.number({message: 'Inventario no válido'})
        .min(1, {message: 'El inventario debe ser mayor a 0'}),
    categoryId: z.coerce.number({message: 'La Categoria no es válida'})
})

export const TransactionsResponseSchema = z.array(TransactionResponseSchema)
export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof shoppingCartSchema>
export type CartItem = z.infer<typeof shoppingCartContentSchema>
export type Coupon = z.infer<typeof CouponResponseSchema>
export type Transaction = z.infer<typeof TransactionResponseSchema>