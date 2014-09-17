<?php
/**
 * Created by PhpStorm.
 * User: alistair
 * Date: 9/14/14
 * Time: 3:22 PM
 */

namespace TheCommons\Sermons;

require_once('SermonSeries.php');
require_once('../libs/spyc/Spyc.php');

use JsonSerializable;
use Spyc;

class Sermons implements JsonSerializable
{
    private $mediaDir;
    private $webRoot;
    private $podcastTitle;
    private $podcastCover;

    private $series;

    public
    function __construct() {
        $this->parseConfig();
        $this->populateSeries();
    }

    public
    function getMediaDir() {
        return $this->mediaDir;
    }

    public
    function getWebPrefix()
    {
        return $this->webRoot;
    }

    public
    function getPodcastTitle()
    {
        return $this->podcastTitle;
    }

    public
    function getPodcastCover()
    {
        return $this->getWebPrefix() . '/' . $this->podcastCover;
    }

    public
    function parseConfig()
    {
        // find and parse the series.yml file
        // if there is no series.yml file...
        // throw an exception
        $yml = Spyc::YAMLLoad("config.yml");

        if (!$yml || !$yml['media-path']) {
            throw new \InvalidArgumentException("Missing config.yml");
        }

        // TODO: better error handling on missing elements

        $this->mediaDir = $yml['media-path'];
        $this->webRoot = $yml['public-media-path'];
        $this->podcastTitle = $yml['podcast-title'];
        $this->podcastCover = $yml['podcast-cover'];
    }

    public
    function populateSeries() {
        $this->series = [];

        // for each directory <series-name> in MEDIA_PATH
        foreach(glob($this->getMediaDir().'/*', GLOB_ONLYDIR) as $seriesDir) {
            if($seriesDir == '.' || $seriesDir == '..') {
                continue;
            }
            $id = basename($seriesDir);

            $this->series[] = new SermonSeries($id, $seriesDir,
                $this->getWebPrefix());
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
        return [
            'podcast-title' => $this->getPodcastTitle(),
            'podcast-cover' => $this->getPodcastCover(),
            'series' => $this->getSeries(),
        ];
    }
}