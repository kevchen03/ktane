import Button from "./vanilla/Button";
import ComplicatedWires from "./vanilla/ComplicatedWires";
import Keypads from "./vanilla/Keypads";
import Knobs from "./vanilla/Knobs";

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
};

export default moduleRegistry;
