import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products: Product[] = [];
  public productsFounds: Product[] = [];
  public filter = [
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia",
  ];

  public colors = [
    {
      type: "Abarrotes",
      color: "primary"
    },
    {
      type: "Frutas y Verduras",
      color: "secondary"
    },
    {
      type: "Limpieza",
      color: "warning"
    },
    {
      type: "Farmacia",
      color: "danger"
    }
  ];

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private productService: ProductService,
    private alertController: AlertController,
    private toastController: ToastController
    ) {
    this.products = this.productService.getProducts();
    this.productsFounds = this.products;
  }

  public getColor(type: string): string {
    const itemFound = this.colors.find((element) => {
      return element.type === type;
    });
    let color = itemFound && itemFound.color ? itemFound.color : "";
    return color;
  }

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  public addToCart(product: Product, i: number) {
    product.photo = product.photo + i;
    this.cartService.addToCart(product);
    console.log(this.cartService.getCart());
  }

  public openAddProduct(){
    this.router.navigate(['/add-product']);
  }

  async eliminar(i:number) {
    const a = await this.alertController.create({
      header: 'Confirmación de eliminación',
      message: '¿Seguro que desea eliminar este artículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.productService.removeProduct(i);
            const toast = await this.toastController.create({
              message: 'Eliminación completa',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
    await a.present();
  }

  async actualizar(i: number, p: Product) {
    const alert = await this.alertController.create({
      header: 'Editar artículo',
      message: 'Por favor, edite los campos deseados:',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: p.name
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripción',
          value: p.description
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Precio',
          value: p.price
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Guardar',
          handler: async (formData) => {
            // `formData` contendrá los valores ingresados por el usuario
            // Puedes acceder a ellos por nombre, por ejemplo, `formData.name`, `formData.description`, etc.
            const updatedProduct: Product = {
              name: formData.name,
              description: formData.description,
              price: formData.price,
              type: p.type,  // No se permite la edición del tipo
              photo: p.photo   // No se permite la edición de la foto
            };
  
            // Luego, llama a tu función de actualización
            this.productService.updateProduct(i, updatedProduct);
  
            // Muestra un Toast de confirmación
            const toast = await this.toastController.create({
              message: 'Actualización completa',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  
    await alert.present();
  }
  


}
