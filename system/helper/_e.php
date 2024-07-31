<?php

function translit($s) {
	$s = (string) $s; // преобразуем в строковое значение
	$s = trim($s); // убираем пробелы в начале и конце строки
	$s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
	$s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
	return $s; // возвращаем результат
}

function _e($str){
	//        Эта кастомная функция описывает логику регистрации языковых переменных
	$path= $_SERVER['DOCUMENT_ROOT'];

	$lang =$_SERVER['lang'];

	$is_admin = $_SERVER['is_admin'] ?? false;

	$prefix = $is_admin ? '/admin/' : '/catalog/';
	$path .= $prefix;  

	$dirs = scandir($path.'language/');

	if(isset($_SERVER['theme'])){
		$theme = $_SERVER['theme'];
	}else{
		$theme = 'default';
	}

	$route = $_SERVER['route'] ?? 'common/home';
	
	$path_controller = str_replace($theme.'/template/','',$route);
		$path_controller = str_replace('default/template/','',$path_controller);
	if(file_exists($path.'language/'.$lang.'/'.$path_controller.'.php')){
	require($path.'language/'.$lang.'/'.$path_controller.'.php');
	}   else{

			file_put_contents($path.'language/'.$lang.'/'.$path_controller.'.php','<?php'.PHP_EOL);
	}

	$variable_name = str_replace(' ','_',translit($str));
	if(isset($_[$variable_name])){
		return $_[$variable_name];
	}else{
		file_put_contents($path.'language/'.$lang.'/'.$path_controller.'.php','$_["'.$variable_name.'"]="'.$str.'";'.PHP_EOL,FILE_APPEND);
	return $str;
	}



}