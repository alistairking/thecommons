<?php
/**
 * Created by PhpStorm.
 * User: alistair
 * Date: 9/14/14
 * Time: 3:37 PM
 */

namespace TheCommons\Sermons;

require_once('Sermon.php');

use JsonSerializable;

class SermonSeries implements JsonSerializable {

    private $id;
    private $name;
    private $image;
    private $video;

    private $sermons;

    public
    function __construct($id, $path) {
        $this->id = $id;
        $this->path = $path;

        $this->parseSeriesInfo($path);
        $this->populateSermons();
    }

    public
    function getId() {
        return $this->id;
    }

    public
    function getName() {
        return $this->name;
    }

    public
    function getImage() {
        return $this->image;
    }

    public
    function getVideo()
    {
        return $this->video;
    }

    public
    function getSermons() {
        return $this->sermons;
    }

    public
    function parseSeriesInfo($path) {
        // find and parse the series.yml file
        $this->name = 'Sample Series';
        $this->image = 'Lion-LambWEB.jpg';
        $this->video = 'http://vimeo.com/73640362';
    }

    public
    function populateSermons() {
        $this->sermons = [];

        foreach (glob('*', GLOB_ONLYDIR) as $sermonDir) {
            if ($sermonDir == '.' || $sermonDir == '..') {
                continue;
            }
            $id = basename($sermonDir);

            $this->sermons[] = new Sermon($id, $sermonDir);
        }

        // create a series

        // for each directory in <series-name>/

        // find and parse the sermon.yml file

        // create a sermon
    }

    public function jsonSerialize()
    {
        return [
            'type' => 'sermons-series',
            'id' => $this->getId(),
            'name' => $this->getName(),
            'image' => $this->getImage(),
            'video' => $this->getVideo(),
            'sermons' => $this->getSermons(),
        ];
    }

} 