#!/bin/sh
IMG=$1
echo $IMG;
pngcrush -reduce -brute $IMG $IMG.new;
mv $IMG.new $IMG;
