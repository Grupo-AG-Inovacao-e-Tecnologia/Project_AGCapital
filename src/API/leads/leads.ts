"use server";

import { z } from "zod";
import { POST, PUT } from "../APIservice";

const ENDPOINTS = {
  ENROLLMENT_GROUPS: "/leads/enrollment/groups",
  SEARCH: (page: number) => `/leads/search/${page}`,
  UPDATE: (id: number) => `/leads/${id}`,
} as const;

const EnrollmentSchema = z
  .object({
    nome: z.string().min(3, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    id_pais: z.number().min(1),
    id_unidade: z.number().min(1),
    id_departamento: z.number().min(1, "Departamento é obrigatório"),
    id_cargo: z.number().min(1, "Cargo é obrigatório"),
    ddd: z.union([z.string(), z.number()]).optional(),
    telefone: z.union([z.string(), z.number()]).optional(),
    cep: z.union([z.string(), z.number()]).optional(),
    numero: z.union([z.string(), z.number()]).optional(),
    enviar_email_notificacao: z.boolean().optional(),
  })
  .passthrough()
  .refine(
    (d) =>
      (d.id_departamento != null && d.id_cargo != null) ||
      (d.id_departamento == null && d.id_cargo == null),
    {
      message: "Departamento e Cargo são obrigatórios",
      path: ["id_departamento"],
    },
  );

function getApiError(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const d = (
      error as { response?: { data?: { message?: string; error?: string } } }
    ).response?.data;
    return d?.message ?? d?.error ?? "Erro na requisição";
  }
  return error instanceof Error ? error.message : "Erro ao criar lead";
}

function toNum(v: string | number | undefined): number | undefined {
  if (v === undefined || v === "") return undefined;
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isNaN(n) ? undefined : n;
}

export async function createEnrollmentGroup(data: unknown) {
  const parsed = EnrollmentSchema.safeParse(data);
  if (!parsed.success) {
    const msg = Object.values(parsed.error.flatten().fieldErrors)
      .flat()
      .find(Boolean);
    throw new Error((msg as string) || "Dados inválidos");
  }

  const d = parsed.data;
  const payload: Record<string, unknown> = {
    ...d,
    ddd: toNum(d.ddd as string | number | undefined),
    telefone: toNum(d.telefone as string | number | undefined),
    cep: toNum(d.cep as string | number | undefined),
    numero: toNum(d.numero as string | number | undefined),
    id_departamento: d.id_departamento ?? undefined,
    id_cargo: d.id_cargo ?? undefined,
    enviar_email_notificacao: d.enviar_email_notificacao ? 1 : 0,
  };
  const body = Object.fromEntries(
    Object.entries(payload).filter(
      ([, v]) => v !== undefined && v !== "" && v !== null,
    ),
  );

  try {
    return await POST(ENDPOINTS.ENROLLMENT_GROUPS, body);
  } catch (err) {
    throw new Error(getApiError(err));
  }
}

const UpdateLeadSchema = z
  .object({
    codigo_externo: z.string().optional(),
    url: z.string().optional(),
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    emails: z.string().optional(),
    ddd: z.union([z.string(), z.number()]).optional(),
    telefone: z.union([z.string(), z.number()]).optional(),
    cpf: z.string().optional(),
    data_nascimento: z.string().optional(),
    cep: z.union([z.string(), z.number()]).optional(),
    endereco: z.string().optional(),
    numero: z.union([z.string(), z.number()]).optional(),
    bairro: z.string().optional(),
    estado: z.string().optional(),
    cidade: z.string().optional(),
    complemento: z.string().optional(),
    id_pais: z.number().min(1),
  })
  .passthrough();

function buildLeadPayload(
  d: Record<string, unknown>,
  options?: { stripCpf?: boolean },
) {
  const cpf =
    typeof d.cpf === "string" && options?.stripCpf
      ? d.cpf.replace(/\D/g, "") || undefined
      : d.cpf;

  const payload: Record<string, unknown> = {
    ...d,
    cpf,
    ddd: toNum(d.ddd as string | number | undefined),
    telefone: toNum(d.telefone as string | number | undefined),
    cep: toNum(d.cep as string | number | undefined),
    numero: toNum(d.numero as string | number | undefined),
  };

  return Object.fromEntries(
    Object.entries(payload).filter(
      ([, v]) => v !== undefined && v !== "" && v !== null,
    ),
  );
}

export async function updateLead(id: number | string, data: unknown) {
  const leadId = typeof id === "string" ? Number(id) : id;
  if (!leadId || Number.isNaN(leadId)) {
    throw new Error("ID do parceiro inválido");
  }

  const parsed = UpdateLeadSchema.safeParse(data);
  if (!parsed.success) {
    const msg = Object.values(parsed.error.flatten().fieldErrors)
      .flat()
      .find(Boolean);
    throw new Error((msg as string) || "Dados inválidos");
  }

  const body = buildLeadPayload(parsed.data as Record<string, unknown>, {
    stripCpf: true,
  });

  try {
    return await PUT(ENDPOINTS.UPDATE(leadId), body);
  } catch (err) {
    throw new Error(getApiError(err));
  }
}

export async function searchLeads(
  searchParams: Record<string, unknown> = {},
  page = 1,
) {
  try {
    const res = (await POST(ENDPOINTS.SEARCH(page), searchParams)) as Record<
      string,
      unknown
    >;
    return {
      data: Array.isArray(res?.data) ? res.data : [],
      total: typeof res?.total === "number" ? res.total : 0,
      page: typeof res?.page === "number" ? res.page : page,
      timestamp: new Date().toISOString(),
    };
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      if (
        (error as { response?: { status?: number } }).response?.status === 404
      ) {
        return {
          data: [],
          total: 0,
          page,
          timestamp: new Date().toISOString(),
        };
      }
    }
    const msg = getApiError(error);
    throw new Error(msg || "Erro ao buscar leads");
  }
}
