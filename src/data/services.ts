import type { Service } from "@/types/agency";
import { WEB_STUDIO_SERVICE } from "./web-studio";
import { SYSTEM_LAB_SERVICE } from "./system-lab";

/**
 * DAFTAR MASTER LAYANAN ANTRONIX (2 PILAR DIVISI)
 */
export const SERVICES: Service[] = [
  WEB_STUDIO_SERVICE,
  SYSTEM_LAB_SERVICE,
];
