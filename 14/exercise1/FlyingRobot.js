import Robot from './Robot.js'

export default class FlyingRobot extends Robot {
    constructor(name, leg) {
        super(name, leg)
        
        this.sayHi()
    }

    sayHi() {
        console.log(`Hello! Myself ${this.name} and I can fly`)
    }

    takeOff() {
        console.log(`${this.name} taking off`)
    }
    
    land() {
        console.log(`${this.name} landing now`)
    }
}