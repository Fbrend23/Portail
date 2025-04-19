<?php
// Sécurité de base : éviter l'accès direct
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Accès interdit");
}

// Récupération et nettoyage des données
$prenom  = htmlspecialchars(trim($_POST["prenom"]));
$email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($_POST["message"]));

// Vérification simple
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($prenom) || empty($message)) {
    exit("Données invalides");
}

// Préparation du mail
$to = "contact@brendanfleurdelys.ch";
$subject = "Nouveau message depuis ton assistant IA";
$body = "Prénom : $prenom\nEmail : $email\n\nMessage :\n$message";
$headers = "From: $prenom <$email>" . "\r\n" .
           "Reply-To: $email" . "\r\n" .
           "Content-Type: text/plain; charset=utf-8";

// Envoi du mail
if (mail($to, $subject, $body, $headers)) {
    echo "Message envoyé avec succès.";
} else {
    echo "Erreur lors de l'envoi du message.";
}
?>
