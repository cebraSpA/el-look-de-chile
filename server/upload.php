<?php

if(!empty($_FILES)){

/*	$dest = imagecreatefromjpeg("http://localhost/selfie-america/resources/img/usuario.jpg");
	$src = imagecreatefrompng("http://localhost/selfie-america/resources/img/gary.png");

	imagealphablending($dest, false);
	imagesavealpha($dest, true);

	imagecopyresampled($dest, $src, 10, 10, 0, 0, 604, 792, 604, 792); 

	header('Content-Type: image/png');
	imagepng($src, 'uploads/nuevaImagen.png');

	imagedestroy($dest);
	imagedestroy($src);
*/

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
//	$uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath = 'uploads/'.$_FILES['file']['name'];

    move_uploaded_file( $tempPath, $uploadPath );

//	list($width, $height) = getimagesize('uploads/'.$_FILES['file']['name']);
//	echo "width: " . $width . "<br />";
//	echo "height: " .  $height;

    $answer = array( 	'photoName' => $_FILES[ 'file' ][ 'name' ]);
    $json = json_encode( $answer );

    echo $json;

}else{
    echo 'No files';
}

?>