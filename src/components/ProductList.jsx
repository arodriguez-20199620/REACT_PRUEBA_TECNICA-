import ProductItem from "./ProductItem";

const ProductList = ({ products, onDelete, isDeleting }) => {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500">No hay productos.</div>;
  }

  return (
    <div className="grid gap-6">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default ProductList;
