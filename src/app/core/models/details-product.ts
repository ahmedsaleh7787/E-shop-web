export interface DetailsProduct {
  data: {
    sold: number ; 
    images: string[];
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    availableColors?: string[];
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    createdAt: string; 
    updatedAt: string; 
    id: string;
  };
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
}


