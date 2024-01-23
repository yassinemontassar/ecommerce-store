import getProducts from "@/actions/get-products";
import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getProducts();

    const productEntries: MetadataRoute.Sitemap = products.map(({id}) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}}`,
        priority: 0.8,
        lastModified: new Date(),
        changeFrequency: 'weekly',
       
    }))
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            priority: 1,
            lastModified: new Date(),
            changeFrequency: 'daily',
        },
        ...productEntries,
    ]
    
}