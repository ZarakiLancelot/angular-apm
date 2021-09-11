import { Component, OnInit } from "@angular/core";
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

    private _listFilter: string = '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    products: IProduct[] = [
        {
            "productId"     :   2,
            "productName"   :   "Garden Cart",
            "productCode"   :   "GDN-0023",
            "releaseDate"   :   "March 18, 2021",
            "description"   :   "15 gallon capacity rolling garden cart",
            "price"         :   32.99,
            "starRating"    :   4.2,
            "imageUrl"      :   "assets/images/garden_cart.png"
        },
        {
            "productId"     :   5,
            "productName"   :   "Hammer",
            "productCode"   :   "TBX-0048",
            "releaseDate"   :   "May 21, 2021",
            "description"   :   "Curved claw steel hammer",
            "price"         :   8.9,
            "starRating"    :   4.8,
            "imageUrl"      :   "assets/images/hammer.png"
        }
    ];

    ngOnInit(): void{
        this.listFilter = 'cart'
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter( (product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy) );
    }
 }