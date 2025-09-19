export type Category = string;
export type Photo = {
  src: string;
  alt: string;
  category: FilterKey;
  caption?: string;
};

export type FilterKey = "all" | Category;
