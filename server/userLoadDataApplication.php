<?php
	
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$video_id = $request->video_id;
//	$nombre = $request->nombre;
//	$apellido = $request->apellido;

	$conexion = mysqli_connect("localhost","root","","kimen_app");

	$sql = mysqli_query($conexion, "
				SELECT
				    *
				FROM
				    kimen_videos
				WHERE
				    video_id = $video_id
	");

//	$numeroUsuarios = mysqli_affected_rows($conexion);
	
	$arr = array();
	
	while($resultado = mysqli_fetch_assoc($sql)){
		$arr = array_map('utf8_encode', $resultado);
	}

	$jsn = json_encode($arr);
	print_r($jsn);

?>