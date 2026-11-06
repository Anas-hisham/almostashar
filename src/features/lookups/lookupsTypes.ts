/* ---------- responses ----------
 * Swagger only says "200 OK". Best guess below: open Swagger -> "Try it out" and compare;
 * if a field name differs, fix it HERE.
 */
export interface Governorate {
  id: number;
  name: string;
  nameAr?: string | null;
}

export interface City {
  id: number;
  name: string;
  nameAr?: string | null;
  governorateId?: number;
}

export interface Specialization {
  id: number;
  title: string;
  arabicTitle: string;
}
