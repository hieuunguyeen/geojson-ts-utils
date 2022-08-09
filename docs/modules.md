[geojson-utils-ts](README.md) / Exports

# geojson-utils-ts

## Table of contents

### Interfaces

- [Feature](interfaces/Feature.md)
- [FeatureCollection](interfaces/FeatureCollection.md)
- [GeoJsonObject](interfaces/GeoJsonObject.md)
- [GeometryCollection](interfaces/GeometryCollection.md)
- [LineString](interfaces/LineString.md)
- [MultiLineString](interfaces/MultiLineString.md)
- [MultiPoint](interfaces/MultiPoint.md)
- [MultiPolygon](interfaces/MultiPolygon.md)
- [Point](interfaces/Point.md)
- [Polygon](interfaces/Polygon.md)

### Type Aliases

- [BBox](modules.md#bbox)
- [GeoJSON](modules.md#geojson)
- [GeoJsonGeometryTypes](modules.md#geojsongeometrytypes)
- [GeoJsonProperties](modules.md#geojsonproperties)
- [GeoJsonTypes](modules.md#geojsontypes)
- [Geometry](modules.md#geometry)
- [GeometryObject](modules.md#geometryobject)
- [Position](modules.md#position)

### Functions

- [area](modules.md#area)
- [boundingBoxAroundPolyCoords](modules.md#boundingboxaroundpolycoords)
- [centroid](modules.md#centroid)
- [destinationPoint](modules.md#destinationpoint)
- [drawCircle](modules.md#drawcircle)
- [geometryWithinRadius](modules.md#geometrywithinradius)
- [lineStringsIntersect](modules.md#linestringsintersect)
- [numberToDegree](modules.md#numbertodegree)
- [numberToRadius](modules.md#numbertoradius)
- [pnpoly](modules.md#pnpoly)
- [pointDistance](modules.md#pointdistance)
- [pointInBoundingBox](modules.md#pointinboundingbox)
- [pointInMultiPolygon](modules.md#pointinmultipolygon)
- [pointInPolygon](modules.md#pointinpolygon)
- [rectangleCentroid](modules.md#rectanglecentroid)
- [simplify](modules.md#simplify)

## Type Aliases

### BBox

Ƭ **BBox**: [`number`, `number`, `number`, `number`] \| [`number`, `number`, `number`, `number`, `number`, `number`]

Bounding box
https://tools.ietf.org/html/rfc7946#section-5

#### Defined in

node_modules/@types/geojson/index.d.ts:32

___

### GeoJSON

Ƭ **GeoJSON**: [`Geometry`](modules.md#geometry) \| [`Feature`](interfaces/Feature.md) \| [`FeatureCollection`](interfaces/FeatureCollection.md)

Union of GeoJSON objects.

#### Defined in

node_modules/@types/geojson/index.d.ts:73

___

### GeoJsonGeometryTypes

Ƭ **GeoJsonGeometryTypes**: [`Geometry`](modules.md#geometry)[``"type"``]

The valid values for the "type" property of GeoJSON geometry objects.
https://tools.ietf.org/html/rfc7946#section-1.4

#### Defined in

node_modules/@types/geojson/index.d.ts:20

___

### GeoJsonProperties

Ƭ **GeoJsonProperties**: { `[name: string]`: `any`;  } \| ``null``

#### Defined in

node_modules/@types/geojson/index.d.ts:145

___

### GeoJsonTypes

Ƭ **GeoJsonTypes**: [`GeoJSON`](modules.md#geojson)[``"type"``]

The value values for the "type" property of GeoJSON Objects.
https://tools.ietf.org/html/rfc7946#section-1.4

#### Defined in

node_modules/@types/geojson/index.d.ts:26

___

### Geometry

Ƭ **Geometry**: [`Point`](interfaces/Point.md) \| [`MultiPoint`](interfaces/MultiPoint.md) \| [`LineString`](interfaces/LineString.md) \| [`MultiLineString`](interfaces/MultiLineString.md) \| [`Polygon`](interfaces/Polygon.md) \| [`MultiPolygon`](interfaces/MultiPolygon.md) \| [`GeometryCollection`](interfaces/GeometryCollection.md)

Geometry object.
https://tools.ietf.org/html/rfc7946#section-3

#### Defined in

node_modules/@types/geojson/index.d.ts:79

___

### GeometryObject

Ƭ **GeometryObject**: [`Geometry`](modules.md#geometry)

#### Defined in

node_modules/@types/geojson/index.d.ts:80

___

### Position

Ƭ **Position**: `number`[]

A Position is an array of coordinates.
https://tools.ietf.org/html/rfc7946#section-3.1.1
Array should contain between two and three elements.
The previous GeoJSON specification allowed more elements (e.g., which could be used to represent M values),
but the current specification only allows X, Y, and (optionally) Z to be defined.

#### Defined in

node_modules/@types/geojson/index.d.ts:41

## Functions

### area

▸ **area**(`polygon`): `number`

Find the area of a polygon
http://paulbourke.net/geometry/polyarea/javascript.txt

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | [`Polygon`](interfaces/Polygon.md) |

#### Returns

`number`

#### Defined in

[index.ts:320](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L320)

___

### boundingBoxAroundPolyCoords

▸ **boundingBoxAroundPolyCoords**(`coords`): [`Position`](modules.md#position)[]

Create the bouding box with given coordinates

#### Parameters

| Name | Type |
| :------ | :------ |
| `coords` | [`Position`](modules.md#position)[][] |

#### Returns

[`Position`](modules.md#position)[]

#### Defined in

[index.ts:62](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L62)

___

### centroid

▸ **centroid**(`polygon`): [`Point`](interfaces/Point.md)

Find the centroid of a polygon
Adapted from http://paulbourke.net/geometry/polyarea/javascript.txt

#### Parameters

| Name | Type |
| :------ | :------ |
| `polygon` | [`Polygon`](interfaces/Polygon.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:348](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L348)

___

### destinationPoint

▸ **destinationPoint**(`point`, `bearing`, `distance`): [`Point`](interfaces/Point.md)

Given a start point, initial bearing, and distance, this will calculate the destina­tion point and final bearing travelling along a (shortest distance) great circle arc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](interfaces/Point.md) |
| `bearing` | `number` |
| `distance` | `number` |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:503](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L503)

___

### drawCircle

▸ **drawCircle**(`radiusInMeters`, `centerPoint`, `steps?`): [`Polygon`](interfaces/Polygon.md)

Draw a circle polygon using a center point and radius

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `radiusInMeters` | `number` | `undefined` |
| `centerPoint` | [`Point`](interfaces/Point.md) | `undefined` |
| `steps` | `number` | `15` |

#### Returns

[`Polygon`](interfaces/Polygon.md)

#### Defined in

[index.ts:213](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L213)

___

### geometryWithinRadius

▸ **geometryWithinRadius**(`geometry`, `center`, `radius`): `boolean`

Checks if geometry lies entirely within a circle
works with Point, LineString, Polygon

#### Parameters

| Name | Type |
| :------ | :------ |
| `geometry` | [`Geometry`](modules.md#geometry) |
| `center` | [`Point`](interfaces/Point.md) |
| `radius` | `number` |

#### Returns

`boolean`

#### Defined in

[index.ts:287](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L287)

___

### lineStringsIntersect

▸ **lineStringsIntersect**(`line1`, `line2`): [`Point`](interfaces/Point.md)[] \| `boolean`

Find the intersection of 2 lines

Adapted from http://www.kevlindev.com/gui/math/intersection/Intersection.js

#### Parameters

| Name | Type |
| :------ | :------ |
| `line1` | [`LineString`](interfaces/LineString.md) |
| `line2` | [`LineString`](interfaces/LineString.md) |

#### Returns

[`Point`](interfaces/Point.md)[] \| `boolean`

#### Defined in

[index.ts:17](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L17)

___

### numberToDegree

▸ **numberToDegree**(`number`): `number`

Convert a number to degree

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `number` |

#### Returns

`number`

#### Defined in

[index.ts:206](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L206)

___

### numberToRadius

▸ **numberToRadius**(`number`): `number`

Convert a number to radius

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `number` |

#### Returns

`number`

#### Defined in

[index.ts:198](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L198)

___

### pnpoly

▸ **pnpoly**(`x`, `y`, `coords`): `boolean`

http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
Implement Point inclusion algorithm. Check if point is inside a polygon

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `coords` | [`Position`](modules.md#position)[][] |

#### Returns

`boolean`

#### Defined in

[index.ts:101](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L101)

___

### pointDistance

▸ **pointDistance**(`pt1`, `pt2`): `number`

Find distance between 2 points
http://www.movable-type.co.uk/scripts/latlong.html

#### Parameters

| Name | Type |
| :------ | :------ |
| `pt1` | [`Point`](interfaces/Point.md) |
| `pt2` | [`Point`](interfaces/Point.md) |

#### Returns

`number`

#### Defined in

[index.ts:267](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L267)

___

### pointInBoundingBox

▸ **pointInBoundingBox**(`point`, `bounds`): `boolean`

Check whether the point is inside the bounding box

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](interfaces/Point.md) |
| `bounds` | [`Position`](modules.md#position)[] |

#### Returns

`boolean`

#### Defined in

[index.ts:85](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L85)

___

### pointInMultiPolygon

▸ **pointInMultiPolygon**(`point`, `poly`): `boolean`

Check if point is inside a GeoJSON multipolygon (but not donut)

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](interfaces/Point.md) |
| `poly` | [`MultiPolygon`](interfaces/MultiPolygon.md) |

#### Returns

`boolean`

#### Defined in

[index.ts:165](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L165)

___

### pointInPolygon

▸ **pointInPolygon**(`point`, `poly`): `boolean`

Check if point is inside a GeoJSON polygon

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](interfaces/Point.md) |
| `poly` | [`Polygon`](interfaces/Polygon.md) |

#### Returns

`boolean`

#### Defined in

[index.ts:134](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L134)

___

### rectangleCentroid

▸ **rectangleCentroid**(`rectangle`): [`Point`](interfaces/Point.md)

Find the centroid of a rectangle, assuming rectangle starts at lower left point

#### Parameters

| Name | Type |
| :------ | :------ |
| `rectangle` | [`Polygon`](interfaces/Polygon.md) |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:249](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L249)

___

### simplify

▸ **simplify**(`source`, `kink?`): [`Point`](interfaces/Point.md)[]

Simplify a polygon

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | [`Point`](interfaces/Point.md)[] | `undefined` | array of geojson points |
| `kink` | `number` | `20` | in metres, kink depth is the height of the triangle abc where a-b and b-c are two consecutive line segments |

#### Returns

[`Point`](interfaces/Point.md)[]

#### Defined in

[index.ts:384](https://github.com/hieuunguyeen/geojson-ts-utils/blob/d6008df/index.ts#L384)
