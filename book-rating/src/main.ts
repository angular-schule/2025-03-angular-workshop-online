import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/////////////


export class Customer {
  #id: number;

  constructor() {
    this.#id = 5;
  }

  fooBar(arg: string): number {
    setTimeout(() => {
      console.log(this.#id)
    }, 2000)
    return 0;
  }
}


const myCustomer = new Customer();
myCustomer.fooBar('sdfgsdf')




const foo = function (arg: number) {
  return arg + 1;
}

const foo2 = arg => arg + 1;



const result = foo(5)
