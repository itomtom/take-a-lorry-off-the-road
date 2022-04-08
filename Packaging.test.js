import { Packaging } from "./Packaging.js";

const boxes = [
  {
    id: "PK-LRG-03",
    name: "Large",
    dimensions: {
      widthMm: 20,
      heightMm: 100,
      depthMm: 50,
    },
    co2FootprintKg: 300,
  },
  {
    id: "PK-SML-02",
    name: "Small",
    dimensions: {
      widthMm: 20,
      heightMm: 80,
      depthMm: 50,
    },
    co2FootprintKg: 100,
  },
];
const orders = [
  {
    id: "1",
    ingredients: [
      {
        name: "radishes",
        volumeCm3: 9,
      },
      {
        name: "aubergine",
        volumeCm3: 18,
      },
      {
        name: "super pasta",
        volumeCm3: 27,
      },
      {
        name: "honey",
        volumeCm3: 7.2,
      },
      {
        name: "duck",
        volumeCm3: 23,
      },
    ],
  },
  {
    id: "2",
    ingredients: [
      {
        name: "artichokes",
        volumeCm3: 20,
      },
      {
        name: "haricots",
        volumeCm3: 6.7,
      },
      {
        name: "noodles",
        volumeCm3: 18,
      },
      {
        name: "broccoli",
        volumeCm3: 27.9,
      },
      {
        name: "mayonnaise",
        volumeCm3: 3,
      },
    ],
  },
];

describe("Packaging", () => {
  let packaging;
  beforeAll(() => {
    packaging = new Packaging(boxes, orders);
  });

  test("should have boxes and orders", () => {
    expect(packaging.boxes).toEqual([
      {
        id: "PK-SML-02",
        name: "Small",
        volumeMm3: 80000,
        co2FootprintKg: 100,
      },
      {
        id: "PK-LRG-03",
        name: "Large",
        volumeMm3: 100000,
        co2FootprintKg: 300,
      },
    ]);
    expect(packaging.orders).toEqual(orders);
  });

  test("should return list of intelligent packaging", () => {
    expect(packaging.getIntelligentPackaging()).toEqual([
      {
        order_id: "1",
        box_id: "PK-LRG-03",
      },
      {
        order_id: "2",
        box_id: "PK-SML-02",
      },
    ]);
  });

  test("should return largest footprint", () => {
    expect(packaging.getLargestFootprint()).toBe(600);
  });

  test("should return footprint for intelligent packaging", () => {
    expect(packaging.getIntelligentFootprint()).toBe(400);
  });
});
