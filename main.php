
<html lang="en">
<head>
  
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Face Detection Test</title>
  <script defer src="face-api.min.js"></script>
  <script defer src="script.js"></script>
  <link rel="stylesheet" href="styles.css">
  
<!-- 
  <h1>XJERA</h1>
  <h2>WELCOME</h2> -->


</head>


<body>
  <div id="custom-message">WELCOME</div>

<div id="container" align="center">
  <video id="video" width="720" height="540" autoplay muted></video>
</div>

</body>

<?php
// $servername = "127.0.0.1";
// $username = "root";
// $password = "";
// $database = "Major Proj";

// // Create connection
// $conn = mysqli_connect($servername, $username, $password, $database);

// // Check connection
// if (!$conn) {
//   die("Connection failed: " . mysqli_connect_error());
// }
// echo "Connected successfully";

$conn = new mysqli('127.0.0.1:3306', 'root', '');

// if ($link === false){
//   die("ERROR: Could not connect.".mysqli_connect_error());
// }
// $sql = "CREATE TABLE persons(
//   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//   first_name VARCHAR(30) NOT NULL,
//   date INT(30) NOT NULL
// )";
// if(mysqli_query($link, $sql)){
//   echo "Table created successfully.";
// } else{
//   echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
// }

?>

</html>