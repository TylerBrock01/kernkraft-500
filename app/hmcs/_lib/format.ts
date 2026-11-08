// /hmcs/_lib/format.ts
const money = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});

export const formatPrice = (value: number) => money.format(value);