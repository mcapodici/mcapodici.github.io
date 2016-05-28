---
layout: post
title: Geolocation Queries in MongoDB
date: 2013-12-05 02:04:00
tags: [mongodb]
---

The ability to scale out effectively, working without a fixed schema and storing data in aggregates are the main reasons developers consider using "NoSQL" databases. However I was attracted to MongoDB in a recent personal project by the fact that it does geospatial reasonably well. As I soon found out, it is not too difficult to geo in Mongo once you know the basics.

To make the most of MongoDB geospatial you will want to create geospatial indexes for efficient queries on your data. An example would be a nearest store query to get all stores within a distance of a certain latitude and longitude. For this you would want a 2dsphere geospatial index which is designed to work accurately with the surface of the planet.

The geospatial indexes and queries require that you store the information in [GeoJSON][1] format. I had not heard of this format before but it seems like a good idea of the MongoDB developers to follow an open standard like this.

Here is an example of a point in geojson format:

`"point": {"type": "Point", "coordinates": [102.0, 0.5]}`

The following commands from the mongo command prompt will get you started.

Firstly lets insert a point:

`> use exampledb  
switched to db exampledb  
> db.points.insert({"point": {"type": "Point", "coordinates": [102.0, 0.5]}})`

Now create a 2dsphere index

`> db.points.ensureIndex({"point": "2dsphere"})`

This should speed up your searches when the number of points gets large. Although I haven't tested yet the before/after performance. When I do I'll post something.

Now to query you need something like below. It looks complicated but really it is just saying that the geometry attribute is near a point. The point is represented as a $geometry containing a geojson formatted point.

`> db.points.find({"point":{"$near":{"$geometry":{"type":"Point", "coordinates":[102.0, 0.5]}, "$maxDistance":1000 }}})  
{ "_id" : ObjectId("52a04e0fbfd16de584da1a9d"), "geometry" : { "type" : "Point", "coordinates" : [ 102, 0.5 ] } }`

As you can see there is a result. I queried on the exact location of the point, but I can also move around. If I get too far away (more than 1000 metres in this case) the point won't be found:

`> db.points.find({"point":{"$near":{"$geometry":{"type":"Point", "coordinates":[102.0, 0.501]}, "$maxDistance":1000 }}})  
**{ "_id" : ObjectId("52a04e0fbfd16de584da1a9d"), "geometry" : { "type" : "Point", "coordinates" : [ 102, 0.5 ] } }**`

` > db.points.find({"point":{"$near":{"$geometry":{"type":"Point", "coordinates":[102.0, 0.51]}, "$maxDistance":1000 }}})  
[_**No Result]**_`

So that's it for a quick introduction. In a future post I will show a quick Ruby program to insert and query geolocation points.

Querying from the ruby driver is simple and similar to the direct queries except method names have the familiar underscore_format and instead of JSON you use the hash format. More on this later.

 

[1]: http://geojson.org/geojson-spec.html