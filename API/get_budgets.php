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
    $user_id = $input['user_id'];
   
    try {
    $stmt=$pdo->prepare("SELECT 
    b.budget_id, 
    c.category_name, 
    b.allocated_amount, 
    b.date_deb, 
    SUM(COALESCE(t.amount, 0)) AS amount
    
FROM 
    budgets b
JOIN 
    categories c 
    ON b.category_id = c.category_id 
    AND b.user_id = c.user_id
LEFT JOIN 
    transactions t 
    ON t.category_id = c.category_id 
    AND t.transaction_date >= b.date_deb
WHERE 
    b.user_id = :user_id 
    AND c.type = 'expense'
GROUP BY 
    b.budget_id, c.category_name, b.allocated_amount, b.date_deb;
"
);
    $stmt->bindParam(':user_id',$user_id);
    $stmt->execute();
    $budgets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $budgets ]);
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