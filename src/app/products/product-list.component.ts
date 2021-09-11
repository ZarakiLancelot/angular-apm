import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "./product.service";
import { IProduct } from "./products";

@Component({
    selector:       'pm-products',
    templateUrl:    './product-list.component.html',
    styleUrls:      ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Products List';
    showImage: boolean = false;
    errorMessage: string = '';
    subscription!: Subscription;

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
        this.subscription = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void{
        this.subscription.unsubscribe();
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