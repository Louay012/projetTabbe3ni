<?php

header("Access-Control-Allow-Origin: *"); // Allow requests from this origin
header("Access-Control-Allow-Methods: POST"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db_con.php';
session_start();
if($_SERVER['REQUEST_METHOD']=='POST'){
    $input = json_decode(file_get_contents('php://input'), true);
    

    $categorie = $input['categorie'] ?? '';
    $type = $input['type'] ?? '';
    $user_id=$input['user_id']?? '';
    try {
        $stmt=$pdo->prepare("select * from categories where category_name =:categorie and user_id=:user_id");
        $stmt->bindParam(':categorie',$categorie);
        $stmt->bindParam(':user_id',$user_id);
        
        $stmt->execute();
        $cat = $stmt->fetch(PDO::FETCH_ASSOC);
        if($cat){

            echo json_encode(['success' => false, 'message' => 'Nom de la catégorie est déja utilisé']);
        } else {
            $stmt=$pdo->prepare("insert into categories(user_id,category_name,type) values(:user_id,:categorie,:type) ");
            $stmt->bindParam(':categorie',$categorie);
            $stmt->bindParam(':type',$type);
            $stmt->bindParam(':user_id',$user_id);
        
            $stmt->execute();
            if($stmt){
                echo json_encode(['success' => true, 'message' => 'category added']);
            }
            else{
                echo json_encode(['success' => false, 'message' => 'erreur ']);
            }
            
        }
        $stmt=null;
        }
            catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
    $pdo=null;

?>