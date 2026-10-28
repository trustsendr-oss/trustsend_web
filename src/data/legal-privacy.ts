/**
 * Politique de confidentialité et suppression de compte de Reemite.
 *
 * Le texte décrit ce que l'app et l'API font réellement (permissions déclarées dans app.json,
 * prestataires configurés côté serveur) : Google Play le compare à la fiche « Sécurité des
 * données » et aux autorisations de l'app. À mettre à jour à chaque nouvelle donnée ou nouveau
 * prestataire.
 */

export type LegalSection = {
  title: string;
  body?: string;
  items?: string[];
  after?: string;
};

export type LegalCopy = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const CONTACT_EMAIL = "hey@reemite.com";

export const privacy: Record<"fr" | "en", LegalCopy> = {
  fr: {
    eyebrow: "Informations juridiques",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 28 octobre 2026",
    intro:
      "Cette politique explique quelles données Reemite collecte lorsque vous utilisez l’application mobile Reemite et le site reemite.com, pourquoi nous les utilisons, avec qui nous les partageons et comment vous pouvez exercer vos droits. Reemite ne vend pas vos données et n’affiche pas de publicité ciblée.",
    sections: [
      {
        title: "1. Qui sommes-nous",
        body: `Reemite est un service de technologie financière qui permet de détenir des comptes en plusieurs devises, d’envoyer et de recevoir de l’argent, de payer des marchands, d’utiliser des cartes virtuelles et d’épargner en groupe (Likiliba). Reemite est responsable du traitement des données décrites ici. Pour toute question : ${CONTACT_EMAIL}.`,
      },
      {
        title: "2. Les données que nous collectons",
        items: [
          "Compte : nom, adresse e-mail, numéro de téléphone, photo de profil (facultative), code Reemite. Votre mot de passe et votre code PIN ne sont jamais stockés en clair : nous n’en conservons qu’une empreinte chiffrée.",
          "Vérification d’identité : photos ou fichiers de vos pièces d’identité et justificatifs, et le résultat de leur vérification. Ces documents sont stockés chiffrés.",
          "Comptes et opérations : soldes, recharges, retraits, envois, échanges de devises, paiements marchands, frais, motifs que vous saisissez, numéros mobile money et codes Reemite de vos destinataires.",
          "Cartes virtuelles : les cartes sont émises par notre partenaire émetteur. L’application affiche leurs données (numéro, date d’expiration, code de sécurité) à votre demande.",
          "Cryptomonnaies : adresses de dépôt et de retrait USDT et références des transactions sur la blockchain, qui sont publiques par nature.",
          "Likiliba : groupes que vous créez ou rejoignez, règles signées, cotisations, et le contenu que vous partagez dans la discussion du groupe (messages, photos, fichiers, messages vocaux, sondages, réactions). Ce contenu est visible des membres du groupe.",
          "Localisation : uniquement lorsque vous ouvrez la carte des agents et que vous l’autorisez. Votre position sert à trouver les agents proches de vous ; elle n’est pas enregistrée.",
          "Appareil et sécurité : jeton de notification, modèle et système de l’appareil, adresse IP, et un journal des actions sensibles (connexions, opérations, changements de réglages) avec leur date.",
          "Assistance : les réclamations et messages que vous adressez au support.",
        ],
      },
      {
        title: "3. Les autorisations de l’application",
        items: [
          "Appareil photo : scanner le code QR d’un marchand, photographier vos pièces d’identité, prendre une photo de profil ou une photo à envoyer dans un groupe.",
          "Photos et fichiers : choisir une photo de profil, un justificatif ou une pièce jointe que vous décidez d’envoyer.",
          "Microphone : uniquement pendant l’enregistrement d’un message vocal que vous lancez vous-même.",
          "Localisation : afficher les agents proches sur la carte, si vous l’autorisez.",
          "Biométrie (empreinte, visage) : déverrouiller l’application. La vérification se fait sur votre appareil ; Reemite ne reçoit jamais vos données biométriques.",
          "Notifications : vous prévenir d’une opération, d’un message ou d’un rappel de cotisation.",
          "Contacts : Reemite n’accède pas à votre carnet de contacts.",
        ],
        after: "Vous pouvez retirer chacune de ces autorisations à tout moment dans les réglages de votre téléphone ; seule la fonction concernée cessera de fonctionner.",
      },
      {
        title: "4. Pourquoi nous les utilisons",
        items: [
          "Créer et gérer votre compte, et exécuter les opérations que vous demandez.",
          "Vérifier votre identité et respecter nos obligations légales, notamment de lutte contre le blanchiment de capitaux et le financement du terrorisme.",
          "Protéger votre compte et prévenir la fraude.",
          "Vous envoyer des notifications et des e-mails liés à votre compte et à vos opérations.",
          "Traiter vos demandes d’assistance et vos réclamations.",
          "Améliorer la fiabilité de nos services.",
        ],
      },
      {
        title: "5. Avec qui nous les partageons",
        body: "Nous ne partageons que les données nécessaires à chaque service :",
        items: [
          "pawaPay, pour les dépôts et retraits par mobile money (Airtel Money, Orange Money, M-Pesa et autres opérateurs) ;",
          "Payscribe, émetteur de nos cartes virtuelles ;",
          "GoFreshPay, pour les recharges par carte bancaire ;",
          "Alchemy, pour le suivi des dépôts et retraits en cryptomonnaies ;",
          "Expo et Google Firebase Cloud Messaging, pour l’envoi des notifications ;",
          "notre prestataire d’envoi d’e-mails ;",
          "les institutions financières partenaires qui détiennent les fonds ou traitent les paiements ;",
          "les autres utilisateurs, dans la mesure nécessaire : le destinataire d’un envoi voit votre nom, et les membres d’un groupe Likiliba voient votre nom, votre photo de profil et ce que vous partagez dans le groupe ;",
          "les autorités compétentes, lorsque la loi nous y oblige.",
        ],
        after: "Ces prestataires n’utilisent vos données que pour le service qu’ils nous rendent.",
      },
      {
        title: "6. Hébergement et transferts",
        body: "Nos serveurs et le stockage des fichiers sont hébergés sur une infrastructure que nous administrons. Certains prestataires cités plus haut peuvent traiter des données en dehors de votre pays ; nous ne leur transmettons que ce qui est nécessaire au service rendu.",
      },
      {
        title: "7. Durée de conservation",
        items: [
          "Les données de votre compte sont conservées tant que votre compte est ouvert.",
          "Après la clôture du compte, les opérations, les documents d’identité et le journal de sécurité sont conservés pendant la durée imposée par nos obligations légales, en général au moins cinq ans, puis supprimés.",
          "Un message, une photo ou un fichier supprimé dans un groupe Likiliba n’est plus affiché aux membres, mais reste conservé pour le traitement des signalements et des litiges.",
          "Votre position n’est pas conservée.",
        ],
      },
      {
        title: "8. Sécurité",
        body: "Les échanges entre l’application et nos serveurs sont chiffrés (HTTPS). Les mots de passe et codes PIN sont stockés sous forme d’empreinte, les documents d’identité sont chiffrés, l’accès aux données est limité aux personnes qui en ont besoin, et les actions sensibles sont journalisées. Aucun système n’étant infaillible, protégez votre code PIN et ne le communiquez à personne : Reemite ne vous le demandera jamais.",
      },
      {
        title: "9. Vos droits",
        body: `Vous pouvez demander l’accès à vos données, leur rectification, leur suppression ou une copie, et vous opposer à certains traitements, dans les limites prévues par la loi. Écrivez-nous à ${CONTACT_EMAIL} depuis l’adresse e-mail de votre compte. Nous répondons dans un délai de 30 jours.`,
      },
      {
        title: "10. Supprimer votre compte",
        body: "La marche à suivre, et ce qui est supprimé ou conservé, sont décrits sur la page « Suppression de compte » : reemite.com/account-deletion.",
      },
      {
        title: "11. Mineurs",
        body: "Les services Reemite sont réservés aux personnes majeures. Nous ne collectons pas sciemment de données concernant des mineurs.",
      },
      {
        title: "12. Modifications",
        body: "Nous pouvons mettre à jour cette politique. La date en haut de la page indique la dernière version ; en cas de changement important, nous vous prévenons dans l’application ou par e-mail.",
      },
      {
        title: "13. Contact",
        body: `Pour toute question sur vos données : ${CONTACT_EMAIL}.`,
      },
    ],
  },
  en: {
    eyebrow: "Legal information",
    title: "Privacy policy",
    updated: "Last updated: October 28, 2026",
    intro:
      "This policy explains what data Reemite collects when you use the Reemite mobile app and the reemite.com website, why we use it, who we share it with and how you can exercise your rights. Reemite does not sell your data and does not show targeted advertising.",
    sections: [
      {
        title: "1. Who we are",
        body: `Reemite is a financial technology service for holding accounts in several currencies, sending and receiving money, paying merchants, using virtual cards and saving as a group (Likiliba). Reemite is the controller of the data described here. For any question: ${CONTACT_EMAIL}.`,
      },
      {
        title: "2. Data we collect",
        items: [
          "Account: name, email address, phone number, profile photo (optional), Reemite code. Your password and PIN are never stored in plain text: we only keep an encrypted fingerprint of them.",
          "Identity verification: photos or files of your identity documents and supporting documents, and the result of their verification. These documents are stored encrypted.",
          "Accounts and transactions: balances, top-ups, withdrawals, transfers, currency exchanges, merchant payments, fees, the notes you enter, and the mobile money numbers and Reemite codes of your recipients.",
          "Virtual cards: cards are issued by our issuing partner. The app shows their details (number, expiry date, security code) when you ask for them.",
          "Cryptocurrencies: USDT deposit and withdrawal addresses and blockchain transaction references, which are public by nature.",
          "Likiliba: groups you create or join, signed rules, contributions, and what you share in the group conversation (messages, photos, files, voice messages, polls, reactions). This content is visible to the group's members.",
          "Location: only when you open the agents map and allow it. Your position is used to find agents near you; it is not stored.",
          "Device and security: notification token, device model and operating system, IP address, and a log of sensitive actions (sign-ins, transactions, settings changes) with their date.",
          "Support: the complaints and messages you send to our support team.",
        ],
      },
      {
        title: "3. App permissions",
        items: [
          "Camera: scan a merchant's QR code, photograph your identity documents, take a profile photo or a photo to send in a group.",
          "Photos and files: pick a profile photo, a supporting document or an attachment you choose to send.",
          "Microphone: only while recording a voice message that you start yourself.",
          "Location: show nearby agents on the map, if you allow it.",
          "Biometrics (fingerprint, face): unlock the app. The check happens on your device; Reemite never receives your biometric data.",
          "Notifications: tell you about a transaction, a message or a contribution reminder.",
          "Contacts: Reemite does not access your contact list.",
        ],
        after: "You can withdraw any of these permissions at any time in your phone's settings; only the related feature will stop working.",
      },
      {
        title: "4. Why we use it",
        items: [
          "Create and manage your account, and carry out the transactions you request.",
          "Verify your identity and meet our legal obligations, in particular against money laundering and terrorist financing.",
          "Protect your account and prevent fraud.",
          "Send you notifications and emails about your account and transactions.",
          "Handle your support requests and complaints.",
          "Improve the reliability of our services.",
        ],
      },
      {
        title: "5. Who we share it with",
        body: "We only share the data each service needs:",
        items: [
          "pawaPay, for mobile money deposits and withdrawals (Airtel Money, Orange Money, M-Pesa and other operators);",
          "Payscribe, the issuer of our virtual cards;",
          "GoFreshPay, for top-ups by bank card;",
          "Alchemy, to track cryptocurrency deposits and withdrawals;",
          "Expo and Google Firebase Cloud Messaging, to deliver notifications;",
          "our email delivery provider;",
          "partner financial institutions that hold funds or process payments;",
          "other users, as far as needed: the recipient of a transfer sees your name, and the members of a Likiliba group see your name, your profile photo and what you share in the group;",
          "competent authorities, when the law requires it.",
        ],
        after: "These providers only use your data for the service they provide to us.",
      },
      {
        title: "6. Hosting and transfers",
        body: "Our servers and file storage run on infrastructure we administer. Some of the providers listed above may process data outside your country; we only send them what the service requires.",
      },
      {
        title: "7. How long we keep it",
        items: [
          "Your account data is kept while your account is open.",
          "After the account is closed, transactions, identity documents and the security log are kept for the period our legal obligations require, generally at least five years, then deleted.",
          "A message, photo or file deleted in a Likiliba group is no longer shown to members, but is kept to handle reports and disputes.",
          "Your location is not stored.",
        ],
      },
      {
        title: "8. Security",
        body: "Traffic between the app and our servers is encrypted (HTTPS). Passwords and PINs are stored as fingerprints, identity documents are encrypted, access to data is limited to the people who need it, and sensitive actions are logged. No system is infallible: protect your PIN and never share it. Reemite will never ask you for it.",
      },
      {
        title: "9. Your rights",
        body: `You can ask for access to your data, its correction, its deletion or a copy, and object to some processing, within the limits set by law. Write to ${CONTACT_EMAIL} from your account's email address. We reply within 30 days.`,
      },
      {
        title: "10. Deleting your account",
        body: "How to do it, and what is deleted or kept, is described on the “Account deletion” page: reemite.com/account-deletion.",
      },
      {
        title: "11. Minors",
        body: "Reemite services are for adults only. We do not knowingly collect data about minors.",
      },
      {
        title: "12. Changes",
        body: "We may update this policy. The date at the top of the page shows the latest version; for any significant change, we let you know in the app or by email.",
      },
      {
        title: "13. Contact",
        body: `For any question about your data: ${CONTACT_EMAIL}.`,
      },
    ],
  },
};

export const accountDeletion: Record<"fr" | "en", LegalCopy> = {
  fr: {
    eyebrow: "Informations juridiques",
    title: "Suppression de compte",
    updated: "Dernière mise à jour : 28 octobre 2026",
    intro:
      "Vous pouvez demander à tout moment la suppression de votre compte Reemite et des données qui y sont liées. Cette page explique comment faire, et ce qui est supprimé ou conservé.",
    sections: [
      {
        title: "Comment demander la suppression",
        items: [
          `Envoyez un e-mail à ${CONTACT_EMAIL} avec pour objet « Suppression de compte », depuis l’adresse e-mail de votre compte Reemite.`,
          "Indiquez le numéro de téléphone ou le code Reemite de votre compte.",
          "Nous vous confirmons la réception et, si besoin, nous vérifions que la demande vient bien de vous.",
          "Le compte est supprimé dans un délai de 30 jours après cette vérification.",
        ],
      },
      {
        title: "Avant la suppression",
        items: [
          "Retirez le solde de chacun de vos comptes : un compte ne peut pas être supprimé tant qu’il détient de l’argent.",
          "Attendez la fin des opérations en cours (retraits, recharges, transferts).",
          "Si vous participez à une Likiliba en cours, réglez vos cotisations et dettes envers le groupe, ou quittez-le selon ses règles.",
        ],
      },
      {
        title: "Ce qui est supprimé",
        items: [
          "votre accès au compte : identifiants, mot de passe et code PIN ;",
          "votre profil : photo, préférences, appareils et jetons de notification ;",
          "vos cartes virtuelles, qui sont résiliées ;",
          "les données qui ne sont pas soumises à une obligation de conservation.",
        ],
      },
      {
        title: "Ce qui est conservé",
        body: "La loi nous impose de conserver certaines données après la clôture d’un compte, généralement pendant au moins cinq ans :",
        items: [
          "l’historique des opérations et les justificatifs comptables ;",
          "les documents et résultats de vérification d’identité ;",
          "le journal de sécurité.",
        ],
        after: "Ces données ne servent alors qu’à respecter ces obligations et sont supprimées à la fin de la durée légale. Les messages déjà partagés dans un groupe Likiliba restent dans l’historique du groupe, où votre nom apparaît comme ancien membre.",
      },
      {
        title: "Supprimer seulement certaines données",
        body: `Vous pouvez aussi demander la suppression de certaines données sans fermer votre compte, par exemple votre photo de profil : écrivez à ${CONTACT_EMAIL}. Dans l’application, vous pouvez déjà supprimer vos propres messages Likiliba et retirer votre photo de profil.`,
      },
    ],
  },
  en: {
    eyebrow: "Legal information",
    title: "Account deletion",
    updated: "Last updated: October 28, 2026",
    intro:
      "You can ask at any time for your Reemite account and its related data to be deleted. This page explains how, and what is deleted or kept.",
    sections: [
      {
        title: "How to request deletion",
        items: [
          `Send an email to ${CONTACT_EMAIL} with the subject “Account deletion”, from your Reemite account's email address.`,
          "Include your account's phone number or Reemite code.",
          "We confirm receipt and, if needed, check that the request really comes from you.",
          "The account is deleted within 30 days of that check.",
        ],
      },
      {
        title: "Before deletion",
        items: [
          "Withdraw the balance of each of your accounts: an account cannot be deleted while it holds money.",
          "Wait for pending transactions (withdrawals, top-ups, transfers) to complete.",
          "If you are in an ongoing Likiliba, settle your contributions and debts to the group, or leave it under its rules.",
        ],
      },
      {
        title: "What is deleted",
        items: [
          "your access to the account: credentials, password and PIN;",
          "your profile: photo, preferences, devices and notification tokens;",
          "your virtual cards, which are terminated;",
          "any data not subject to a retention obligation.",
        ],
      },
      {
        title: "What is kept",
        body: "The law requires us to keep some data after an account is closed, generally for at least five years:",
        items: [
          "transaction history and accounting records;",
          "identity documents and verification results;",
          "the security log.",
        ],
        after: "This data is then only used to meet those obligations and is deleted at the end of the legal period. Messages already shared in a Likiliba group stay in the group's history, where your name shows as a former member.",
      },
      {
        title: "Deleting only some data",
        body: `You can also ask for some data to be deleted without closing your account, for example your profile photo: write to ${CONTACT_EMAIL}. In the app, you can already delete your own Likiliba messages and remove your profile photo.`,
      },
    ],
  },
};
