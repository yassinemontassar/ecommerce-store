import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import PaginationControls from "@/components/PaginationControls";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string; 
        sizeId: string;
        page: string;
        per_page: string;
    }
}

const CategoryPage: React.FC<CategoryPageProps>= async({
    params,
    searchParams
}) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
        
    });
    const sizes= await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId);
    const page = searchParams['page'] ?? '1'
    const per_page = searchParams['per_page'] ?? '3'
  
    // mocked, skipped and limited in the real app
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page) // 5, 10, 15 ...
    const totalPages = Math.ceil(products.length / Number(per_page));
    const entries = products.slice(start, end)
    return (
        <div className="bg-white">
           <Container>
                <Billboard 
                    data={[category.billboard]}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                       <MobileFilters sizes={sizes} colors={colors}  />
                        <div className="hidden lg:block">
                            <Filter 
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter 
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mt-6">
                                {entries.map((item) => (
                                    <ProductCard
                                    key={item.id}
                                    data={item}
                                   
                                    />
                                ))}
                            </div>
                            <PaginationControls
        hasNextPage={end < products.length}
        hasPrevPage={start > 0}
        totalPages={totalPages}
      />
                        </div>
                    </div>
                </div>
           </Container>
        </div>
    );
}
export default CategoryPage;