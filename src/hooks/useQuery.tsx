import { useLocation } from 'react-router-dom';

interface Props {
  data: string | string[];
}

export default function useQuery(): URLSearchParams {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
