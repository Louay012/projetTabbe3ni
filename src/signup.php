<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="signup.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
</head>
<body>
    <div id="content">
        
        <form>
            <a href="home.html"><img src="image/logo3.png"></a><br>
            <div id="input">
            <label for="username">Username : </label>
            <input type="text" placeholder="Enter your username " name="username"><br>
            <label for="username">email : </label>
            <input type="text" placeholder="Enter your email " name="username"><br>
            <label for="pass">Password : </label>
            <input type="text" placeholder="Enter your password " name="pass">
            <input type="submit" value="Sign Up"><br>
            <p>you already have an account? <a href="login.html" class="link-secondary">Login</a></p>
            </div>
        </form>
        
        <img id="contimg" src="image/Team goals-bro.png">
    </div>
</body>
</html>