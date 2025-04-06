
export type BadgeVariant = 'eco' | 'luxury' | 'feature';

export interface Badge {
  label: string;
  variant: BadgeVariant;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  details: string;
  badges: Badge[];
}
