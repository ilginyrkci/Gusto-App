// src/components/SuccessPopup.jsx

const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-md w-full">
        <p className="mb-4 text-lg font-semibold">{message}</p>
        <button onClick={onClose} className="btn btn-primary">
          Kapat
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
