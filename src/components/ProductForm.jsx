import { useForm } from "react-hook-form";
import { Inputfield, Modal, Button } from "./shared";
import { useCreateProduct } from "../hooks/useCreateProduct";

const ProductForm = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createProductMutation = useCreateProduct();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    createProductMutation.mutate(data, {
      onSuccess: () => handleClose(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar producto">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Inputfield
          label="Nombre"
          name="name"
          type="text"
          register={register}
          rules={{
            required: "El nombre es obligatorio.",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres.",
            },
          }}
          errors={errors}
          placeholder="Escribe el nombre del producto"
        />
        <Inputfield
          label="Descripción"
          name="description"
          type="text"
          register={register}
          errors={errors}
          placeholder="Escribe la descripción del producto"
        />
        <Inputfield
          label="Precio"
          name="price"
          type="number"
          register={register}
          rules={{
            required: "El precio es obligatorio.",
            min: {
              value: 0,
              message: "El precio no puede ser negativo.",
            },
          }}
          errors={errors}
          placeholder="Escribe el precio del producto"
        />

        <Inputfield
          label="Categoría"
          name="category"
          type="text"
          register={register}
          rules={{
            required: "La categoría es obligatoria.",
          }}
          errors={errors}
          placeholder="Escribe la categoría del producto"
        />
        <Button type="submit" variant="primary" size="md">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ProductForm;
