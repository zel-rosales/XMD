<!DOCTYPE html>
<html>
    <head>
        <title>Test PHP</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>A Test PHP Page</h1>
        <?php
            $data = array("Wooyoung", "Yoongi", "Soobin");
            foreach($data as $name){
                echo "<p>$name</p>";
            }
        ?>
    </body>

</html>