<?php

# Open the cURL session
$curlSession = curl_init();
curl_setopt($curlSession, CURLOPT_URL, "http://news.thecommons.church/feed/json");
curl_setopt($curlSession, CURLOPT_HEADER, 1);
curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curlSession, CURLOPT_TIMEOUT, 30);
curl_setopt($curlSession, CURLOPT_SSL_VERIFYHOST, 1);
# Send the request and store the result in an array
$response = curl_exec($curlSession);
# Check that a connection was made
if (curl_error($curlSession)) {
    # If it wasn't...
    print curl_error($curlSession);
} else {
    #clean duplicate header that seems to appear on fastcgi with output buffer on some servers!!
    $response = str_replace("HTTP/1.1 100 Continue\r\n\r\n", "", $response);
    $ar = explode("\r\n\r\n", $response, 2);
    $header = $ar[0];
    $body = $ar[1];
    $data = $body;
}
# Output the JSONP callback with data
header('Content-type: application/json');
echo $data;

