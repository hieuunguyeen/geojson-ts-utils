[geojson-utils-ts](../README.md) / [Exports](../modules.md) / FeatureCollection

# Interface: FeatureCollection<G, P\>

A collection of feature objects.
 https://tools.ietf.org/html/rfc7946#section-3.3

## Type parameters

| Name | Type |
| :------ | :------ |
| `G` | extends [`Geometry`](../modules.md#geometry) \| ``null`` = [`Geometry`](../modules.md#geometry) |
| `P` | [`GeoJsonProperties`](../modules.md#geojsonproperties) |

## Hierarchy

- [`GeoJsonObject`](GeoJsonObject.md)

  ↳ **`FeatureCollection`**

## Table of contents

### Properties

- [bbox](FeatureCollection.md#bbox)
- [features](FeatureCollection.md#features)
- [type](FeatureCollection.md#type)

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

### features

• **features**: [`Feature`](Feature.md)<`G`, `P`\>[]

#### Defined in

node_modules/@types/geojson/index.d.ts:174

___

### type

• **type**: ``"FeatureCollection"``

Specifies the type of GeoJSON object.

#### Overrides

[GeoJsonObject](GeoJsonObject.md).[type](GeoJsonObject.md#type)

#### Defined in

node_modules/@types/geojson/index.d.ts:173
