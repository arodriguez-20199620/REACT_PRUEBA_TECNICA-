import { useState, Suspense, lazy } from "react";
import { Button, Spinner } from "../components/shared";
import { useProducts } from "../hooks/useProducts";

const ProductForm = lazy(() => import("../components/ProductForm"));

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useProducts({ page, pageSize });

  const handleDelete = (id) => {
    alert(`Eliminar producto con id: ${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Productos</h1>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          Agregar Producto
        </Button>
      </div>

      {isOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
              <Spinner />
            </div>
          }
        >
          <ProductForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-6">
          {data?.products?.length === 0 ? (
            <div className="text-center text-gray-500">No hay productos.</div>
          ) : (
            data?.products?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <div className="mt-2 flex flex-col gap-2">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm w-fit">
                      {product.category}
                    </span>
                    <span className="text-green-600 font-bold">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  className="mt-4 md:mt-0"
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="flex justify-center mt-8 gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </Button>
        <span className="px-3 py-1 text-gray-700 font-medium">
          Página {page}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={data?.products?.length < pageSize}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Home;
