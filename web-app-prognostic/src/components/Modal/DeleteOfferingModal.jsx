import React from "react";
import ModalBin from "../../assets/pngs/modalbin.png";

const DeleteOfferingModal = ({ isOpen, onClose, onDelete, itemId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(255,255,255,0.63)]">
      <div className="bg-white rounded-lg p-[60px] text-center shadow-[0px_0px_30px_0px_#AAAAAA29] w-[515px] h-[360px]">
        <img src={ModalBin} alt="Bin Icon" className="w-20 mx-auto mb-10" />
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Are you sure you want to delete
          {/* <span className="font-bold">#{itemId}</span>? */}
        </h3>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-[200px] px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(itemId)}
            className="w-[200px] px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOfferingModal;
