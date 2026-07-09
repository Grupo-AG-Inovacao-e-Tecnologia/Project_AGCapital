"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { ChevronDown, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  DEFAULT_TEXT_LAYOUT,
  EMAIL_SIGNATURE_TEMPLATE_PATH,
  SIGNATURE_BASE_HEIGHT,
  SIGNATURE_BASE_WIDTH,
  SIGNATURE_SCALE,
  type TextLayout,
} from "../../../constants/email-signature";
import { formatPhone } from "../../../utils/format-phone";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "600"],
});

type LayoutField = keyof typeof DEFAULT_TEXT_LAYOUT;
type LayoutKey = keyof TextLayout;

const LAYOUT_FIELDS: LayoutField[] = ["name", "phone", "email"];

const LAYOUT_LABELS: Record<LayoutField, string> = {
  name: "Nome",
  phone: "Telefone",
  email: "E-mail",
};

export function EmailSignatureGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [layout, setLayout] = useState(DEFAULT_TEXT_LAYOUT);
  const [templateImage, setTemplateImage] = useState<HTMLImageElement | null>(
    null,
  );
  const [fontsReady, setFontsReady] = useState(false);
  const [adjustmentsOpen, setAdjustmentsOpen] = useState(false);

  const fontFamily = inter.style.fontFamily;

  useEffect(() => {
    const image = new Image();
    image.src = EMAIL_SIGNATURE_TEMPLATE_PATH;
    image.onload = () => setTemplateImage(image);
  }, []);

  useEffect(() => {
    Promise.all([
      document.fonts.load(`600 20px ${fontFamily}`),
      document.fonts.load(`250 15px ${fontFamily}`),
    ]).then(() => setFontsReady(true));
  }, [fontFamily]);

  const updateLayout = useCallback(
    (field: LayoutField, key: LayoutKey, value: number) => {
      setLayout((currentLayout) => ({
        ...currentLayout,
        [field]: {
          ...currentLayout[field],
          [key]: value,
        },
      }));
    },
    [],
  );

  const drawSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context || !templateImage || !fontsReady) return;

    canvas.width = SIGNATURE_BASE_WIDTH * SIGNATURE_SCALE;
    canvas.height = SIGNATURE_BASE_HEIGHT * SIGNATURE_SCALE;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
    context.textBaseline = "alphabetic";
    context.fillStyle = "#ffffff";

    const fields: Array<{ text: string; layout: TextLayout }> = [
      { text: name, layout: layout.name },
      { text: phone, layout: layout.phone },
      { text: email, layout: layout.email },
    ];

    for (const field of fields) {
      if (!field.text) continue;

      const fontSize = field.layout.size * SIGNATURE_SCALE;
      context.font = `${field.layout.weight} ${fontSize}px ${fontFamily}`;
      context.fillText(
        field.text,
        field.layout.x * SIGNATURE_SCALE,
        field.layout.y * SIGNATURE_SCALE,
      );
    }
  }, [email, fontFamily, fontsReady, layout, name, phone, templateImage]);

  useEffect(() => {
    drawSignature();
  }, [drawSignature]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fileName = (name.trim() || "assinatura").replace(/\s+/g, "_");
    const link = document.createElement("a");
    link.download = `assinatura_${fileName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Card className={cn("mx-auto w-full max-w-3xl", inter.className)}>
      <CardHeader>
        <CardTitle>Gerador de assinatura de e-mail</CardTitle>
        <CardDescription>
          Preencha os dados do parceiro e baixe a imagem pronta (PNG).
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="signature-name">Nome completo</FieldLabel>
            <Input
              id="signature-name"
              placeholder="Nome Sobrenome"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="signature-phone">Telefone</FieldLabel>
            <Input
              id="signature-phone"
              type="tel"
              inputMode="numeric"
              placeholder="(48) 9 9900-9900"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="signature-email">E-mail</FieldLabel>
            <Input
              id="signature-email"
              type="email"
              placeholder="nome@empresa.com.br"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
        </FieldGroup>

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <canvas
            ref={canvasRef}
            className="block h-auto w-full"
            aria-label="Pré-visualização da assinatura de e-mail"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" onClick={handleDownload}>
            <Download className="size-4" />
            Baixar PNG
          </Button>
          <p className="text-muted-foreground text-sm">
            A imagem será gerada com 800×238 px.
          </p>
        </div>

        <Collapsible open={adjustmentsOpen} onOpenChange={setAdjustmentsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground w-full justify-between px-0"
            >
              Ajuste fino de posição e tamanho
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  adjustmentsOpen && "rotate-180",
                )}
              />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 pt-2">
            {LAYOUT_FIELDS.map((field) => (
              <div key={field} className="grid gap-3 sm:grid-cols-3">
                <Field>
                  <FieldLabel>{LAYOUT_LABELS[field]} - X</FieldLabel>
                  <Input
                    type="number"
                    value={layout[field].x}
                    onChange={(event) =>
                      updateLayout(field, "x", Number(event.target.value))
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel>{LAYOUT_LABELS[field]} - Y</FieldLabel>
                  <Input
                    type="number"
                    value={layout[field].y}
                    onChange={(event) =>
                      updateLayout(field, "y", Number(event.target.value))
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel>{LAYOUT_LABELS[field]} - tamanho</FieldLabel>
                  <Input
                    type="number"
                    value={layout[field].size}
                    onChange={(event) =>
                      updateLayout(field, "size", Number(event.target.value))
                    }
                  />
                </Field>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
