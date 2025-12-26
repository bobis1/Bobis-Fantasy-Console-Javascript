const createMemory =  require("./create-memory");
const CPU = require("./cpu");
const instructions = require("./instructions");

const PC = 0;
const ACC = 1;
const R1 = 2;
const R2 = 3;


let i = 0;

const memory = createMemory(256 * 256);
const writeableBytes = new Uint8Array(memory.buffer);

const cpu = new CPU(memory);

writeableBytes[i++] = instructions.SHOVE_LTT_REG;
writeableBytes[i++] = 0x12; //0x1234
writeableBytes[i++] = 0x34;
writeableBytes[i++] = R1;

writeableBytes[i++] = instructions.SHOVE_LTT_REG;
writeableBytes[i++] = 0x00;
writeableBytes[i++] = 0x01;
writeableBytes[i++] = R2;


writeableBytes[i++] = instructions.SMUSH_REG_REG;
writeableBytes[i++] = R1; //R1
writeableBytes[i++] = R2; //R2


writeableBytes[i++] = instructions.SHOVE_REG_MEM;
writeableBytes[i++] = ACC;
writeableBytes[i++] = 0x01;
writeableBytes[i++] = 0x00;



cpu.debug();
cpu.viewMemoryAt(cpu.getRegister("PC"));
cpu.viewMemoryAt(0x0100);

cpu.step();

cpu.debug();
cpu.viewMemoryAt(cpu.getRegister("PC"));
cpu.viewMemoryAt(0x0100);


cpu.step();

cpu.debug();
cpu.viewMemoryAt(cpu.getRegister("PC"));
cpu.viewMemoryAt(0x0100);


cpu.step();

cpu.debug();
cpu.viewMemoryAt(cpu.getRegister("PC"));
cpu.viewMemoryAt(0x0100);
