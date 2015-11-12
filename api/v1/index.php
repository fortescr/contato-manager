<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->get('/produtos', function() { 
    global $db;
    $rows = $db->select("produto","id,nome,valor,qtd",array());
    echoResponse(200, $rows);
});

//Contatos
$app->get('/contatos', function() { 
    global $db;
    $rows = $db->select("contato","id,nome,fone",array());
    echoResponse(200, $rows);
});

$app->post('/contatos', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('nome');
    global $db;
    $rows = $db->insert("contato", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Contato adicionado com sucesso.";
    echoResponse(200, $rows);
});

$app->put('/contatos/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("contato", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Contato atualizado com sucesso.";
    echoResponse(200, $rows);
});

$app->delete('/contatos/:id', function($id) { 
    global $db;
    $rows = $db->delete("contato", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Contato removido com sucesso.";
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>