/**
 * TYPES NAVIGASI UTAMA
 */

export interface NavChild {
  label: string;
  href: string;
  icon?: string;
  logo?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}
