const createMemory =  require("./create-memory");
const CPU = require("./cpu");
const instructions = require("./instructions");

const memory = createMemory(256);
const writeableBytes = new Uint8Array(memory.buffer);

const cpu = new CPU(memory);

writeableBytes[0] = instructions.SHOVE_R1;
writeableBytes[1] = 0x12; //0x1234
writeableBytes[2] = 0x34;

writeableBytes[3] = instructions.SHOVE_R2;
writeableBytes[4] = 0x56;
writeableBytes[5] = 0x78;


writeableBytes[6] = instructions.SMUSH_REG_REG;
writeableBytes[7] = 2; //R1
writeableBytes[8] = 3; //R2

cpu.debug();

cpu.step();

cpu.debug();

cpu.step();

cpu.debug();

cpu.step();

cpu.debug();