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
   

   try {
    $stmt=$pdo->prepare("SELECT
    c.category_id id,
	category_name category,
    SUM(COALESCE(amount,0)) total_amount
    
FROM 
    categories c 
LEFT JOIN 
    transactions t
ON 
    t.category_id = c.category_id 
WHERE
	c.user_id= :user_id and c.type='income'
    GROUP BY category
    order by id ");

    $stmt->bindParam(':user_id',$user_id);
  
    $stmt->execute();
    $income = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
   
   $stmt1=$pdo->prepare("SELECT
    c.category_id id,
	category_name category,
    SUM(COALESCE(amount,0)) total_amount
    
FROM 
    categories c 
LEFT JOIN 
    transactions t
ON 
    t.category_id = c.category_id 
WHERE
	c.user_id= :user_id and type='expense'
    GROUP BY category
    order by id ");

    $stmt1->bindParam(':user_id',$user_id);
  
    $stmt1->execute();
    $expense = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    $stmt=null;
    $stmt1=null;

    echo json_encode(['success' => true, 'data1'=>$income ,'data2' => $expense ]);
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