<?php
/**
 * Created by PhpStorm.
 * User: alistair
 * Date: 9/14/14
 * Time: 3:22 PM
 */

namespace TheCommons\Sermons;

use JsonSerializable;

require_once('SermonSeries.php');

class Sermons implements JsonSerializable
{
    // path to a directory containing all the sermon series
    const MEDIA_PATH = './media';

    private $series;

    public
    function __construct() {
        $this->populateSeries();
    }

    public
    function populateSeries() {
        $this->series = [];

        // for each directory <series-name> in MEDIA_PATH
        foreach(glob(static::MEDIA_PATH.'/*', GLOB_ONLYDIR) as $seriesDir) {
            if($seriesDir == '.' || $seriesDir == '..') {
                continue;
            }
            $id = basename($seriesDir);

            $this->series[] = new SermonSeries($id, $seriesDir);
        }
    }

    public
    function getSeries() {
        return $this->series;
    }

    public
    function getXml() {
        // need to do fancier things and iterate over series etc
        return 'boo';
    }

    public function jsonSerialize()
    {
        return $this->getSeries();
    }
}