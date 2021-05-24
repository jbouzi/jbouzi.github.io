<!DOCTYPE HTML>
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="content-type" content="text/html" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>abcjs basic demo</title>
	<link href="css/abcjs-audio.css" media="all" rel="stylesheet" type="text/css" />
	<script src="js/abcjs-basic-min.js" type="text/javascript"></script>
	<style>
		.abcjs-inline-audio {
			max-width: 770px;
		}
	</style>
</head>
<body>
<div id="notation"></div>
<div id="audio"></div>

<script type="text/javascript">
	function onMidi() {
		if (ABCJS.synth.supportsAudio()) {
			var visualObj = ABCJS.renderAbc('notation', fileContent, {responsive: 'resize'})[0];
			var synthControl = new ABCJS.synth.SynthController();
			synthControl.load("#audio", null, {displayRestart: true, displayPlay: true, displayProgress: true});
			synthControl.setTune(visualObj, false);
		} else {
			document.querySelector("#audio").innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
		}
	}

    var fileContent = "";
    readTextFile("abc/gymnopedie1.abc")
    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    fileContent = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
    }
    onMidi();
    // ABCJS.renderAbc("notation", fileContent);
</script>

</body>
</html>