export function pickTextColor(bgColor: string): string {
  const color = bgColor.charAt(0) === "#" ? bgColor.slice(1, 7) : bgColor;
  const r = Number.parseInt(color.slice(0, 2), 16); // hexToR
  const g = Number.parseInt(color.slice(2, 4), 16); // hexToG
  const b = Number.parseInt(color.slice(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";
}
