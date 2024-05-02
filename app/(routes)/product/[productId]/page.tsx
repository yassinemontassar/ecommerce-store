import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: {
        productId: string;
    }
}




export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.productId);
  if (!product) {
    return notFound(); 
  }
  return {
   title: product.name,
   description: "Categorie:"+product.category.name,
   openGraph: {
    images: product.images.map((image) => ({
      url: image.url,
      height:1260,
      width:230
    })),
   }
  }

}
// const delay = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const product = await getProduct(params.productId);
    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id
        })
        if (!product) {
          return notFound(); 
        }
   
    return (
        <div className="bg-white">
           <Container>
             <div className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                  <Gallery images={product.images} />
                  <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <Info data={product} />
                  </div>
                </div>
                <hr className="my-10" />
                <ProductList title="Produits similaires" items={suggestedProducts} />
             </div>
           </Container>
        </div>
    );
}





export default ProductPage;