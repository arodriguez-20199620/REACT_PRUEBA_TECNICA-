import { useState, Suspense, lazy, useEffect } from "react";
import { Button, Spinner } from "../components/shared";

const ProductForm = lazy(() => import("../components/ProductForm"));

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProductAdded = (data) => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Agregar Producto
      </Button>
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
    </div>
  );
};

export default Home;
