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
    

    $username = $input['username'] ?? '';
    $email=$input['email'] ?? '';
    $password = $input['password'] ?? '';

   
   try {
        $stmt=$pdo->prepare("select * from users where email=:email");
        $stmt->bindParam(':email',$email);
    
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user){

            echo json_encode(['success' => false, 'message' => 'Email est déja utilisé ']);
        } else {
            $stmt=$pdo->prepare("insert into users(username,email,password) values(:username,:email,:pass) ");
            $stmt->bindParam(':username',$username);
            $stmt->bindParam(':email',$email);
            $stmt->bindParam(':pass',$password);
        
            $stmt->execute();
            if($stmt){
                echo json_encode(['success' => true, 'message' => 'signup successful']);
            }
            else{
                echo json_encode(['success' => false, 'message' => 'erreur signup']);
            }
            
        }
        $stmt=null;
        }
            catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
    $pdo=null;

?>