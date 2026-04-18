/**
 * Format a bigint nanosecond timestamp or Date as a relative time string.
 * e.g. "Just now", "5 minutes ago", "Yesterday", "Mar 15"
 */
export function formatRelativeTime(ts: bigint | number | Date): string {
  let ms: number;
  if (ts instanceof Date) {
    ms = ts.getTime();
  } else if (typeof ts === "bigint") {
    // IC timestamps are in nanoseconds
    ms = Number(ts / 1_000_000n);
  } else {
    ms = ts;
  }

  const now = Date.now();
  const diff = now - ms;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30)
    return `${Math.floor(days / 7)} ${Math.floor(days / 7) === 1 ? "week" : "weeks"} ago`;

  const date = new Date(ms);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
