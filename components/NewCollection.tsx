import { Product } from "@/types";
import Image from "next/image";



interface ProductListProps {
  items: Product[];
};


const NewCollection: React.FC<ProductListProps> = ({
  items
}) => {
    return(

        <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header className="text-center">
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Nos favoris</h2>

      <p className="mx-auto mt-4 max-w-md text-gray-500">

      </p>
    </header>

    <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <li key={items[0].id}>
        <a href={`/product/${items[0].id}`} className="group relative block">
          <Image
            src={items[0].images[0].url}
            alt={items[0].name}
            sizes="(min-width: 808px) 50vw, 100vw"
            width={50}
            height={50}
            priority
            className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
          />

          <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
            <h3 className="text-xl font-medium text-white">{items[0].name}</h3>

            <span
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Commander 
            </span>
          </div>
        </a>
      </li>

       <li key={items[1].id}>

  <a href={`/product/${items[1].id}`} className="group relative block">
          <Image
            src={items[1].images[0].url}
            alt={items[1].name}
            sizes="(min-width: 808px) 50vw, 100vw"
            width={50}
            height={50}
            priority
            className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
          />


          <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
            <h3 className="text-xl font-medium text-white">{items[1].name}</h3>

            <span
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Commander 
            </span>
          </div>
        </a>
      </li>


      <li key={items[2].id} className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <a href={`/product/${items[2].id}`}  className="group relative block">
          <Image
             src={items[2].images[0].url}
             alt={items[2].name}
             sizes="(min-width: 808px) 50vw, 100vw"
             width={50}
             height={50}
             priority
            className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
          />

          <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
            <h3 className="text-xl font-medium text-white">{items[2].name}</h3>

            <span
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Commander 
            </span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</section>
    )
}
export default NewCollection;