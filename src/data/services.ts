import type { Service } from "@/types/agency";
import { WEB_STUDIO_SERVICE } from "./web-studio";
import { MEDIA_LAB_SERVICE } from "./media-lab";
import { SYSTEM_LAB_SERVICE } from "./system-lab";

/**
 * DAFTAR MASTER LAYANAN ANTRONIX (3 PILAR DIVISI)
 */
export const SERVICES: Service[] = [
  WEB_STUDIO_SERVICE,
  SYSTEM_LAB_SERVICE,
  MEDIA_LAB_SERVICE,
];
