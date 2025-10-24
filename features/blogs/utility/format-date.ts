export default function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // change to false for 24-hour format
  });

  return `${formattedDate}, ${formattedTime}`;
}


