import { StorageService } from "./storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../models/cart";
import { ProdutoDTO } from "../models/produto.dto";


@Injectable()
export class CartService {

    constructor(public storageService: StorageService) {
        
    }

    createOrClearCart(): Cart {
        let cart: Cart = { items: []};
        this.storageService.setCart(cart);
        return cart;

    }

    getCart() : Cart {
        let cart: Cart = this.storageService.getCart();
        if(cart == null)
            cart = this.createOrClearCart();

        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let pos = cart.items.findIndex(p => p.produto.id == produto.id);
        if(pos == -1)
            cart.items.push({ quantidade: 1, produto: produto });
        this.storageService.setCart(cart);

        return cart;

    }

    removeProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let pos = cart.items.findIndex(p => p.produto.id == produto.id);
        if(pos != -1)
            cart.items.splice(pos, 1);
        this.storageService.setCart(cart);

        return cart;

    }

    increaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let pos = cart.items.findIndex(p => p.produto.id == produto.id);
        if(pos != -1)
            cart.items[pos].quantidade++;
        this.storageService.setCart(cart);

        return cart;

    }

    decreaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let pos = cart.items.findIndex(p => p.produto.id == produto.id);
        if(pos != -1)
            cart.items[pos].quantidade--;
        if(cart.items[pos].quantidade < 1)
            cart = this.removeProduto(produto);
        
        this.storageService.setCart(cart);

        return cart;

    }

    total(): number{
        let cart: Cart = this.getCart();
        let sum: number = 0.0;
        for(let i: number = 0; i < cart.items.length; i++)
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        return sum;
    }

}