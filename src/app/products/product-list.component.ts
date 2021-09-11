import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { IProduct } from "./products";

@Component({
    selector:       'pm-products',
    templateUrl:    './product-list.component.html',
    styleUrls:      ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Products List';
    showImage: boolean = false;

    filteredProducts: IProduct[] = [];

    private _productService;

    constructor(private productService: ProductService){
        this._productService = productService;
    }

    private _listFilter: string = '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    products: IProduct[] = [];

    ngOnInit(): void{
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter( (product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy) );
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Products List: ' + message;
    }
 }