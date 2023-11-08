type Rating = {
    count: number;
    rate: number;
}

export type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
    rating: Rating;
}