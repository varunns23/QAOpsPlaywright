module.exports = class member{

    //property and its value
    age = 27

    //getter methods.If we add 'get', then that is considered as propoerty inside class
    get location(){

        return "america"
    }

   //creating constructor inside class.Constructor is a method which executes by default when you create objects of its class
   constructor(firstname,lastname){
     //creating istance variable. instance variable can only be created in constructor

     this.firstname = firstname
     this.lastname = lastname
     // This will ensure the scope of firstname and lastname for entire class

   }

   //methods inside class
   fullname(){
   console.log(this.firstname+this.lastname)
   }

}
//creating object of a class
// let obj1 = new member("tim","joe")
// let obj2 = new member("chris","joe")
// let obj3 = new member("baran","toe")
// obj1.fullname()
// obj2.fullname()
// obj3.fullname()
// console.log("age = "+obj1.age)
// console.log(obj1.location) //here no need to add '()' after location as 'get' is used which declaring function
