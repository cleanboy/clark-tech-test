type Rating = {
    count: number;
    rate: number;
}

export type Product = {
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
    rating: Rating;
}