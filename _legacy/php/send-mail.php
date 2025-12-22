<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../libs/phpmailer/src/Exception.php';
require '../libs/phpmailer/src/PHPMailer.php';
require '../libs/phpmailer/src/SMTP.php';

// Récupération des identifiants SMTP
$user = getenv("REDIRECT_SMTP_USER");
$pass = getenv("REDIRECT_SMTP_PASS");
$recaptcha = $_POST['g-recaptcha-response'] ?? '';
$secret = getenv("REDIRECT_SMTP_CAPTCHA");

if (!$user || !$pass) {
    exit("⚠️ Configuration SMTP manquante.");
}

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->Encoding = '8bit';

try {
    // ✅ reCAPTCHA validation avec cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'secret' => $secret,
        'response' => $recaptcha,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($response);
    if (!$result || !$result->success) {
        exit("Erreur reCAPTCHA. Merci de valider que vous n’êtes pas un robot.");
    }

    // Configuration serveur SMTP
    $mail->isSMTP();
    $mail->Host       = 'mail.infomaniak.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $user;
    $mail->Password   = $pass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Expéditeur et destinataire
    $mail->setFrom($user, 'Assistant IA');
    $mail->addAddress($user);
    $mail->addReplyTo($_POST["email"], $_POST["prenom"]);

    // Contenu du mail
    $mail->isHTML(true);
    $mail->Subject = 'Message depuis ton assistant IA';
    $mail->Body    = "Prénom : " . htmlspecialchars($_POST["prenom"]) .
                     "<br>Email : " . htmlspecialchars($_POST["email"]) .
                     "<br><br>Message :<br>" . nl2br(htmlspecialchars($_POST["message"]));
    $mail->AltBody = "Prénom : {$_POST["prenom"]}\nEmail : {$_POST["email"]}\n\nMessage :\n{$_POST["message"]}";

    // ✅ Envoi du mail
    $mail->send();
    echo '📬 Message envoyé avec succès.';

} catch (Exception $e) {
    echo "❌ Erreur : {$mail->ErrorInfo}";
}
