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
    
    $order= $input['order'];

   try {
    
    $stmt=$pdo->prepare(" SELECT 
    t.transaction_id id, 
    c.category_name category,  
    Sum(t.amount) samount, 
    t.transaction_date date
        FROM 
            transactions t
        JOIN 
            categories c 
        ON 
            t.category_id = c.category_id AND t.user_id = c.user_id and c.type='expense'
        WHERE 
            t.user_id = :user_id 
        GROUP BY date
        order by date ;");
    $stmt->bindParam(':user_id',$user_id);
    $stmt->execute();
    $last_expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    $stmt1=$pdo->prepare(" SELECT 
    t.transaction_id id, 
    c.category_name category,  
    Sum(t.amount) samount, 
    t.transaction_date date
        FROM 
            transactions t
        JOIN 
            categories c 
        ON 
            t.category_id = c.category_id AND t.user_id = c.user_id and c.type='income'
        WHERE 
            t.user_id = :user_id 
        GROUP BY date 
        order by date ");
      $stmt1->bindParam(':user_id',$user_id);
      $stmt1->execute();
      $income = $stmt1->fetchAll(PDO::FETCH_ASSOC);
      $stmt1->closeCursor();
      $stmt2=$pdo->prepare("SELECT
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

    $stmt2->bindParam(':user_id',$user_id);
  
    $stmt2->execute();
    $expense_cat = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    $stmt3=$pdo->prepare("SELECT

                SUM(COALESCE(amount,0)) total_amount
                
            FROM 
                categories c 
            LEFT JOIN 
                transactions t
            ON 
                t.category_id = c.category_id 
            WHERE
                c.user_id= :user_id and type='expense'
               ");

    $stmt3->bindParam(':user_id',$user_id);
  
    $stmt3->execute();
    $total_expense = $stmt3->fetchAll(PDO::FETCH_ASSOC);
    $stmt4=$pdo->prepare("SELECT

                SUM(COALESCE(amount,0)) total_amount
                
            FROM 
                categories c 
            LEFT JOIN 
                transactions t
            ON 
                t.category_id = c.category_id 
            WHERE
                c.user_id= :user_id and type='income'
               ");

    $stmt4->bindParam(':user_id',$user_id);
  
    $stmt4->execute();
    $total_income = $stmt4->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'expenses' => $last_expenses, 'incomes' => $income,'expense_cat' => $expense_cat ,'total_expense' =>$total_expense , 'total_income' => $total_income]);
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