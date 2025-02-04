import { formatDistanceToNow } from 'date-fns';
import { srLatn } from 'date-fns/locale';

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('me', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatRelativeTime(dateString: string) {
  try {
    const distance = formatDistanceToNow(new Date(dateString), { 
      addSuffix: true,
      locale: srLatn 
    });
    
    return distance.replace('pre', 'prije');
  } catch (error) {
    return dateString;
  }
} 