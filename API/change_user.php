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
    $name = $input['name'];
    $pass = $input['pass'];
    if($name){
        try {
            $stmt=$pdo->prepare("UPDATE users SET username = :name WHERE user_id = :user_id; ");
        
            $stmt->bindParam(':user_id',$user_id);
            $stmt->bindParam(':name',$name);
            $stmt->execute();
            
            $stmt=$pdo->prepare("select user_id,username from users where user_id=:user_id");
        
            $stmt->bindParam(':user_id',$user_id);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true,'data' => $user ]);
            }
            catch (Exception $e) {
                // Catch any database-related errors
                echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
            }
        }
    if($pass){
        try {
            $stmt=$pdo->prepare("UPDATE users SET password = :pass WHERE user_id = :user_id; ");
        
            $stmt->bindParam(':user_id',$user_id);
            $stmt->bindParam(':pass',$pass);
            $stmt->execute();
            
            $stmt=$pdo->prepare("select user_id,username from users where user_id=:user_id");
        
            $stmt->bindParam(':user_id',$user_id);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true,'data' => $user ]);
            }
            catch (Exception $e) {
                // Catch any database-related errors
                echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
            }
        }
    }
else {
    echo json_encode(['success' => false, 'message' => 'connecting error']);
}
    
    
        $pdo=null;
    
    ?>