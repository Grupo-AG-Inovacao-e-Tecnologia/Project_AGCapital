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

export const DEFAULT_SIGNATURE_ROLE = "Agente Tributário";

export const BAKED_ROLE_COVER = {
  x: 155,
  y: 60,
  width: 160,
  height: 24,
  color: "#488BE5",
} as const;

export const DEFAULT_TEXT_LAYOUT = {
  name: { x: 161, y: 55, size: 20, weight: 600 },
  role: { x: 161, y: 78, size: 15, weight: 400 },
  phone: { x: 161, y: 111, size: 15, weight: 400 },
  email: { x: 161, y: 136, size: 15, weight: 400 },
} satisfies Record<"name" | "role" | "phone" | "email", TextLayout>;
