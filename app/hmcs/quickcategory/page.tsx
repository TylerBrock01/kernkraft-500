// /app/hmcs/quickcategory/page.tsx
import { getCatalog } from "@/app/hmcs/_lib/catalog";
import QuickOrder from "@/app/hmcs/_components/QuickOrder";

export const revalidate = 60;

export default async function QuickCategoryPage() {
    const { products } = await getCatalog();
    return <QuickOrder products={products} />;
}