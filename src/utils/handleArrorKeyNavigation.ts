export const handleArrowKeyNavigation = (
  key: string,
  selectedIndex: number | null,
  length: number,
) => {
  let newIndex = selectedIndex ?? -1;
  if (key === 'ArrowDown') {
    return (newIndex = Math.min(length - 1, newIndex + 1));
  } else if (key === 'ArrowUp') {
    return (newIndex = Math.max(0, newIndex - 1));
  }
  return null;
};
