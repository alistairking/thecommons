<?php

function do_mail() {
    if(!$_POST['if-signup']) {
        return false;
    }

    $to = "IfGathering Signup <info@thecommonsforall.com>, "
        ."Aubrey Westlund <aubreywestlund@gmail.com>";

    $subject = "[thecommonsforall.com] If:Gathering Signup";

    // compose headers
    $headers = "From: info@thecommonsforall.com\r\n";
    $headers .= "Reply-To: info@thecommonsforall.com\r\n";
    $headers .= "X-Mailer: PHP/".phpversion();

    // get the details
    $nameFirst = $_POST['if-nameFirst'];
    $nameLast = $_POST['if-nameLast'];
    $email = $_POST['if-email'];
    $phone = $_POST['if-phone'];

    // need all fields
    if(!$nameFirst || !$nameLast || !$email || !$phone) {
        return false;
    }

    $message = "First Name: $nameFirst \r\n"
        ."Last Name: $nameLast \r\n"
        ."Email Address: $email \r\n"
        ."Phone Number: $phone \r\n";

    // refuse to allow these things in the message body
    $find = "/(content-type|bcc:|cc:)/i";
    if (preg_match($find, $message)) {
        return false;
    }

    $message = wordwrap($message, 70);

    // send email
    return mail($to, $subject, $message, $headers);
}

header('Content-type: application/json');
echo json_encode(array('success' => do_mail()));