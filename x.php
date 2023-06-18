<?php
$url = 'https://vvipenjoyers.com/';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_PROXY, 'http://2c489a50a93d4bc1ce5b58608de31a227e24f8d1:antibot=true&wait_for=form-control@proxy.zenrows.com:8001');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$response = curl_exec($ch);
echo $response . PHP_EOL;
curl_close($ch);
