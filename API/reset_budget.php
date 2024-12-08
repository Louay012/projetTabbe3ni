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
   


   
   try {
    
    $stmt=$pdo->prepare("update budgets set date_deb=CURDATE() where budget_id=:id");
    $stmt->bindParam(':id',$id);

    $stmt->execute();
    if($stmt){
       
        echo json_encode(['success' => true, 'message' => 'budget reset ']);
    } else {
        echo json_encode(['success' => false, 'message' => 'problem in reseting budget']);
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