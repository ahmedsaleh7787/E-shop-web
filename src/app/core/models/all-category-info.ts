export interface AllCategoryInfo {

    results: number;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    data: {
        _id: string;
        name: string;
        slug: string;
        image: string;
        createdAt: string;
        updatedAt: string;
    }[];
}