const createMemory = require('./create-memory.js');
const instruction = require("./instructions.js");


class CPU{
    constructor(memory) {
        this.memory = memory;

        this.registerNames = [
            "PC", "ACC", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"
        ];

        this.registers = createMemory(this.registerNames.length * 2);

       this.registerMap = this.registerNames.reduce((map, name, i) => {
         map[name] = i * 2;
        return map;
    }, {});
    }

    getRegister (name) {
        if(!(name in this.registerMap)) {
            throw new Error(`No register of '${name}' in register map`);
        }
        return this.registers.getUint16 (this.registerMap[name]);

    }


    setRegister (name, value) {
        if(!(name in this.registerMap)) {
            throw new Error(`No register of '${name}' in register map`);
        }
        return this.registers.setUint16 (this.registerMap[name], value);

    }

    fetch (){
        const nextInstructionAddress = this.getRegister("PC");
        const instruction = this.memory.getUint8(nextInstructionAddress);
        this.setRegister("PC", nextInstructionAddress+1);
        return instruction;
    }

    fetch16 (){
        const nextInstructionAddress = this.getRegister("PC");
        const instruction = this.memory.getUint16(nextInstructionAddress);
        this.setRegister("PC", nextInstructionAddress+2);
        return instruction;
    }

    step(){
        const instruction = this.fetch();
        return this.execute(instruction)
    }

    debug(){
        this.registerNames.forEach(name => {
            console.log(`${name}: 0x${this.getRegister(name).toString(16).padStart(4, '0')}`);
        });
        console.log();
    }

    execute(instruction){
        switch(instruction){
            //Move into R1
            case  0x10:{
                const literal = this.fetch16
                this.setRegister("R1", literal)
            }

            //Move into R2
            case  0x11:{
                const literal = this.fetch16
                this.setRegister("R1", literal)
            }

            case 0x12:{
                const R1 = this.fetch;
                const R2 = this.fetch;
                const registerValue1 = this.registers.getUint16 (R1 * 2);
                const registerValue2 = this.registers.getUint16 (R2 * 2);
                this.setRegister("ACC", registerValue1 + registerValue2);
                return;
            }
        }
    }



}

module.exports = CPU;