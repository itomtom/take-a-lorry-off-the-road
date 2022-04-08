export class Packaging {
  constructor(boxes, orders) {
    this.boxes = this.parseBoxes(boxes);
    this.orders = orders;
  }

  parseBoxes(boxes) {
    return boxes
      .map(({ id, name, co2FootprintKg, dimensions }) => {
        const { widthMm, heightMm, depthMm } = dimensions;
        return {
          id,
          name,
          volumeMm3: widthMm * heightMm * depthMm,
          co2FootprintKg,
        };
      })
      .sort((a, b) => a.volumeMm3 - b.volumeMm3);
  }

  getIntelligentPackaging() {
    return this.orders.map(({ id, ingredients }) => {
      const volumeMm3 =
        ingredients.reduce((sum, ingredient) => sum + ingredient.volumeCm3, 0) *
        1000;
      const box = this.boxes.find((box) => volumeMm3 < box.volumeMm3);

      return {
        order_id: id,
        box_id: box.id,
      };
    });
  }

  getLargestFootprint() {
    return (
      this.boxes[this.boxes.length - 1].co2FootprintKg * this.orders.length
    );
  }

  getIntelligentFootprint() {
    return this.getIntelligentPackaging().reduce((sum, { box_id }) => {
      return sum + this.boxes.find((box) => box.id === box_id).co2FootprintKg;
    }, 0);
  }
}
