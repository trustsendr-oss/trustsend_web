import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

type LegalKind = "privacy" | "terms";

type LegalCopy = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: { title: string; body: string }[];
};

const copy: Record<string, Record<LegalKind, LegalCopy>> = {
  fr: {
    privacy: {
      eyebrow: "Informations juridiques",
      title: "Politique de confidentialité",
      updated: "Dernière mise à jour : 21 septembre 2026",
      intro: "Cette politique explique comment TrustSend traite les informations liées à l’utilisation de ses services.",
      sections: [
        { title: "Informations que nous traitons", body: "Nous pouvons traiter les informations de compte, de contact, d’identité et de transaction nécessaires à la fourniture, à la sécurité et à l’amélioration de nos services." },
        { title: "Pourquoi nous les utilisons", body: "Ces informations servent notamment à créer et gérer votre compte, exécuter vos instructions, prévenir la fraude, respecter nos obligations légales et vous assister." },
        { title: "Partage et prestataires", body: "Nous partageons uniquement les données nécessaires avec les institutions financières, processeurs de paiement, prestataires techniques et autorités compétentes lorsque la loi l’exige." },
        { title: "Sécurité et conservation", body: "Nous appliquons des mesures de sécurité adaptées et conservons les informations uniquement pendant la durée nécessaire aux finalités décrites ou imposée par la loi." },
        { title: "Vos droits", body: "Selon votre pays, vous pouvez demander l’accès, la correction ou la suppression de certaines données, ainsi que des informations sur leur traitement. Contactez-nous via les canaux de support du site." },
      ],
    },
    terms: {
      eyebrow: "Informations juridiques",
      title: "Conditions d’utilisation",
      updated: "Dernière mise à jour : 21 septembre 2026",
      intro: "Ces conditions encadrent l’accès et l’utilisation des services TrustSend.",
      sections: [
        { title: "Notre rôle", body: "TrustSend est une entreprise de technologie financière, et non une banque. Nous opérons au moyen de licences détenues sur nos marchés et de partenariats avec des institutions financières et processeurs de paiement dûment agréés et réglementés." },
        { title: "Utilisation des services", body: "Vous devez fournir des informations exactes, protéger vos identifiants et utiliser les services conformément aux lois applicables. Certaines fonctionnalités peuvent dépendre de votre pays, de votre éligibilité ou de vérifications." },
        { title: "Paiements et transactions", body: "Les frais, limites, délais et taux applicables vous sont présentés avant la confirmation lorsque cela est possible. Une transaction peut être retardée, refusée ou examinée pour des raisons de sécurité ou de conformité." },
        { title: "Usage interdit", body: "Vous ne devez pas utiliser TrustSend à des fins frauduleuses, illicites, de blanchiment, de financement du terrorisme ou d’atteinte aux droits d’autrui." },
        { title: "Mises à jour et assistance", body: "Nous pouvons faire évoluer ces conditions et les services. Pour toute question ou réclamation, utilisez les canaux d’assistance indiqués sur le site." },
      ],
    },
  },
  en: {
    privacy: { eyebrow: "Legal information", title: "Privacy policy", updated: "Last updated: September 21, 2026", intro: "This policy explains how TrustSend handles information connected with the use of its services.", sections: [{ title: "Information we process", body: "We may process account, contact, identity and transaction information needed to provide, secure and improve our services." }, { title: "Why we use it", body: "This information helps us create and manage your account, carry out your instructions, prevent fraud, meet legal obligations and support you." }, { title: "Sharing and providers", body: "We share only necessary data with financial institutions, payment processors, technical providers and competent authorities when required by law." }, { title: "Security and retention", body: "We apply appropriate security measures and retain information only for as long as needed for the stated purposes or required by law." }, { title: "Your rights", body: "Depending on your country, you may request access to, correction or deletion of certain data, and information about its processing. Contact us through the support channels on this site." }] },
    terms: { eyebrow: "Legal information", title: "Terms of use", updated: "Last updated: September 21, 2026", intro: "These terms govern access to and use of TrustSend services.", sections: [{ title: "Our role", body: "TrustSend is a financial technology company, not a bank. We operate through licences held across our markets and through partnerships with fully licensed, nationally regulated financial institutions and payment processors." }, { title: "Using the services", body: "You must provide accurate information, protect your credentials and use the services in accordance with applicable laws. Some features may depend on your country, eligibility or verification." }, { title: "Payments and transactions", body: "Applicable fees, limits, timing and rates are presented before confirmation where possible. A transaction may be delayed, declined or reviewed for security or compliance reasons." }, { title: "Prohibited use", body: "You must not use TrustSend for fraudulent, unlawful, money-laundering, terrorist-financing or rights-infringing activity." }, { title: "Updates and support", body: "We may update these terms and the services. For questions or complaints, use the support channels shown on this site." }] },
  },
  ln: {
    privacy: { eyebrow: "Makambo ya mibeko", title: "Politiki ya kobatela makambo ya moto", updated: "Ebongisami na suka: 21 Sɛtɛmbɛ 2026", intro: "Politiki oyo elimboli ndenge TrustSend esalelaka makambo etali kosalela misala na yango.", sections: [{ title: "Makambo tosalelaka", body: "Tokoki kosalela makambo ya compte, ya kosolola, ya bomoto mpe ya misolo oyo esengeli mpo na kopesa, kobatela mpe kobongisa misala na biso." }, { title: "Mpo na nini tosalelaka yango", body: "Esalisaka biso kofungola mpe koyangela compte na yo, kosala malako na yo, kopekisa bokosi, kotosa mibeko mpe kosunga yo." }, { title: "Kokabola makambo", body: "Tokabolaka kaka makambo esengeli na ba institutions financières, processeurs ya paiement, baprestataires techniques mpe bakonzi oyo mibeko esengi." }, { title: "Bobateli mpe kobomba", body: "Tosalelaka mayele ya bobateli oyo ebongi mpe tobombaka makambo kaka ntango esengeli to ndenge mibeko esengi." }, { title: "Makoki na yo", body: "Na kolanda mboka na yo, okoki kosenga komona, kobongisa to kolongola makambo mosusu. Sololá na biso na nzela ya support ya site." }] },
    terms: { eyebrow: "Makambo ya mibeko", title: "Mibeko ya kosalela", updated: "Ebongisami na suka: 21 Sɛtɛmbɛ 2026", intro: "Mibeko oyo etambwisa kokota mpe kosalela misala ya TrustSend.", sections: [{ title: "Mosala na biso", body: "TrustSend ezali kompani ya technologie financière, kasi ezali banki te. Tosalaka na nzela ya licences na ba marchés na biso mpe na boyokani na institutions financières mpe processeurs ya paiement oyo ezali na ndingisa mpe etambwisami na mboka." }, { title: "Kosalela misala", body: "Osengeli kopesa makambo ya solo, kobatela ba identifiants na yo mpe kosalela misala na kolanda mibeko. Misala mosusu ekoki kotala mboka na yo, eligibility to vérification." }, { title: "Paiement mpe transactions", body: "Ntalo, limites, mikolo mpe taux esengeli komonana liboso ya kondima soki ekoki. Transaction ekoki kozonga sima, koboyama to kotala mpo na bobateli to conformité." }, { title: "Kosalela oyo epekisami", body: "Osengeli te kosalela TrustSend mpo na bokosi, makambo ya mabe na mibeko, blanchiment to financement ya terrorisme." }, { title: "Mbongwana mpe lisungi", body: "Tokoki kobongisa mibeko oyo mpe misala. Mpo na mituna to réclamation, salelá support oyo ezali na site." }] },
  },
  sw: {
    privacy: { eyebrow: "Maelezo ya kisheria", title: "Sera ya faragha", updated: "Ilisasishwa mwisho: 21 Septemba 2026", intro: "Sera hii inaeleza jinsi TrustSend inavyoshughulikia taarifa zinazohusiana na matumizi ya huduma zake.", sections: [{ title: "Taarifa tunazoshughulikia", body: "Tunaweza kushughulikia taarifa za akaunti, mawasiliano, utambulisho na miamala zinazohitajika kutoa, kulinda na kuboresha huduma zetu." }, { title: "Kwa nini tunazitumia", body: "Taarifa hizi hutusaidia kufungua na kusimamia akaunti yako, kutekeleza maelekezo yako, kuzuia ulaghai, kutimiza wajibu wa kisheria na kukusaidia." }, { title: "Kushiriki na watoa huduma", body: "Tunashiriki data muhimu tu na taasisi za kifedha, wachakataji wa malipo, watoa huduma wa kiufundi na mamlaka husika sheria inapohitaji." }, { title: "Usalama na uhifadhi", body: "Tunatumia hatua zinazofaa za usalama na kuhifadhi taarifa kwa muda unaohitajika kwa madhumuni yaliyoelezwa au kwa mujibu wa sheria." }, { title: "Haki zako", body: "Kulingana na nchi yako, unaweza kuomba kufikia, kusahihisha au kufuta data fulani. Wasiliana nasi kupitia njia za msaada kwenye tovuti hii." }] },
    terms: { eyebrow: "Maelezo ya kisheria", title: "Masharti ya matumizi", updated: "Ilisasishwa mwisho: 21 Septemba 2026", intro: "Masharti haya yanaongoza upatikanaji na matumizi ya huduma za TrustSend.", sections: [{ title: "Wajibu wetu", body: "TrustSend ni kampuni ya teknolojia ya fedha, si benki. Tunafanya kazi kupitia leseni katika masoko yetu na ubia na taasisi za kifedha na wachakataji wa malipo wenye leseni kamili na wanaodhibitiwa kitaifa." }, { title: "Kutumia huduma", body: "Lazima utoe taarifa sahihi, ulinde vitambulisho vyako na utumie huduma kwa kufuata sheria husika. Baadhi ya vipengele hutegemea nchi yako, ustahiki au uthibitisho." }, { title: "Malipo na miamala", body: "Ada, vikomo, muda na viwango huonyeshwa kabla ya kuthibitisha inapowezekana. Muamala unaweza kucheleweshwa, kukataliwa au kuchunguzwa kwa sababu za usalama au utii wa sheria." }, { title: "Matumizi yaliyokatazwa", body: "Hupaswi kutumia TrustSend kwa ulaghai, shughuli haramu, utakatishaji fedha, ufadhili wa ugaidi au ukiukaji wa haki za wengine." }, { title: "Mabadiliko na msaada", body: "Tunaweza kusasisha masharti haya na huduma. Kwa maswali au malalamiko, tumia njia za msaada kwenye tovuti hii." }] },
  },
};

export function Legal({ kind }: { kind: LegalKind }) {
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith("en") ? "en" : i18n.language.startsWith("ln") ? "ln" : i18n.language.startsWith("sw") ? "sw" : "fr";
  const content = copy[language][kind];

  return <div className="min-h-screen overflow-x-hidden bg-white"><Nav /><main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-6 sm:pt-40"><p className="text-sm font-semibold text-brand">{content.eyebrow}</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{content.title}</h1><p className="mt-5 text-base leading-7 text-muted-2">{content.intro}</p><p className="mt-4 text-sm text-muted">{content.updated}</p><div className="mt-12 space-y-10">{content.sections.map((section) => <section key={section.title}><h2 className="text-xl font-semibold text-ink">{section.title}</h2><p className="mt-3 text-base leading-7 text-muted-2">{section.body}</p></section>)}</div></main><Footer /></div>;
}
