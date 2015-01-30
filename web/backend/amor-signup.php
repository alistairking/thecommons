<?php

function do_mail() {
    if(!$_POST['amor-signup']) {
        return false;
    }

    $to = "Amor Signup <info@thecommonsforall.com>";//, "
        //."Haley McCulloch <haley@kiwimaple.com>";
    //$to = "Alistair King <alistair@kiwimaple.com>";

    $subject = "[thecommonsforall.com] Amor Signup";

    // compose headers
    $headers = "From: info@thecommonsforall.com\r\n";
    $headers .= "Reply-To: info@thecommonsforall.com\r\n";
    $headers .= "X-Mailer: PHP/".phpversion();

    // get the details
    $nameFirst = $_POST['amor-nameFirst'];
    $nameLast = $_POST['amor-nameLast'];
    $email = $_POST['amor-email'];
    $phone = $_POST['amor-phone'];

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