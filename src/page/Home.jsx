import { useState, Suspense, lazy } from "react";
import { Button, Spinner } from "../components/shared";
import { useProducts } from "../hooks/useProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import ProductList from "../components/ProductList";
import ConfirmationDialog from "../components/shared/ConfirmationDialog";

const ProductForm = lazy(() => import("../components/ProductForm"));

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, refetch } = useProducts({ page, pageSize });
  const deleteProduct = useDeleteProduct();

  // Mostrar el dialog y guardar el id
  const handleAskDelete = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  // Eliminar si confirma
  const handleConfirmDelete = async () => {
    try {
      await deleteProduct.mutateAsync(selectedId);
      setShowConfirm(false);
      setSelectedId(null);
      refetch();
    } catch (error) {
      alert("Error al eliminar el producto");
    }
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
        <ProductList
          products={data?.products}
          onDelete={handleAskDelete} // Cambia aquí
          isDeleting={deleteProduct.isLoading}
        />
      )}

      <ConfirmationDialog
        isOpen={showConfirm}
        title="¿Estás seguro que deseas eliminar este producto?"
        onClose={() => setShowConfirm(false)}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteProduct.isLoading}
      />

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
          disabled={page * pageSize >= data?.totalProducts}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Home;
