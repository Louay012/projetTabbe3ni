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

    $category_id = $input['category_id'];
    $categorie = $input['categorie'] ?? '';
    $type = $input['type'] ?? '';
    $user_id=$input['user_id']?? '';

    try {
        $stmt=$pdo->prepare("select * from categories where category_name =:categorie and user_id=:user_id and category_id!=:category_id ");
        $stmt->bindParam(':categorie',$categorie);
        $stmt->bindParam(':user_id',$user_id);
        $stmt->bindParam(':category_id',$category_id);
        $stmt->execute();
        $cat = $stmt->fetch(PDO::FETCH_ASSOC);
        if($cat){

            echo json_encode(['success' => false, 'message' => 'Nom de la catégorie est déja utilisé']);
        } else {
           
            $stmt=$pdo->prepare("UPDATE categories SET category_name =:categorie WHERE category_id=:category_id");
            $stmt->bindParam(':categorie',$categorie);
          
            $stmt->bindParam(':category_id',$category_id);
        
            $stmt->execute();
            if($stmt){
                echo json_encode(['success' => true, 'message' => 'catégorie Modifiée']);
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