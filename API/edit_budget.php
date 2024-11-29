<?php

header("Access-Control-Allow-Origin: *"); // Allow requests from this origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db_con.php';
session_start();
if($_SERVER['REQUEST_METHOD']=='POST'){
    $input = json_decode(file_get_contents('php://input'), true);
    
    $id = $input['id'] ?? '';
    
   
    $allocated_amount = $input['allocated_amount'] ?? '';

   
   try {
    /*$stmt1=$pdo->prepare("select category_id from categories where category_name=:budget_cat and user_id=2 ");
    $stmt1->bindParam(':budget_cat',$budget_cat);
    $stmt1->execute();
    $result = $stmt1->fetch(PDO::FETCH_ASSOC);
    $category_id=$result['category_id'];*/
    $stmt=$pdo->prepare("update  budgets set allocated_amount=:allocated_amount where budget_id=:id");
 
    $stmt->bindParam(':allocated_amount',$allocated_amount);
    $stmt->bindParam(':id',$id);
    $stmt->execute();
    if($stmt){
       
        echo json_encode(['success' => true, 'message' => 'Budget Edited']);
    } else {
        echo json_encode(['success' => false, 'message' => 'problem in editing']);
    }
    $stmt=null;
    }
        catch (Exception $e) {
        // Catch any database-related errors
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid connexion']);
}
    $pdo=null;

?>