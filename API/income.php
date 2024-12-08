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
    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = $input['user_id']  ;
    $choice = $input['choice'] ;
    
    $order= $input['order'] ?? "id";
    

   try {
    if( $choice){
       
        $stmt=$pdo->prepare("SELECT 
    t.transaction_id id, 
    c.category_name category,  
    t.amount amount, 
    t.transaction_date date, 
    t.description description 
FROM 
    transactions t
JOIN 
    categories c 
ON 
    t.category_id = c.category_id AND t.user_id = c.user_id 
WHERE
        
    DATEDIFF(CURDATE(), t.transaction_date) <= :choice AND
    t.user_id = :user_id and type='income'
 ORDER BY $order ");
    $stmt->bindParam(':choice',$choice);
    }
    else{
       $stmt=$pdo->prepare(" SELECT 
    t.transaction_id id, 
    c.category_name category,  
    t.amount amount, 
    t.transaction_date date, 
    t.description description 
FROM 
    transactions t
JOIN 
    categories c 
ON 
    t.category_id = c.category_id AND t.user_id = c.user_id
WHERE 
    t.user_id = :user_id and type='income'
 ORDER BY $order  ");
    }

    $stmt->bindParam(':user_id',$user_id);
   
    $stmt->execute();
    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $transactions ]);
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