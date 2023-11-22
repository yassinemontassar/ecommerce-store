// CustomModal.tsx
import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { address: string; phoneNumber: string }) => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, onSubmit, children }) => {
  let address = '';
  let phoneNumber = '';

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80" />
        <div className="flex items-center justify-center h-screen">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-md">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Enter Details
              </Dialog.Title>
              {children && (
                <div className="mb-4">
                  {children}
                </div>
              )}
              <div className="flex flex-col mt-4">
                <input
                  placeholder="216+"
                  type="number"
                  className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={(e) => (phoneNumber = e.target.value)}
                 
                />
                <input
                  placeholder="Enter your address..."
                  type="text"
                  className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={(e) => (address = e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => onSubmit({ address, phoneNumber })}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                >
                  Submit
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomModal;
