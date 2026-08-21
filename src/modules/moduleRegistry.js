import Button from "./vanilla/Button";
import ComplicatedWires from "./vanilla/ComplicatedWires";
import Keypads from "./vanilla/Keypads";
import Knobs from "./vanilla/Knobs";
import Mazes from "./vanilla/Mazes";
import Memory from "./vanilla/Memory";
import MorseCode from "./vanilla/MorseCode";
import Passwords from "./vanilla/Passwords";
import SimonSays from "./vanilla/SimonSays";
import Wires from "./vanilla/Wires";

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
  mazes: {
    name: "Mazes",
    component: Mazes,
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
  simonSays: {
    name: "Simon Says",
    component: SimonSays,
  },
  wires: {
    name: "Wires",
    component: Wires,
  }
};

export default moduleRegistry;
