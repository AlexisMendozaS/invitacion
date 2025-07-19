import React from 'react';
import { X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitado: {
    nombre: string;
    adultos: number;
    niños: number;
  } | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, invitado }) => {
  if (!isOpen || !invitado) return null;

  const handleConfirm = () => {
    const mensaje = `Confirmo mi asistencia ${invitado.nombre}`;
    const whatsappUrl = `https://wa.me/7714385039?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all max-h-[95vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex justify-between items-start gap-3 p-4 sm:p-6 border-b border-rose-200">
          <h2 className="text-3xl font-luxurious gradient-text-rose leading-tight">Confirmación de Asistencia</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="text-center">
            <div className="mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl">🎉✨🎉</span>
            </div>
            <p className="text-xl font-niconne text-rose-600 mb-3 sm:mb-4 px-2">
              Esta es tu invitación <strong className="block sm:inline break-words">{invitado.nombre}</strong>
            </p>
          </div>

          {/* Información del invitado */}
          <div className="card-elegant p-3 sm:p-4 rounded-xl space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center border-b border-rose-200 pb-2">
              <span className="font-luxurious text-rose-600 text-3xl">👥 Adultos:</span>
              <span className="font-bold text-rose-700 text-lg sm:text-xl">{invitado.adultos}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-luxurious text-rose-600 text-3xl">👶 Niños:</span>
              <span className="font-bold text-rose-700 text-lg sm:text-xl">{invitado.niños}</span>
            </div>
          </div>

          <div className="text-center text-sm sm:text-base lg:text-lg text-gray-600 font-niconne px-2 leading-relaxed">
            Al confirmar serás redirigido a WhatsApp para enviar tu confirmación
          </div>
        </div>

        {/* Footer del modal */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-rose-200">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-niconne text-base sm:text-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="w-full sm:flex-1 btn-elegant text-white rounded-full transition-all duration-300 shadow-rose font-niconne text-base sm:text-lg py-3"
          >
            💬 Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
