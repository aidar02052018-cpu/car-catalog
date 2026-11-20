// Заявки в демо-режиме. Раньше они записывались в Supabase, но бесплатная база
// засыпает без посетителей и потом удаляется, и формы переставали работать.
// Теперь заявка проверяется формой и никуда не отправляется.

export type LeadKind = "contact" | "test_drive" | "purchase";

export type LeadPayload = {
  kind: LeadKind;
  name: string;
  phone: string;
  message?: string | null;
  car_id?: string;
  car_name?: string;
  config?: Record<string, unknown>;
  total_price?: number;
};

export async function submitLead(payload: LeadPayload): Promise<void> {
  void payload;
  // короткая пауза, чтобы кнопка успела показать «отправляем»
  await new Promise((resolve) => setTimeout(resolve, 500));
}
