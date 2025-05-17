import React, { useState } from "react";

const Button = () => {
  const [ color, setColor ] = useState("blue");
  const [ label, setLabel ] = useState("Abort");

  const rules = {
    "blue": {
      "Abort": "Hold"
    },
    "red": {
      "Abort": ""
    },
    "white": {
      "Abort": ""
    },
    "yellow": {
      "Abort": ""
    },
    "black": {
      "Abort": ""
    }
  }
};