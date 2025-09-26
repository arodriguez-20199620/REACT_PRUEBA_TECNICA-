import { useRef } from "react";
import { X } from "lucide-react";
import { Button } from "./Button"; // Importa tu botón reutilizable

export const Modal = ({
  isOpen = true,
  onClose,
  title = "Modal Title",
  children,
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
        {/* Botón de cerrar */}
        <Button
          variant="secondary"
          size="sm"
          className="!p-1 !absolute !top-2 !right-2"
          onClick={onClose}
          aria-label="Cerrar Modal"
        >
          <X className="w-5 h-5 text-gray-600" strokeWidth={3} />
        </Button>
        <div className="flex items-center pb-3 border-b border-gray-300">
          <h3 className="text-slate-900 text-xl font-semibold flex-1">
            {title}
          </h3>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};