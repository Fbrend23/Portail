<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../libs/phpmailer/src/Exception.php';
require '../libs/phpmailer/src/PHPMailer.php';
require '../libs/phpmailer/src/SMTP.php';

// Récupération des identifiants SMTP
$user = getenv("REDIRECT_SMTP_USER");
$pass = getenv("REDIRECT_SMTP_PASS");

if (!$user || !$pass) {
    exit("⚠️ Configuration SMTP manquante.");
}

$mail = new PHPMailer(true);

try {
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
    $mail->addAddress($user); // S’auto-envoi pour test ou réception

    // Réponses vers l'expéditeur
    $mail->addReplyTo($_POST["email"], $_POST["prenom"]);

    // Contenu du mail
    $mail->isHTML(true);
    $mail->Subject = 'Message depuis ton assistant IA';
    $mail->Body    = "Prénom : " . htmlspecialchars($_POST["prenom"]) .
                     "<br>Email : " . htmlspecialchars($_POST["email"]) .
                     "<br><br>Message :<br>" . nl2br(htmlspecialchars($_POST["message"]));
    $mail->AltBody = "Prénom : {$_POST["prenom"]}\nEmail : {$_POST["email"]}\n\nMessage :\n{$_POST["message"]}";

    // Envoi
    $mail->send();
    echo '📬 Message envoyé avec succès.';
} catch (Exception $e) {
    echo "❌ Erreur : {$mail->ErrorInfo}";
}
