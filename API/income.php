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
if($_SERVER['REQUEST_METHOD']=='GET'){
    $user_id = $_GET['user_id'] ;
   try {
    $stmt=$pdo->prepare("select c.category_name, t.amount, t.transaction_date, t.description
    from categories c, transactions t 
    where c.user_id=:user_id and c.type='income' and t.user_id=:user_id and t.category_id = c.category_id
    order by t.transaction_date desc");
    $stmt->bindParam(':user_id',$user_id);
    $stmt->execute();
    $income = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $income ]);
    }
    catch (Exception $e) {
        // Catch any database-related errors
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'connecting error']);
}
    $pdo=null;

?>