![](http://maple.jonathanlurie.fr/icons/maple_logo)

# Overview
Maple is a URL-based sharing plateform, meaning it's made for sharing map that contain informations with a simple URL.

# features

All the following features are embedable with URL customization.

- copy-paste install on your server
- GPX track display with markers for waypoints and total distance calculation [demo](http://maple.jonathanlurie.fr/display?gpx=PortDeBales.gpx)
- GPX upload [demo](http://maple.jonathanlurie.fr/manage)
- Adding markers (pin) with description and/or image  [demo](http://maple.jonathanlurie.fr/display?marker1=42.86935933652262|0.5260133743286133|Hello&skin=Mapbox__Terrain)
- Photo localisation with GPS EXIF (photo ust be on the same server) [demo](http://maple.jonathanlurie.fr/display?&image=http://maple.jonathanlurie.fr/photos/wemontreal-10.jpg&skin=Mapbox__Terrain)
- Share a map with a specific position and zoom, without a marker. Also usefull to not center a gpx or marker, since *position* is the last to decide where to look at. [simple demo](http://maple.jonathanlurie.fr/display?&position=40.70562793820592|-73.99626731872559|18) or [demo with marker](http://bit.ly/1K5CIy7)
- Self localisation (if enabled by your device) [demo](http://maple.jonathanlurie.fr/display)
- Several tile servers, with diferent designs [demo](http://maple.jonathanlurie.fr/display?marker1=40.70562793820592|-73.99626731872559|That%27s__Brooklin__Bridge&skin=Mapbox__Winter)
- Iframe code generator to embed a map in a webpage/blogpost
- URL generating for easy sharing
- Posibility to disable the controls (except zooming) when the map is shared or embeded [demo](http://maple.jonathanlurie.fr/display?&marker1=40.70562793820592|-73.99626731872559|That's__Brooklin__Bridge&skin=Mapbox__Terrain&controls=0)
- Minimap

**Note** the *display* page, when not used with other arguments (gpx, markers, position, image) will simply try to localize you.

Visitor demo : http://maple.jonathanlurie.fr/display  
Admin demo : http://maple.jonathanlurie.fr/manage
