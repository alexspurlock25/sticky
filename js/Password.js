"use strict";

// Class for password related ops
class Password {
    #password;
    constructor(pass) {
        this.#password = pass;
    }
    
    get numericPasswordRate() {
        return this.calculatePasswordStrength();
    }
    // function to rate password
    calculatePasswordStrength(){
        let passStrenRate = 0;
    
        // at least one upper case
        if (this.#password.match("^(?=.*[A-Z])")) {
            passStrenRate++;
        }
        // at least two upper case
        if (this.#password.match("^(?=.*[A-Z].*[A-Z])")) {
            passStrenRate++;
        }
        // at least 4 lower case
        if(this.#password.match("^(?=.*[a-z].*[a-z].*[a-z].*[a-z])")) {
            passStrenRate++;
        }
        // at least one number
        if(this.#password.match("^(?=.*[0-9])")) {
            passStrenRate++;
        }
        // at least two numbers
        if(this.#password.match("^(?=.*[0-9].*[0-9])")) {
            passStrenRate++;
        }
        // at least three numbers
        if(this.#password.match("^(?=.*[0-9].*[0-9].*[0-9])")) {
            passStrenRate++;
        }
        // at least four numbers
        if(this.#password.match("^(?=.*[0-9].*[0-9].*[0-9].*[0-9])")) {
            passStrenRate++;
        }
        // at least one symbol
        if(this.#password.match("^(?=.*[!@#$&*])")) {
            passStrenRate++;
        }
        // at least 5 characters
        if(this.#password.match("^(?=.{5,})")) {
            passStrenRate++;
        }
        // at least 12 characters
        if(this.#password.match("^(?=.{12,})")) {
            passStrenRate++;
        }
        
        return passStrenRate;
    }

}

// source: https://stackoverflow.com/a/40404011/11262704
module.exports = Password;