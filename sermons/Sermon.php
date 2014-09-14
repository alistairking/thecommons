<?php
/**
 * Created by PhpStorm.
 * User: alistair
 * Date: 9/14/14
 * Time: 3:37 PM
 */

namespace TheCommons\Sermons;


use JsonSerializable;

class Sermon implements JsonSerializable
{

    private $id;
    private $name;
    private $date;
    private $desc;
    private $audio;

    public
    function __construct($id, $path)
    {
        $this->id = $id;
        $this->path = $path;

        $this->parseSermonInfo($path);
    }

    public
    function getId()
    {
        return $this->id;
    }

    public
    function getName()
    {
        return $this->name;
    }

    public
    function getAudio()
    {
        return $this->audio;
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
        $this->name = 'Catchy Sermon Title';
        $this->audio = 'catchy-sermon-title.mp3';
        $this->desc = 'Long description';
    }

    public function jsonSerialize()
    {
        return [
            'type' => 'sermons-series',
            'id' => $this->getId(),
            'name' => $this->getName(),
            'audio' => $this->getAudio(),
            'desc' => $this->getDesc(),
        ];
    }

} 