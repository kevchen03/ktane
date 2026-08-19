import Button from "./vanilla/Button";
import ComplicatedWires from "./vanilla/ComplicatedWires";

const moduleRegistry = {
  button: {
    name: "Button",
    component: Button,
  },
  complicatedWires: {
    name: "Complicated Wires",
    component: ComplicatedWires,
  },
};

export default moduleRegistry;