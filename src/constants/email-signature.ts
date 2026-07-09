export const EMAIL_SIGNATURE_TEMPLATE_PATH =
  "/TEMPLATE - Assinatura de Parceiro-1.png";

export const SIGNATURE_BASE_WIDTH = 800;
export const SIGNATURE_BASE_HEIGHT = 238;
export const SIGNATURE_SCALE = 1;

export type TextLayout = {
  x: number;
  y: number;
  size: number;
  weight: number;
};

export const DEFAULT_TEXT_LAYOUT = {
  name: { x: 161, y: 55, size: 20, weight: 600 },
  phone: { x: 161, y: 111, size: 15, weight: 400 },
  email: { x: 161, y: 136, size: 15, weight: 400 },
} satisfies Record<"name" | "phone" | "email", TextLayout>;
