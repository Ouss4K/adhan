<?php
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

function fail($code, $message) {
  http_response_code($code);
  echo json_encode(array("error" => $message));
  exit;
}

function http_get($url) {
  if (function_exists("curl_init")) {
    $ch = curl_init($url);
    curl_setopt_array($ch, array(
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_TIMEOUT => 12,
      CURLOPT_USERAGENT => "AdhanApp/1.0 (https://it-support.ovh/adhan/)"
    ));
    $body = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($body === false || $status >= 400) return null;
    return $body;
  }
  $ctx = stream_context_create(array(
    "http" => array(
      "timeout" => 12,
      "header" => "User-Agent: AdhanApp/1.0\r\n"
    )
  ));
  $body = @file_get_contents($url, false, $ctx);
  return $body === false ? null : $body;
}

function extract_conf_data($html) {
  $needle = "confData = ";
  $pos = strpos($html, $needle);
  if ($pos === false) return null;
  $pos += strlen($needle);
  $len = strlen($html);
  $depth = 0;
  $inStr = false;
  $esc = false;
  $quote = "";
  $end = -1;
  for ($i = $pos; $i < $len; $i++) {
    $c = $html[$i];
    if ($inStr) {
      if ($esc) { $esc = false; continue; }
      if ($c === "\\") { $esc = true; continue; }
      if ($c === $quote) $inStr = false;
      continue;
    }
    if ($c === '"' || $c === "'") { $inStr = true; $quote = $c; continue; }
    if ($c === "{") $depth++;
    if ($c === "}") {
      $depth--;
      if ($depth === 0) { $end = $i; break; }
    }
  }
  if ($end < 0) return null;
  $json = substr($html, $pos, $end - $pos + 1);
  $data = json_decode($json, true);
  return is_array($data) ? $data : null;
}

$action = isset($_GET["action"]) ? $_GET["action"] : "search";

if ($action === "search") {
  $query = array();
  if (!empty($_GET["word"])) $query["word"] = substr(trim($_GET["word"]), 0, 80);
  if (isset($_GET["lat"]) && isset($_GET["lon"])) {
    $query["lat"] = floatval($_GET["lat"]);
    $query["lon"] = floatval($_GET["lon"]);
  }
  if (!$query) fail(400, "missing query");
  $url = "https://mawaqit.net/api/2.0/mosque/search?" . http_build_query($query);
  $body = http_get($url);
  if ($body === null) fail(502, "mawaqit search failed");
  echo $body;
  exit;
}

if ($action === "mosque") {
  $slug = isset($_GET["slug"]) ? $_GET["slug"] : "";
  if (!preg_match("/^[a-zA-Z0-9_-]{1,80}$/", $slug)) fail(400, "bad slug");
  $html = http_get("https://mawaqit.net/fr/" . rawurlencode($slug));
  if ($html === null) fail(502, "mawaqit mosque failed");
  $data = extract_conf_data($html);
  if (!$data) fail(502, "confData missing");
  echo json_encode(array(
    "name" => isset($data["name"]) ? $data["name"] : $slug,
    "slug" => $slug,
    "latitude" => isset($data["latitude"]) ? $data["latitude"] : null,
    "longitude" => isset($data["longitude"]) ? $data["longitude"] : null,
    "times" => isset($data["times"]) ? $data["times"] : array(),
    "shuruq" => isset($data["shuruq"]) ? $data["shuruq"] : null,
    "jumua" => isset($data["jumua"]) ? $data["jumua"] : null,
    "jumua2" => isset($data["jumua2"]) ? $data["jumua2"] : null,
    "timezone" => isset($data["timezone"]) ? $data["timezone"] : null,
    "calendar" => isset($data["calendar"]) ? $data["calendar"] : array(),
    "iqamaCalendar" => isset($data["iqamaCalendar"]) ? $data["iqamaCalendar"] : array(),
    "iqamaEnabled" => !empty($data["iqamaEnabled"])
  ));
  exit;
}

fail(400, "unknown action");
