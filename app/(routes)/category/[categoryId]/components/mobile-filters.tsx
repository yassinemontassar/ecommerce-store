"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size, prices } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { Suspense, useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
  prices: prices[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors, prices }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const handleFilterSelection = () => {
    // Add logic here to handle filter selection if needed
    // ...

    // Close the dialog
    onClose();
  };
  return (
    <>
      <Button
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden mt-6"
      >
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-[100] lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-end px-4 ">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* Render the filters */}
            <div className="p-4">
              {/* <Filter valueKey="sizeId" name="Sizes" data={sizes} onSelect={handleFilterSelection} /> */}
              <Suspense>
              <Filter valueKey="colorId" name="Coleur" data={colors} onSelect={handleFilterSelection} />
              <Filter valueKey="price" name="Prix" data={prices} onSelect={handleFilterSelection} />
              </Suspense>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
export default MobileFilters;
