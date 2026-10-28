const member = require('./export')

class pet extends member{

    //first step is to create constructor same as parent class and then call parent class constructor using super method 
    constructor(firstname,lastname){

        super(firstname,lastname)
        
    }

    //lets craete location method to override location method of parent class
   get location(){
        return "india"
}

}

let petobj = new pet("titan","baeur")
console.log(petobj.location) 
petobj.fullname()