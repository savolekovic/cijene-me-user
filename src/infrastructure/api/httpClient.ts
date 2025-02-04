import { ApiError } from '../../core/errors/ApiError';

export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(
      data?.message || response.statusText,
      response.status,
      data
    );
  }
  return response.json();
} 