<?php
$song = $_REQUEST['song'];
$tempo = $_REQUEST['tempo'];
$setting = ""; // JSON string in end of file?
$file = file_get_contents("abc/".$song.".abc");





/* JSON setting example
{
    "song": "Title",
    "group": "Group",
    "voices": [
        {
            "voiceId": 1,
            "voiceBeat": "120 100 80 40",
            "voiceShow": true
        },
        {
            "voiceId": 2,
            "voiceBeat": "120 100 80 40",
            "voiceShow": true
        },
    ]
}
*/
