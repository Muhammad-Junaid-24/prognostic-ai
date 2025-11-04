import React, { useState } from "react";
import ModalBin from "../../assets/pngs/modalbin.png";

const DeleteCampaignModal = ({ isOpen, onClose, onDelete, itemId }) => {
  const [confirmationText, setConfirmationText] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setConfirmationText(e.target.value);
  };

  const isDeleteDisabled = confirmationText !== "DELETE CAMPAIGN";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(255,255,255,0.63)]"
    >
      <div
        className="bg-white rounded-lg p-[60px] text-center shadow-[0px_0px_30px_0px_#AAAAAA29] w-[515px] h-auto"
      >
        <img src={ModalBin} alt="Bin Icon" className="w-20 mx-auto mb-10" />
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Are you sure you want to delete this campaign?
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          This will disrupt any ongoing follow-ups and opt-in forms. You won't
          be able to undo this.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Type <span className="font-bold">" DELETE CAMPAIGN "</span> to confirm.
        </p>
        <input
          type="text"
          value={confirmationText}
          onChange={handleInputChange}
          placeholder="Type ' DELETE CAMPAIGN ' to confirm"
          className="w-full px-4 py-2 border rounded-lg mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-none"
        />
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => {
              setConfirmationText("");
              onClose();
            }}
            className="w-[200px] px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(itemId)}
            disabled={isDeleteDisabled}
            className={`w-[200px] px-6 py-3 rounded-lg text-white ${
              isDeleteDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCampaignModal;
