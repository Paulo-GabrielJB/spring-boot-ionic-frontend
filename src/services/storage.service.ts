import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {

        let usr: string = localStorage.getItem(STORAGE_KEYS.localUseer);

        if(usr == null || usr == "")
            return null;
        
        return JSON.parse(usr);

    }

    setLocalUser(obj: LocalUser): void{
        if(obj == null)
            localStorage.removeItem(STORAGE_KEYS.localUseer);
        else
            localStorage.setItem(STORAGE_KEYS.localUseer, JSON.stringify(obj));
    }

    getCart(): Cart{
        let cart: string = localStorage.getItem(STORAGE_KEYS.cart);

        if(cart == null || cart == '')
            return null;
        
        return JSON.parse(cart);
    }

    setCart(obj: Cart): void{
        if(obj == null)
            localStorage.removeItem(STORAGE_KEYS.cart);
        else
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    }

}