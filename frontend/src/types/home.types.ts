import type { IIcon } from './admin.types';

export interface ISubCategoryHome {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface IGetAllCategoriesHome {
  data: {
    _id: string;
    name: string;
    slug: string;
    icon: IIcon;
    subCategories: ISubCategoryHome[];
  }[];
}
