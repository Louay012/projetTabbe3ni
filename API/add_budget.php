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
    
   
    $budget_cat = $input['budget_cat'] ?? '';
    $user_id= $input['user_id'] ?? '';
    $allocated_amount = $input['allocated_amount'] ?? '';

   
   try {
    $stmt1=$pdo->prepare("select category_id from categories where category_name=:budget_cat and user_id=:user_id ");
    $stmt1->bindParam(':budget_cat',$budget_cat);
    $stmt1->bindParam(':user_id',$user_id);
    $stmt1->execute();
    $result = $stmt1->fetch(PDO::FETCH_ASSOC);
    $category_id=$result['category_id'];
    $stmt=$pdo->prepare("insert into budgets(user_id,category_id,allocated_amount,date_deb) values(:user_id,:category_id,:allocated_amount,CURRENT_DATE)");
    $stmt->bindParam(':category_id',$category_id);
    $stmt->bindParam(':allocated_amount',$allocated_amount);
    $stmt->bindParam(':user_id',$user_id);
    $stmt->execute();
    if($stmt){
       
        echo json_encode(['success' => true, 'message' => 'Budget added']);
    } else {
        echo json_encode(['success' => false, 'message' => 'problem in adding']);
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