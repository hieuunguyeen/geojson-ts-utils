[geojson-utils-ts](../README.md) / [Exports](../modules.md) / GeoJsonObject

# Interface: GeoJsonObject

The base GeoJSON object.
https://tools.ietf.org/html/rfc7946#section-3
The GeoJSON specification also allows foreign members
(https://tools.ietf.org/html/rfc7946#section-6.1)
Developers should use "&" type in TypeScript or extend the interface
to add these foreign members.

## Hierarchy

- **`GeoJsonObject`**

  ↳ [`Point`](Point.md)

  ↳ [`MultiPoint`](MultiPoint.md)

  ↳ [`LineString`](LineString.md)

  ↳ [`MultiLineString`](MultiLineString.md)

  ↳ [`Polygon`](Polygon.md)

  ↳ [`MultiPolygon`](MultiPolygon.md)

  ↳ [`GeometryCollection`](GeometryCollection.md)

  ↳ [`Feature`](Feature.md)

  ↳ [`FeatureCollection`](FeatureCollection.md)

## Table of contents

### Properties

- [bbox](GeoJsonObject.md#bbox)
- [type](GeoJsonObject.md#type)

## Properties

### bbox

• `Optional` **bbox**: [`BBox`](../modules.md#bbox)

Bounding box of the coordinate range of the object's Geometries, Features, or Feature Collections.
The value of the bbox member is an array of length 2*n where n is the number of dimensions
represented in the contained geometries, with all axes of the most southwesterly point
followed by all axes of the more northeasterly point.
The axes order of a bbox follows the axes order of geometries.
https://tools.ietf.org/html/rfc7946#section-5

#### Defined in

node_modules/@types/geojson/index.d.ts:67

___

### type

• **type**: ``"Point"`` \| ``"MultiPoint"`` \| ``"LineString"`` \| ``"MultiLineString"`` \| ``"Polygon"`` \| ``"MultiPolygon"`` \| ``"GeometryCollection"`` \| ``"Feature"`` \| ``"FeatureCollection"``

Specifies the type of GeoJSON object.

#### Defined in

node_modules/@types/geojson/index.d.ts:58
