<?php
/**
 * Created by PhpStorm.
 * User: alistair
 * Date: 9/14/14
 * Time: 3:37 PM
 */

namespace TheCommons\Sermons;


use JsonSerializable;
use Spyc;

class Sermon implements JsonSerializable
{

    private $id;
    private $path;
    private $webPath;
    private $title;
    private $date;
    private $desc;
    private $audio;

    public
    function __construct($id, $path, $prefix)
    {
        $this->id = $id;
        $this->path = $path;
        $this->webPath = $prefix . '/' . $id;

        $this->parseSermonInfo($path);
    }

    public
    function getId()
    {
        return $this->id;
    }

    public
    function getPath()
    {
        return $this->path;
    }

    public
    function getWebPath()
    {
        return $this->webPath;
    }

    public
    function getTitle()
    {
        return $this->title;
    }

    public
    function getDate()
    {
        return $this->date;
    }

    public
    function getAudio()
    {
        return $this->getWebPath() . '/' . $this->audio;
    }

    public
    function getDesc()
    {
        return $this->desc;
    }

    public
    function parseSermonInfo($path)
    {
        // find and parse the series.yml file
        // if there is no series.yml file...
        // throw an exception
        $sermonYml = Spyc::YAMLLoad($path . "/sermon.yml");

        if (!$sermonYml || !$sermonYml['sermon-title']) {
            throw new \InvalidArgumentException("Missing sermon.yml for " .
                $path);
        }

        $this->title = $sermonYml['sermon-title'];
        $this->desc = $sermonYml['sermon-desc'];
        $this->date = $sermonYml['sermon-date'];
        $this->audio = $sermonYml['sermon-audio'];
    }

    public function jsonSerialize()
    {
        return [
            'type' => 'sermon',
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'date' => $this->getDate(),
            'audio' => $this->getAudio(),
            'desc' => $this->getDesc(),
        ];
    }

} 