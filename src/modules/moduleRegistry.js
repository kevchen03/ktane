import Button from "./vanilla/Button";
import ComplicatedWires from "./vanilla/ComplicatedWires";
import Keypads from "./vanilla/Keypads";
import Knobs from "./vanilla/Knobs";
import Mazes from "./vanilla/Mazes";
import Memory from "./vanilla/Memory";
import MorseCode from "./vanilla/MorseCode";
import Passwords from "./vanilla/Passwords";
import SimonSays from "./vanilla/SimonSays";
import WhosOnFirst from "./vanilla/WhosOnFirst";
import Wires from "./vanilla/Wires";
import WireSequences from "./vanilla/WireSequences";
import ColourFlash from "./centurion/section-1/ColourFlash";

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
  whosOnFirst: {
    name: "Who's on First",
    component: WhosOnFirst,
  },
  wires: {
    name: "Wires",
    component: Wires,
  },
  wireSequences: {
    name: "Wire Sequences",
    component: WireSequences,
  },
  colourFlash: {
    name: "Colour Flash",
    component: ColourFlash,
  },
};

export default moduleRegistry;
