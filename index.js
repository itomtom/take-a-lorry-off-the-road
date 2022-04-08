import { readFileSync } from "fs";
import { Packaging } from "./Packaging.js";

const boxes = JSON.parse(readFileSync("./boxes.json"));
const orders = JSON.parse(readFileSync("./orders.json"));

const packaging = new Packaging(boxes, orders);
console.log(packaging.getIntelligentPackaging());

const largestFootprint = packaging.getLargestFootprint();
const intelligentFootprint = packaging.getIntelligentFootprint();

const haveSaved =
  largestFootprint - intelligentFootprint > 1000 ? "have" : "haven't";

console.log(
  `The sum of the CO2 footprint without Intelligent Packaging is: ${largestFootprint}`
);
console.log(
  `The sum of the CO2 footprint with Intelligent Packaging is: ${intelligentFootprint}`
);
console.log(`We ${haveSaved} saved 1000kg of CO2`);
