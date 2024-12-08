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
    

    $category_name = $input['category_name'] ?? '';
    $user_id= $input['user_id'] ?? '';
    $amount = $input['amount'] ?? '';
    $description = $input['description'] ?? '';
    $date = $input['date'] ?? '';

   
   try {
    $stmt1=$pdo->prepare("select category_id from categories where category_name=:category_name and user_id=:user_id ");
    $stmt1->bindParam(':user_id',$user_id);
    $stmt1->bindParam(':category_name',$category_name);
    $stmt1->execute();
    $result = $stmt1->fetch(PDO::FETCH_ASSOC);
    $category_id=$result['category_id'];


    $stmt=$pdo->prepare("insert into transactions(user_id,category_id,amount,transaction_date,description) values(:user_id,:category_id,:amount,:date,:description)");
    
    $stmt->bindParam(':category_id',$category_id);
    $stmt->bindParam(':amount',$amount);
    $stmt->bindParam(':description',$description);
    $stmt->bindParam(':date',$date);
    $stmt->bindParam(':user_id',$user_id);
    $stmt->execute();
    if($stmt){
       
        echo json_encode(['success' => true, 'message' => 'transaction added ']);
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