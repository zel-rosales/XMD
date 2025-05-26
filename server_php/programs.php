<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
$db = new PDO('sqlite:drexel.db');

$programs = $db->query("select * from programs");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>All Programs at CCI</title>
    </head>
    <body>
        <h1>Programs at CCI</h1>
        <table>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Desc</td>
            </tr>
        </table>
        <?php
            foreach($programs as $program){
                echo "<p>";
                echo "<td>" . $program['program_id'] . "</td>";
                echo "<td>" . $program['program_name'] . "</td>";
                echo "<td>" . $program['program_desc'] . "</td>";
                echo "</p>";
            }
        ?>
    </body>
</html>