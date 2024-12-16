import ProductsSearchForm from "@/components/products/ProductsSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

type SearchProps = {
  searchParams: Promise<{ search: string }>;
};

const searchProducts = async (searchTerm: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
};

const Search = async ({ searchParams }: SearchProps) => {
  const search = (await searchParams).search;
  const products = await searchProducts(search);

  return (
    <>
      <Heading>Resultados de búsqueda: &quot;{search}&quot;</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductsSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
};

export default Search;
