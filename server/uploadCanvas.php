<?php
	if (isset($GLOBALS["HTTP_RAW_POST_DATA"])){
		// Obtener datos
		$imageData=$GLOBALS['HTTP_RAW_POST_DATA'];

		// Remover head (data:,)
		$filteredData=substr($imageData, strpos($imageData, ",")+1);

		// Decodificar base64
		$unencodedData=base64_decode($filteredData);

		// Crear id unico con md5
		$nm = md5(uniqid());

		// Crear file
		$fp = fopen( 'uploads/'.$nm.'.png', 'wb' );
		fwrite( $fp, $unencodedData);
		fclose( $fp );

		// Generar la respuesta en Json
		$respuesta = array( 'photoUrl' => $nm.'.png');
	    $json = json_encode( $respuesta );

	    echo $json;
	}
?>