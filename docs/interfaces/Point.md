[geojson-utils-ts](../README.md) / [Exports](../modules.md) / Point

# Interface: Point

Point geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.2

## Hierarchy

- [`GeoJsonObject`](GeoJsonObject.md)

  ↳ **`Point`**

## Table of contents

### Properties

- [bbox](Point.md#bbox)
- [coordinates](Point.md#coordinates)
- [type](Point.md#type)

## Properties

### bbox

• `Optional` **bbox**: [`BBox`](../modules.md#bbox)

Bounding box of the coordinate range of the object's Geometries, Features, or Feature Collections.
The value of the bbox member is an array of length 2*n where n is the number of dimensions
represented in the contained geometries, with all axes of the most southwesterly point
followed by all axes of the more northeasterly point.
The axes order of a bbox follows the axes order of geometries.
https://tools.ietf.org/html/rfc7946#section-5

#### Inherited from

[GeoJsonObject](GeoJsonObject.md).[bbox](GeoJsonObject.md#bbox)

#### Defined in

node_modules/@types/geojson/index.d.ts:67

___

### coordinates

• **coordinates**: [`Position`](../modules.md#position)

#### Defined in

node_modules/@types/geojson/index.d.ts:88

___

### type

• **type**: ``"Point"``

Specifies the type of GeoJSON object.

#### Overrides

[GeoJsonObject](GeoJsonObject.md).[type](GeoJsonObject.md#type)

#### Defined in

node_modules/@types/geojson/index.d.ts:87