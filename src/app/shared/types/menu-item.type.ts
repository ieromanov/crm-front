export type MenuItem = {
  title: string;
  link?: string;
  icon?: string;
  children?: MenuItem[];
  data?: { header: string };
};
