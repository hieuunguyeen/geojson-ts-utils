[geojson-utils-ts](../README.md) / [Exports](../modules.md) / Feature

# Interface: Feature<G, P\>

A feature object which contains a geometry and associated properties.
https://tools.ietf.org/html/rfc7946#section-3.2

## Type parameters

| Name | Type |
| :------ | :------ |
| `G` | extends [`Geometry`](../modules.md#geometry) \| ``null`` = [`Geometry`](../modules.md#geometry) |
| `P` | [`GeoJsonProperties`](../modules.md#geojsonproperties) |

## Hierarchy

- [`GeoJsonObject`](GeoJsonObject.md)

  ↳ **`Feature`**

## Table of contents

### Properties

- [bbox](Feature.md#bbox)
- [geometry](Feature.md#geometry)
- [id](Feature.md#id)
- [properties](Feature.md#properties)
- [type](Feature.md#type)

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

### geometry

• **geometry**: `G`

The feature's geometry

#### Defined in

node_modules/@types/geojson/index.d.ts:156

___

### id

• `Optional` **id**: `string` \| `number`

A value that uniquely identifies this feature in a
https://tools.ietf.org/html/rfc7946#section-3.2.

#### Defined in

node_modules/@types/geojson/index.d.ts:161

___

### properties

• **properties**: `P`

Properties associated with this feature.

#### Defined in

node_modules/@types/geojson/index.d.ts:165

___

### type

• **type**: ``"Feature"``

Specifies the type of GeoJSON object.

#### Overrides

[GeoJsonObject](GeoJsonObject.md).[type](GeoJsonObject.md#type)

#### Defined in

node_modules/@types/geojson/index.d.ts:152
