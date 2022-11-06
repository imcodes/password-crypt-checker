<?php
//encrypt or hash the plain text


$contentType = (isset($_SERVER['CONTENT_TYPE'])) ? $_SERVER['CONTENT_TYPE'] : "";
if($contentType != 'application/json') echo json_encode(['isSuccess' => false, 'error'=>"Error: Json is expected"]);

$data = trim(file_get_contents('PHP://input'));
$data = json_decode($data);

// echo json_encode([$data,'world','post'=>$_POST,
// 'get'=>$_GET,'request'=>$_REQUEST, 'server' => $_SERVER]);

if(isset($data->hash_string)){
    $text = $data->plainText;
    $method = $data->hashMethod;

    $response = hash_text($text,$method);
 echo json_encode($response);
}


//Compare the hash string
if(isset($data->compare_string)){
    $hash = $data->hashInput;
    $text = $data->plainText;
    $method = $data->hashMethod;

    $result = compare_hash($hash,$text,$method);
    
    echo json_encode($result);
}



function hash_text($text, $method = 'md5'){
    if(empty($text)) return (['isSuccess'=> false, 'error'=>'Please enter a text']);
    
    switch($method){
        case 'md5':
            return ['isSuccess'=> true, 'hash'=>md5($text)];
            break;
        case 'bcrypt':
            return ['isSuccess'=> true, 'hash'=>password_hash($text,PASSWORD_BCRYPT)];
            break;
        default:
            return (['isSuccess'=>false, 'hash'=>'Invalid Hash Method']);
    }
}


function compare_hash($hash, $text, $method = 'md5'){
    $error = array();
    if(empty($hash)) $error[] = 'Please enter a hash string';
    if(empty($text)) $error[] = 'Please enter a Plain text string';

    if(!empty($error)) return ['isSuccess'=>false, 'error'=>$error];

    switch($method){
        case 'md5':
            return ['isSuccess'=>true, 'matched'=>($hash === md5($text))];
            break;
        case 'bcrypt':
            return ['isSuccess'=>true, 'matched'=>password_verify($text,$hash)];
            break;
        default:
            return ['isSuccess'=>false, 'matched'=>'Invalid Method'];
    }
}