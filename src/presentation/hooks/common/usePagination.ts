import { useSearchParams, useNavigate } from 'react-router-dom';

interface PaginationConfig {
  initialPage?: number;
  initialPerPage?: number;
}

export const usePagination = (config: PaginationConfig = {}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get values from URL or use defaults
  const page = Number(searchParams.get('page')) || config.initialPage || 1;
  const perPage = Number(searchParams.get('per_page')) || config.initialPerPage || 20;

  const onPageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    newParams.set('per_page', perPage.toString());
    navigate(`?${newParams.toString()}`, { replace: false });
  };

  return {
    page,
    perPage,
    onPageChange
  };
}; 