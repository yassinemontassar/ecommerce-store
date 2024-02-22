'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from './ui/button'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    totalPages,
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '6'

  return (
    <div className="flex items-center justify-center gap-4 mt-3">
      <Button
        className={`bg-blue-500 text-white p-2 rounded ${
          !hasPrevPage ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`?page=${Number(page) - 1}&per_page=${per_page}`,{ scroll: false });
        }}
      >
        Précédent
      </Button>

      <div>
        {page} / {totalPages}
      </div>

      <Button
        className={`bg-blue-500 text-white p-2 rounded ${
          !hasNextPage ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`?page=${Number(page) + 1}&per_page=${per_page}`,{ scroll: false });
        }}
      >
        Suivant 
      </Button>
    </div>
  );
};

export default PaginationControls