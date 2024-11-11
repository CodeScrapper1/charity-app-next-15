export type IUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

// navitems
export type INavItem = {
  name: string;
  href: string;
  icon: any;
};
