// const cat = (a:string, b:string)=>{
//     return a + b;
// }
// interface Point{
//     x: number,
//     y: number
// }

// const drawCube = (p: Point)=>{
//     console.log(p.x, p.y)
// }

// class Ape {
//     protected _brain: string;

//     constructor(){
//         console.log("Ape's constructor");
//         this._brain = 'small';
//     }

//     public sayName(): void {
//         console.log(`I am ape with ${this._brain} brains`);
//     }

//     //гетер
//     public get brain():string{
//         return this._brain;
//     }
// }

// class Human extends Ape {
//     private hands = 'universal';
//     constructor(){
//         super();
//         console.log("Human's constructor!");
//         this._brain = 'huge';
//     }
//     public sayName():void{
//         console.log(`I am human with ${this._brain} brains`);
//     }
//     public async think() {
//         await setTimeout(()=>{
//             console.log('catch fish!')
//         }, 3000)
  
//     }
// }


// // console.log(cat('I love', ' typescript!'));
// // drawCube({y:1, x:2})

// const ape: Ape = new Ape();
// ape.sayName();
// console.log(ape.brain);

// const ape2: Ape = new Human();
// console.log(ape2.brain);
// ape2.sayName();
// (<Ape>ape2).sayName();

// (ape2 as Human).think();