import { Icon } from "@visurel/iconify-angular";

export interface MenuItemsSigning {
  type: "link";
  id?: "all" | "Inicio" | "Final";
  icon?: Icon;
  label: string;
  value?: number;
  class?: {
    icon?: string;
  };
  size?: string;
}