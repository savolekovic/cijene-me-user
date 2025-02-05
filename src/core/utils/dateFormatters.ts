import { formatDistanceToNow, differenceInSeconds, differenceInMinutes, differenceInHours } from 'date-fns';
import { srLatn } from 'date-fns/locale';

// Format like "15. januar 2024."
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('me', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format like "prije 2 dana" or "prije 5 sati"
export function formatRelativeTime(dateString: string) {
  try {
    // Parse the UTC date string and convert to local time
    const date = new Date(dateString + 'Z'); // Add 'Z' to explicitly mark as UTC
    const now = new Date();

    const secondsAgo = differenceInSeconds(now, date);
    const minutesAgo = differenceInMinutes(now, date);
    const hoursAgo = differenceInHours(now, date);

    // Just now (less than 60 seconds)
    if (secondsAgo < 60) {
      return 'upravo sada';
    }

    // Minutes ago (less than 60 minutes)
    if (minutesAgo < 60) {
      return `prije ${minutesAgo} ${minutesAgo === 1 ? 'minut' : 'minuta'}`;
    }

    // Hours ago (less than 24 hours)
    if (hoursAgo < 24) {
      return `prije ${hoursAgo} ${hoursAgo === 1 ? 'sat' : hoursAgo < 5 ? 'sata' : 'sati'}`;
    }

    // For older dates, use the date-fns formatter
    const distance = formatDistanceToNow(date, { 
      addSuffix: true,
      locale: srLatn 
    });
    
    return distance.replace('pre', 'prije');
  } catch (error) {
    return dateString;
  }
} 