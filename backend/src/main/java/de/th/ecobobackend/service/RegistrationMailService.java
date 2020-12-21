package de.th.ecobobackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class RegistrationMailService {

    //entspricht der Enviromentvariablen $EMAIL_PASSWORD
    @Value("${email.password}")
    private String emailPassword;

    public void sendRegistrationMail(String emailToRegister, String activationToken) throws MessagingException
    {
        String sender = "ecobo-bochum@gmx.de";
        String password = emailPassword;

        Properties properties = new Properties();

        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.host", "mail.gmx.net");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.user", sender);
        properties.put("mail.smtp.password", password);
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.ssl.trust", "mail.gmx.net");

        Session mailSession = Session.getInstance(properties, new Authenticator()
        {
            @Override
            protected PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication(properties.getProperty("mail.smtp.user"),
                        properties.getProperty("mail.smtp.password"));
            }
        });

        //change later to the deployment server
        String activationLink = "https://ecobo-neuefische.herokuapp.com/acc/activation/" + activationToken;
        String content = "Guten Tag,\n" +
                "\n" +
                "Um die Einrichtung deines Accounts bei der EcoBo-App abzuschliessen, musst Du diese E-Mail-Adresse bestaetigen," +
                " indem Du den untenstehenden Link anklickst.\n" +
                "\n" +
                activationLink + "\n" +
                "\n" +
                "Wenn Du die Anmeldung bei EcoBo nicht vorgenommen hast, ignoriere diese Mail.\n" +
                "\n" +
                "Liebe Gruesse,\n" +
                "das EcoBo-Team";

        Message message = new MimeMessage(mailSession);
        InternetAddress addressTo = new InternetAddress(emailToRegister);
        message.setRecipient(Message.RecipientType.TO, addressTo);
        message.setFrom(new InternetAddress(sender));
        message.setSubject("Deine Registrierung bei EcoBo");
        message.setContent(content, "text/plain");
        Transport.send(message);
    }
}
