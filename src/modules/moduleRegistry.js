import Button from "./vanilla/Button";
import ComplicatedWires from "./vanilla/ComplicatedWires";
import Keypads from "./vanilla/Keypads";

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
};

export default moduleRegistry;