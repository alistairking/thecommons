<?php

function do_mail() {
    if(!$_POST['tc-signup']) {
        return false;
    }

    $event = $_POST['event'];
    if (!$event) {
        return false;
    }

    $to = "The Commons Signup <info@thecommonsforall.com>";

    $subject = "[thecommons.church] Event Signup ($event)";

    // compose headers
    $headers = "From: info@thecommonsforall.com\r\n";
    $headers .= "Reply-To: info@thecommonsforall.com\r\n";
    $headers .= "X-Mailer: PHP/".phpversion();

    // get the details
    $nameFirst = $_POST['nameFirst'];
    $nameLast = $_POST['nameLast'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // need all fields
    if(!$nameFirst || !$nameLast || !$email || !$phone) {
        return false;
    }

    $message = "Event: $event\r\n"
        ."First Name: $nameFirst \r\n"
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