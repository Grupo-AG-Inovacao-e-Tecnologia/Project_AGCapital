export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";

  const areaCode = digits.slice(0, 2);
  if (digits.length <= 2) {
    return `(${digits}${digits.length === 2 ? ")" : ""}`;
  }

  const rest = digits.slice(2);
  const isMobile = rest[0] === "9";

  if (isMobile) {
    const mobilePrefix = rest[0];
    const body = rest.slice(1);
    if (body.length <= 4) return `(${areaCode}) ${mobilePrefix} ${body}`;
    return `(${areaCode}) ${mobilePrefix} ${body.slice(0, 4)}-${body.slice(4)}`;
  }

  if (rest.length <= 4) return `(${areaCode}) ${rest}`;
  return `(${areaCode}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
}
