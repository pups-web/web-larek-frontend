export interface ProductsList {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface BasketInfo {
	id: string;
	title: string;
	price: number;
	count?: number;
}

export interface OrderInfo {
	total: number;
	items: string[];
	email: string;
	phone: string;
	address: string;
	payment: string;
}

export interface FormError{
	valid: boolean;
	errors: string[];
}

export interface ProductsData {
	products: ProductsList[];
	preview: string | null;
	getProducts():ProductsList[];
	getProduct(id: string):ProductsList;
	
}

export interface BasketData {
	products: BasketInfo[];
	appendToBasket(product: ProductsList): void;
	removeFromBasket(product: ProductsList): void;
	getButtonStatus(product: ProductsList): string;
	getBasketSum(): number;
	clearBasket(): void;
	
}

export interface OrderData {
	formErrors: FormError;
	order: OrderInfo;
	setOrderPayment(value: string): void;
	setOrderEmail(value: string): void;
	setOrderPhone(value: string): void;
	validateOrder(): boolean;
	clearOrder(): void;
}

export interface CardAct {
	onClick: (event: MouseEvent) => void;
}

export interface SuccessActs {
	onClick: () => void;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

