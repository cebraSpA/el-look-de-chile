<?php
	
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$id = $request->id;
	$nombre = $request->nombre;
	$apellido = $request->apellido;
	$email = $request->email;
	$tipo = $request->tipo;
	
	$conexion = mysqli_connect("localhost","root","","kimen_app");
	$sql = mysqli_query($conexion, "
				SELECT
				    *
				FROM
				    kimen_users
				WHERE
				    USER_ID = $id
	");
	$numeroUsuarios = mysqli_affected_rows($conexion);
	if($numeroUsuarios == 0){
		$sql = mysqli_query($conexion, "
			INSERT INTO kimen_users
				(USER_ID,USER_NOMBRE,USER_APELLIDO,USER_EMAIL,USER_TIPO)
			VALUES
				('$id', '$nombre', '$apellido', '$email', '$tipo');
		");
		$sql = mysqli_query($conexion, "
			SELECT 
				*
				FROM
					kimen_users
				WHERE
					USER_ID = '$id';
		");
		$arr = array();
		while($resultado = mysqli_fetch_assoc($sql)){
			$arr = array_map('utf8_encode', $resultado);
		}
        $jsn = json_encode($arr);
        print_r($jsn);
    }else{
		$sql = mysqli_query($conexion, "
			SELECT 
				*
				FROM
					kimen_users
				WHERE
					USER_ID = '$id';
		");
		$arr = array();
		while($resultado = mysqli_fetch_assoc($sql)){
			$arr = array_map('utf8_encode', $resultado);
		}
        $jsn = json_encode($arr);
        print_r($jsn);
	}
?>