import { Button } from "../components/shared";

const ProductItem = ({ product, onDelete, isDeleting }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 flex flex-col gap-2">
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm w-fit">
            {product.category}
          </span>
          <span className="text-green-600 font-bold">${product.price}</span>
        </div>
      </div>
      <Button
        type="button"
        variant="danger"
        size="sm"
        className="mt-4 md:mt-0"
        onClick={() => onDelete(product._id)}
        disabled={isDeleting}
      >
        {isDeleting ? "Eliminando..." : "Eliminar"}
      </Button>
    </div>
  );
};

export default ProductItem;
