import { LineString, MultiPolygon, Point, Polygon } from "geojson";
import * as gju from "./";

describe("geojson-utils-ts", () => {
  describe("lineStringsIntersect", () => {
    it("should run as expected", () => {
      const diagonalUp: LineString = {
        type: "LineString",
        coordinates: [
          [0, 0],
          [10, 10],
        ],
      };
      const diagonalDown: LineString = {
        type: "LineString",
        coordinates: [
          [10, 0],
          [0, 10],
        ],
      };
      const farAway: LineString = {
        type: "LineString",
        coordinates: [
          [100, 100],
          [110, 110],
        ],
      };

      expect(gju.lineStringsIntersect(diagonalUp, diagonalDown)).toEqual([
        { coordinates: [5, 5], type: "Point" },
      ]);
      expect(gju.lineStringsIntersect(diagonalUp, farAway)).toBe(false);
    });
  });

  describe("pointInPolygon", () => {
    test("case 1 should run as expected", () => {
      const box: Polygon = {
        type: "Polygon",
        coordinates: [
          [
            [0, 0],
            [10, 0],
            [10, 10],
            [0, 10],
          ],
        ],
      };

      const inBox: Point = { type: "Point", coordinates: [5, 5] };
      const outBox: Point = { type: "Point", coordinates: [15, 15] };
      expect(gju.pointInPolygon(inBox, box)).toBe(true);
      expect(gju.pointInPolygon(outBox, box)).toBe(false);
    });

    test("case 2 should run as expected", () => {
      const point: Point = { type: "Point", coordinates: [0.5, 0.5] };

      const poly: Polygon = {
        type: "Polygon",
        coordinates: [
          [
            [0, 2],
            [2, 2],
            [2, 0],
          ],
        ],
      };

      expect(gju.pointInPolygon(point, poly)).toBe(false);
    });

    test("case 3 should run as expected", () => {
      const point: Point = { type: "Point", coordinates: [705, 261] };
      const poly: Polygon = {
        type: "Polygon",
        coordinates: [
          [
            [702.5, 344.50000000000006],
            [801.890625, 245.109375],
            [749.7351485148515, 234.28465346534657],
          ],
        ],
      };

      expect(gju.pointInPolygon(point, poly)).toBe(false);
    });
  });

  describe("pointInMultiPolygon", () => {
    test("should run as expected", () => {
      const point: Point = { type: "Point", coordinates: [0.5, 0.5] };
      const singlepoint: Point = { type: "Point", coordinates: [-1, -1] };
      const multipoly: MultiPolygon = {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [0, 0],
              [0, 10],
              [10, 10],
              [10, 0],
              [0, 0],
            ],
          ],
          [
            [
              [10, 10],
              [10, 20],
              [20, 20],
              [20, 10],
              [10, 10],
            ],
          ],
        ],
      };

      expect(gju.pointInMultiPolygon(point, multipoly)).toBe(true);
      expect(gju.pointInMultiPolygon(singlepoint, multipoly)).toBe(false);
    });
  });

  describe("drawCircle", () => {
    it("should run as expected", () => {
      expect(
        gju.drawCircle(10, { type: "Point", coordinates: [0, 0] })
          .coordinates[0]
      ).toHaveLength(15);
      expect(
        gju.drawCircle(10, { type: "Point", coordinates: [0, 0] }, 50)
          .coordinates[0]
      ).toHaveLength(50);
    });
  });

  describe("rectangleCentroid", () => {
    it("should run as expected", () => {
      const box: Polygon = {
        type: "Polygon",
        coordinates: [
          [
            [0, 0],
            [10, 0],
            [10, 10],
            [0, 10],
          ],
        ],
      };

      const centroid = gju.rectangleCentroid(box);

      expect(centroid.coordinates[0]).toEqual(5);
      expect(centroid.coordinates[1]).toEqual(5);
    });
  });

  describe("pointDistance", () => {
    it("should run as expected", () => {
      const fairyLand: Point = {
        type: "Point",
        coordinates: [-122.260000705719, 37.80919060818706],
      };
      const navalBase: Point = {
        type: "Point",
        coordinates: [-122.32083320617676, 37.78774223089045],
      };
      expect(Math.floor(gju.pointDistance(fairyLand, navalBase))).toEqual(5852);
    });
  });
});
