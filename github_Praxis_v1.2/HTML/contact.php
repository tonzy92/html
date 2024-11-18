<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// PHPMailer laden
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Eingabedaten aus dem Formular abrufen
    $name = htmlspecialchars($_POST['name']);
    $insurance_status = htmlspecialchars($_POST['insurance-status']);
    $phone = htmlspecialchars($_POST['phone']);
    $insurance_name = htmlspecialchars($_POST['insurance-name']);
    $address = htmlspecialchars($_POST['address']);
    $city = htmlspecialchars($_POST['city']);
    $postcode = htmlspecialchars($_POST['postcode']);
    $state = htmlspecialchars($_POST['state']);
    $region = htmlspecialchars($_POST['region']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Empfängeradresse
    $to = "Tony.Matt@gmx.de"; // Zieladresse für die E-Mail

    // Betreff der E-Mail
    $subject = "Neue Kontaktanfrage von $name";

    // E-Mail-Inhalt formatieren
    $body = "
    <html>
    <head>
        <title>Kontaktanfrage</title>
    </head>
    <body>
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name, Vorname:</strong> $name</p>
        <p><strong>Versicherungsstatus:</strong> $insurance_status</p>
        <p><strong>Telefon:</strong> $phone</p>
        <p><strong>Name Ihrer Versicherung:</strong> $insurance_name</p>
        <p><strong>Anschrift:</strong> $address</p>
        <p><strong>Ort:</strong> $city</p>
        <p><strong>Postleitzahl:</strong> $postcode</p>
        <p><strong>Bundesland:</strong> $state</p>
        <p><strong>Region:</strong> $region</p>
        <p><strong>E-Mail:</strong> $email</p>
        <p><strong>Nachricht:</strong><br>$message</p>
    </body>
    </html>
    ";

    // PHPMailer-Objekt erstellen
    $mail = new PHPMailer(true);

    try {
        // Servereinstellungen
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmx.de';             // SMTP-Server deines E-Mail-Providers
        $mail->SMTPAuth   = true;                      // SMTP-Authentifizierung aktivieren
        $mail->Username   = 'Tony.Matt@gmx.de';      // SMTP-Benutzername (deine E-Mail-Adresse)
        $mail->Password   = 'D3IWJHMXNCXS2RPLASKY';           // SMTP-Passwort
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Verschlüsselung
        $mail->Port       = 587;                      // SMTP-Port (z. B. 587 für STARTTLS)

        // Absender und Empfänger
        $mail->setFrom('Tony.Matt@gmx.de', 'Tony Matt'); // Absenderadresse
        $mail->addAddress($to);                            // Empfängeradresse

        // Inhalt der E-Mail
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;

        // E-Mail senden
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet."]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Nachricht konnte nicht gesendet werden. Fehler: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Ungültige Anfrage."]);
}