import Button from "./vanilla/Button";
import ComplicatedWires from "./vanilla/ComplicatedWires";
import Keypads from "./vanilla/Keypads";
import Knobs from "./vanilla/Knobs";
import Memory from "./vanilla/Memory";
import MorseCode from "./vanilla/MorseCode";
import Passwords from "./vanilla/Passwords";

const moduleRegistry = {
  button: {
    name: "Button",
    component: Button,
  },
  complicatedWires: {
    name: "Complicated Wires",
    component: ComplicatedWires,
  },
  keypads: {
    name: "Keypads",
    component: Keypads,
  },
  knobs: {
    name: "Knobs",
    component: Knobs,
  },
  memory: {
    name: "Memory",
    component: Memory,
  },
  morseCode: {
    name: "Morse Code",
    component: MorseCode,
  },
  passwords: {
    name: "Passwords",
    component: Passwords,
  },
};

export default moduleRegistry;
