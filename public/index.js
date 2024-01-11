`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="img/Bash_Logo_white_icon_only.svg.ico">
    <link rel="stylesheet" href="css/index.css">
    <!--<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>-->
    <script src="js/jqeury.min.js"></script>
    <script src="js/index.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        window.onbeforeunload = function() {
            CloseBashFunktion();
        }
    </script>
    <title>String Maniküre</title>
</head>
<body>
        <p>` + variable + `</p>
</body>
`