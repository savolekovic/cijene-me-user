import { useSearchParams } from 'react-router-dom';

interface PaginationConfig {
  initialPage?: number;
  initialPerPage?: number;
}

export const usePagination = (config: PaginationConfig = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get values from URL or use defaults
  const page = Number(searchParams.get('page')) || config.initialPage || 1;
  const perPage = Number(searchParams.get('per_page')) || config.initialPerPage || 20;

  const onPageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    newParams.set('per_page', perPage.toString());
    setSearchParams(newParams, { replace: true });
  };

  return {
    page,
    perPage,
    onPageChange
  };
}; 