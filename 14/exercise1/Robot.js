export default class Robot {
    constructor(name, leg) {
        this.name = name
        this.leg = leg

        console.log(`Hi I am ${this.name}. Thank you`)
    }

    sayHi() {
        console.log(`Hello! Myself ${this.name}`)
    }
}
