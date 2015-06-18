<?php 
/*
	$dest = imagecreatefrompng('vinyl.png');
	$src = imagecreatefromjpeg('cover2.jpg');

	imagealphablending($dest, false);
	imagesavealpha($dest, true);

	imagecopymerge($dest, $src, 10, 9, 0, 0, 181, 180, 100); //have to play with these numbers for it to work for you, etc.

	header('Content-Type: image/png');
	imagepng($dest);

	imagedestroy($dest);
	imagedestroy($src);
*/
	//date_default_timezone_set('Chile/Continental');
    //$nom_bann = $_REQUEST["nom_bann"];
    //$url_bann = $_REQUEST["url_bann"];
    //$fecha = date("d-m-Y H:i:s");

    //$actualizarDatos = mysqli_query($conexion, "UPDATE castro_banner SET ALI_BANN='$nom_bann', LIN_BANN='$url_bann', FEC_BANN='$fecha' WHERE COD_BANN='$idBanner'");

    $formatos = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["pro_imag"]["name"]);
    $extension = end($temp);
    
    if(empty($_FILES["pro_imag"]["tmp_name"])){
        header("Location: ./banner.php");
    }else{
        if ((($_FILES["pro_imag"]["type"] == "image/gif")
        || ($_FILES["pro_imag"]["type"] == "image/jpeg")
        || ($_FILES["pro_imag"]["type"] == "image/jpg")
        || ($_FILES["pro_imag"]["type"] == "image/pjpeg")
        || ($_FILES["pro_imag"]["type"] == "image/x-png")
        || ($_FILES["pro_imag"]["type"] == "image/png"))
        && ($_FILES["pro_imag"]["size"] < 2097152)
        && in_array($extension, $formatos)) {
            if($_FILES["pro_imag"]["error"] > 0) {
                echo "Retorno: " .$_FILES["pro_imag"]["error"]. "<br>";
            }else{
                $nomBann = $_FILES["pro_imag"]["name"];
                $urlBann = "img/uploads/".$_FILES["pro_imag"]["name"];
                $timBann = $_FILES["pro_imag"]["size"];

                $actualiza = mysqli_query($conexion, "UPDATE castro_banner SET NOM_BANN='$nomBann', URL_BANN='$urlBann', TAM_BANN='$timBann' WHERE COD_BANN='$idBanner'");
                if(file_exists("../img/uploads/" . $_FILES["pro_imag"]["name"])){
                    echo "";
                    //header("Location: ./banner.php");
                }else{
                    move_uploaded_file($_FILES["pro_imag"]["tmp_name"],"../img/uploads/" . $_FILES["pro_imag"]["name"]);
                    echo "";
                    //header('Location: ./banner.php');
                }
            }
        }else{
            echo "";
        }
    }

?>