import {
  Point,
  LineString,
  Position,
  Polygon,
  MultiPolygon,
  Geometry,
} from "geojson";

/**
 * Find the intersection of 2 lines
 *
 * Adapted from http://www.kevlindev.com/gui/math/intersection/Intersection.js
 */
export function lineStringsIntersect(
  line1: LineString,
  line2: LineString
): Array<Point> | boolean {
  let intersects: Array<Point> | boolean = [];
  for (let i = 0; i <= line1.coordinates.length - 2; ++i) {
    for (let j = 0; j <= line2.coordinates.length - 2; ++j) {
      const a1 = {
          x: line1.coordinates[i][1],
          y: line1.coordinates[i][0],
        },
        a2 = {
          x: line1.coordinates[i + 1][1],
          y: line1.coordinates[i + 1][0],
        },
        b1 = {
          x: line2.coordinates[j][1],
          y: line2.coordinates[j][0],
        },
        b2 = {
          x: line2.coordinates[j + 1][1],
          y: line2.coordinates[j + 1][0],
        },
        ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
        ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),
        u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
      if (u_b != 0) {
        const ua = ua_t / u_b,
          ub = ub_t / u_b;
        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
          intersects.push({
            type: "Point",
            coordinates: [a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)],
          });
        }
      }
    }
  }
  if (intersects.length === 0) intersects = false;
  return intersects;
}

/**
 * Create the bouding box with given coordinates
 */
export function boundingBoxAroundPolyCoords(
  coords: Array<Array<Position>>
): Array<Position> {
  let xAll: Array<number> = [];
  let yAll: Array<number> = [];

  for (const c of coords[0]) {
    xAll.push(c[1]);
    yAll.push(c[0]);
  }

  xAll = xAll.sort((a, b) => a - b);
  yAll = yAll.sort((a, b) => a - b);

  return [
    [xAll[0], yAll[0]],
    [xAll[xAll.length - 1], yAll[yAll.length - 1]],
  ];
}

/**
 * Check whether the point is inside the bounding box
 */
export function pointInBoundingBox(
  point: Point,
  bounds: Array<Position>
): boolean {
  return !(
    point.coordinates[1] < bounds[0][0] ||
    point.coordinates[1] > bounds[1][0] ||
    point.coordinates[0] < bounds[0][1] ||
    point.coordinates[0] > bounds[1][1]
  );
}

/**
 * http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
 * Implement Point inclusion algorithm. Check if point is inside a polygon
 */
export function pnpoly(
  x: number,
  y: number,
  coords: Array<Array<Position>>
): boolean {
  const vert = [[0, 0]];

  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords[i].length; j++) {
      vert.push(coords[i][j]);
    }
    vert.push(coords[i][0]);
    vert.push([0, 0]);
  }

  let inside = false;
  for (let i = 0, j = vert.length - 1; i < vert.length; j = i++) {
    if (
      vert[i][0] > y != vert[j][0] > y &&
      x <
        ((vert[j][1] - vert[i][1]) * (y - vert[i][0])) /
          (vert[j][0] - vert[i][0]) +
          vert[i][1]
    )
      inside = !inside;
  }

  return inside;
}

/**
 * Check if point is inside a GeoJSON polygon
 */
export function pointInPolygon(point: Point, poly: Polygon): boolean {
  if (poly.type !== "Polygon") {
    throw new Error(`Expecting Polygon, got polygon.type=${poly?.type}`);
  }
  const coords = [poly.coordinates];

  let insideBox = false;
  let insidePoly = false;

  if (
    coords.some((c) =>
      pointInBoundingBox(point, boundingBoxAroundPolyCoords(c))
    )
  ) {
    insideBox = true;
  }

  if (!insideBox) return false;

  if (
    coords.some((c) => pnpoly(point.coordinates[1], point.coordinates[0], c))
  ) {
    insidePoly = true;
  }

  return insidePoly;
}

/**
 * Check if point is inside a GeoJSON multipolygon (but not donut)
 */
export function pointInMultiPolygon(point: Point, poly: MultiPolygon): boolean {
  if (poly.type !== "MultiPolygon") {
    throw new Error(`Expecting MultiPolygon, got polygon.type=${poly?.type}`);
  }
  const coords_array = [poly.coordinates];

  let insideBox = false;
  let insidePoly = false;
  for (let i = 0; i < coords_array.length; i++) {
    const coords = coords_array[i];
    for (let j = 0; j < coords.length; j++) {
      if (!insideBox) {
        if (pointInBoundingBox(point, boundingBoxAroundPolyCoords(coords[j]))) {
          insideBox = true;
        }
      }
    }
    if (!insideBox) return false;
    for (let j = 0; j < coords.length; j++) {
      if (!insidePoly) {
        if (pnpoly(point.coordinates[1], point.coordinates[0], coords[j])) {
          insidePoly = true;
        }
      }
    }
  }

  return insidePoly;
}

/**
 * Convert a number to radius
 */
export function numberToRadius(number: number): number {
  return (number * Math.PI) / 180;
}

/**
 * Convert a number to degree
 */

export function numberToDegree(number: number): number {
  return (number * 180) / Math.PI;
}

/**
 * Draw a circle polygon using a center point and radius
 */
export function drawCircle(
  radiusInMeters: number,
  centerPoint: Point,
  steps: number = 15
): Polygon {
  const center = [centerPoint.coordinates[1], centerPoint.coordinates[0]],
    dist = radiusInMeters / 1000 / 6371,
    // convert meters to radiant
    radCenter = [numberToRadius(center[0]), numberToRadius(center[1])],
    // 15 sided circle
    poly = [[center[0], center[1]]];
  for (let i = 0; i < steps; i++) {
    const bearing = (2 * Math.PI * i) / steps;
    const lat = Math.asin(
      Math.sin(radCenter[0]) * Math.cos(dist) +
        Math.cos(radCenter[0]) * Math.sin(dist) * Math.cos(bearing)
    );
    const lng =
      radCenter[1] +
      Math.atan2(
        Math.sin(bearing) * Math.sin(dist) * Math.cos(radCenter[0]),
        Math.cos(dist) - Math.sin(radCenter[0]) * Math.sin(lat)
      );
    poly[i] = [];
    poly[i][1] = numberToDegree(lat);
    poly[i][0] = numberToDegree(lng);
  }
  return {
    type: "Polygon",
    coordinates: [poly],
  };
}

/**
 * Find the centroid of a rectangle, assuming rectangle starts at lower left point
 */
export function rectangleCentroid(rectangle: Polygon): Point {
  const bbox = rectangle.coordinates[0];
  const xmin = bbox[0][0],
    ymin = bbox[0][1],
    xmax = bbox[2][0],
    ymax = bbox[2][1];
  const xwidth = xmax - xmin;
  const ywidth = ymax - ymin;
  return {
    type: "Point",
    coordinates: [xmin + xwidth / 2, ymin + ywidth / 2],
  };
}

/**
 * Find distance between 2 points
 * http://www.movable-type.co.uk/scripts/latlong.html
 */
export function pointDistance(pt1: Point, pt2: Point): number {
  const lon1 = pt1.coordinates[0],
    lat1 = pt1.coordinates[1],
    lon2 = pt2.coordinates[0],
    lat2 = pt2.coordinates[1],
    dLat = numberToRadius(lat2 - lat1),
    dLon = numberToRadius(lon2 - lon1),
    a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(numberToRadius(lat1)) *
        Math.cos(numberToRadius(lat2)) *
        Math.pow(Math.sin(dLon / 2), 2),
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c * 1000; // returns meters
}

/**
 * Checks if geometry lies entirely within a circle
 * works with Point, LineString, Polygon
 */
export function geometryWithinRadius(
  geometry: Geometry,
  center: Point,
  radius: number
): boolean {
  if (geometry.type === "Point") {
    return pointDistance(geometry, center) <= radius;
  } else if (geometry.type === "LineString" || geometry.type === "Polygon") {
    const point: Point = {
      type: "Point",
      coordinates: [],
    };
    let coordinates;
    if (geometry.type === "Polygon") {
      // it's enough to check the exterior ring of the Polygon
      coordinates = geometry.coordinates[0];
    } else {
      coordinates = geometry.coordinates;
    }
    for (const i in coordinates) {
      point.coordinates = coordinates[i];
      if (pointDistance(point, center) > radius) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Find the area of a polygon
 * http://paulbourke.net/geometry/polyarea/javascript.txt
 */
export function area(polygon: Polygon): number {
  let area = 0;
  // TODO: polygon holes at coordinates[1]
  const points = polygon.coordinates[0];
  let j = points.length - 1;
  let p1, p2;

  for (let i = 0; i < points.length; j = i++) {
    const p1 = {
      x: points[i][1],
      y: points[i][0],
    };
    const p2 = {
      x: points[j][1],
      y: points[j][0],
    };
    area += p1.x * p2.y;
    area -= p1.y * p2.x;
  }

  area /= 2;
  return area;
}

/**
 * Find the centroid of a polygon
 * Adapted from http://paulbourke.net/geometry/polyarea/javascript.txt
 */
export function centroid(polygon: Polygon): Point {
  let f,
    x = 0,
    y = 0;
  // TODO: polygon holes at coordinates[1]
  const points = polygon.coordinates[0];
  let j = points.length - 1;
  let p1, p2;

  for (let i = 0; i < points.length; j = i++) {
    const p1 = {
      x: points[i][1],
      y: points[i][0],
    };
    const p2 = {
      x: points[j][1],
      y: points[j][0],
    };
    f = p1.x * p2.y - p2.x * p1.y;
    x += (p1.x + p2.x) * f;
    y += (p1.y + p2.y) * f;
  }

  f = area(polygon) * 6;
  return {
    type: "Point",
    coordinates: [y / f, x / f],
  };
}

/**
 * Simplify a polygon
 *
 * @param source - array of geojson points
 * @param kink - in metres, kink depth is the height of the triangle abc where a-b and b-c are two consecutive line segments
 */
export function simplify(
  source: Array<Point>,
  kink: number = 20
): Array<Point> {
  const result: Array<{ lat: number; lng: number }> = source.map(function (o) {
    return {
      lng: o.coordinates[0],
      lat: o.coordinates[1],
    };
  });

  let n_source, n_stack, n_dest, start, end, i, sig;
  let dev_sqr, max_dev_sqr, band_sqr;
  let x12, y12, d12, x13, y13, d13, x23, y23, d23;
  const F = (Math.PI / 180.0) * 0.5;
  const index =
    new Array(); /* aray of indexes of source points to include in the reduced line */
  const sig_start = new Array(); /* indices of start & end of working section */
  const sig_end = new Array();

  /* check for simple cases */

  if (result.length < 3) return source; /* one or two points */

  /* more complex case. initialize stack */

  n_source = result.length;
  band_sqr = (kink * 360.0) / (2.0 * Math.PI * 6378137.0); /* Now in degrees */
  band_sqr *= band_sqr;
  n_dest = 0;
  sig_start[0] = 0;
  sig_end[0] = n_source - 1;
  n_stack = 1;

  /* while the stack is not empty  ... */
  while (n_stack > 0) {
    /* ... pop the top-most entries off the stacks */

    start = sig_start[n_stack - 1];
    end = sig_end[n_stack - 1];
    n_stack--;

    if (end - start > 1) {
      /* any intermediate points ? */

      /* ... yes, so find most deviant intermediate point to
        either side of line joining start & end points */

      x12 = result[end].lng - result[start].lng;
      y12 = result[end].lat - result[start].lat;
      if (Math.abs(x12) > 180.0) x12 = 360.0 - Math.abs(x12);
      x12 *= Math.cos(
        F * (result[end].lat + result[start].lat)
      ); /* use avg lat to reduce lng */
      d12 = x12 * x12 + y12 * y12;

      for (i = start + 1, sig = start, max_dev_sqr = -1.0; i < end; i++) {
        x13 = result[i].lng - result[start].lng;
        y13 = result[i].lat - result[start].lat;
        if (Math.abs(x13) > 180.0) x13 = 360.0 - Math.abs(x13);
        x13 *= Math.cos(F * (result[i].lat + result[start].lat));
        d13 = x13 * x13 + y13 * y13;

        x23 = result[i].lng - result[end].lng;
        y23 = result[i].lat - result[end].lat;
        if (Math.abs(x23) > 180.0) x23 = 360.0 - Math.abs(x23);
        x23 *= Math.cos(F * (result[i].lat + result[end].lat));
        d23 = x23 * x23 + y23 * y23;

        if (d13 >= d12 + d23) dev_sqr = d23;
        else if (d23 >= d12 + d13) dev_sqr = d13;
        else
          dev_sqr = ((x13 * y12 - y13 * x12) * (x13 * y12 - y13 * x12)) / d12; // solve triangle
        if (dev_sqr > max_dev_sqr) {
          sig = i;
          max_dev_sqr = dev_sqr;
        }
      }

      if (max_dev_sqr < band_sqr) {
        /* is there a sig. intermediate point ? */
        /* ... no, so transfer current start point */
        index[n_dest] = start;
        n_dest++;
      } else {
        /* ... yes, so push two sub-sections on stack for further processing */
        n_stack++;
        sig_start[n_stack - 1] = sig;
        sig_end[n_stack - 1] = end;
        n_stack++;
        sig_start[n_stack - 1] = start;
        sig_end[n_stack - 1] = sig;
      }
    } else {
      /* ... no intermediate points, so transfer current start point */
      index[n_dest] = start;
      n_dest++;
    }
  }

  /* transfer last point */
  index[n_dest] = n_source - 1;
  n_dest++;

  /* make return array */
  const r = new Array();
  for (let i = 0; i < n_dest; i++) r.push(result[index[i]]);

  return r.map(function (o) {
    return {
      type: "Point",
      coordinates: [o.lng, o.lat],
    };
  });
}

/**
 * Given a start point, initial bearing, and distance, this will calculate the destina­tion point and final bearing travelling along a (shortest distance) great circle arc.
 */
export function destinationPoint(
  point: Point,
  bearing: number,
  distance: number
): Point {
  distance = distance / 6371; // convert distance to angular distance in radians
  bearing = numberToRadius(bearing);

  const lon1 = numberToRadius(point.coordinates[0]);
  const lat1 = numberToRadius(point.coordinates[1]);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distance) +
      Math.cos(lat1) * Math.sin(distance) * Math.cos(bearing)
  );
  let lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distance) * Math.cos(lat1),
      Math.cos(distance) - Math.sin(lat1) * Math.sin(lat2)
    );
  lon2 = ((lon2 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI; // normalise to -180..+180º

  return {
    type: "Point",
    coordinates: [numberToDegree(lon2), numberToDegree(lat2)],
  };
}
