import { Todo } from "./todo"

export class List {
    id:string
    constructor(public name:string,public todos:Todo[]){
        this.id='_' + Math.random().toString(36).substr(2, 9);
    }

    getName():String{
        return this.name;
    }
}
