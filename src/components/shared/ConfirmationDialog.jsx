import { useRef } from "react";
import { CircleAlert } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "./Button"; // Cambia la importación

const ConfirmationDialog = ({
  isOpen = true,
  title = "¿Estás seguro que deseas eliminar este elemento?",
  onClose,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-50 bg-black/50 overflow-auto"
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative"
      >
        <Button
          variant="secondary"
          size="sm"
          className="!p-1 !absolute !top-2 !right-2"
          onClick={onClose}
          aria-label="Cerrar Modal"
        >
          <X className="w-5 h-5 text-gray-600" strokeWidth={3} />
        </Button>

        <div className="text-center">
          <CircleAlert
            className="w-20 h-20 text-red-600 mx-auto"
            strokeWidth={1.5}
          />
          <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
            {title}
          </h3>
          <div className="flex justify-center gap-3">
            <Button
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
              onClick={onCancel}
              disabled={loading}
            >
              No, Cancelar
            </Button>
            <Button
              variant="danger"
              size="md"
              className="w-full sm:w-auto"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Sí, estoy seguro"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
