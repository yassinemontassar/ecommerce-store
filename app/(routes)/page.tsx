import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import NewCollection from "@/components/NewCollection";
import Billboard from "@/components/billboard";
import ProductListTest from "@/components/productTest";
import Container from "@/components/ui/container";
const HomePage = async () => {
    const billboard= await getBillboard();
    const Newproducts= await getProducts({ isNew: true});
    const FeaturedProducts= await getProducts({ isFeatured: true});
    return (
       <Container>
        <div className="space-y-10 pb-10">
        <Billboard
        data={billboard}
        />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <NewCollection items={FeaturedProducts} />
            <ProductListTest  title="Nouveautés de la semaine" items={Newproducts} />
        </div>
        </div>
       </Container> 
    );
}
export default HomePage;