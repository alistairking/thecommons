#!/bin/sh
IMG=$1
echo $IMG;
convert -strip -interlace Plane -sampling-factor 4:2:0 -quality 85% \
	$IMG $IMG;
