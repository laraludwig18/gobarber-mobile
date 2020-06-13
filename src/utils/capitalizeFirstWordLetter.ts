export default function capitalizeFirstWordLetter(
  string: string,
): string | null {
  if (!string) {
    return null;
  }

  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
