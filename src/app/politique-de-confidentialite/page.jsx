// export const metadata = {
//     title: {
//         default: 'Sibane : Politique de confidentialité.', //Titre utilisé également pour Twitter et OG (max 70 caractères)
//     },
//     description:
//         'Sibane, expert en diagnostics immobiliers depuis plus de 20 ans à Sainghin-en-Weppes (59184). Politique de confidentialité.', //description utilisé également pour Twitter et OG (max 200 caractères)
//     twitter: {
//         card: 'summary_large_image',
//     },
//     openGraph: {
//         images: [
//             {
//                 url: 'https://bucketsibane.s3.eu-west-3.amazonaws.com/LogoEntreprise',
//             },
//         ],
//     },
// };
import Header from '@/components/Header';
export default function politiqueDeConfidentialite() {
    const society = 'Benjamin Vallon EI';
    const lastName = 'VALLON';
    const firstName = 'Benjamin';
    const status = 'EI';
    const siret = '98742665700019';
    const siren = '987426657';
    const tvaIntra = 'FR87987426657';
    const adress = '61 Rue de Lyon';
    const cp = '75012';
    const city = 'Paris';
    const email1 = 'contact@benjamin-vallon.fr';
    const website = 'https://portfolio.benjamin-vallon.fr';

    const cookiesList = {
        userConsent:
            "Cookie analytics : Ce cookie est utilisé pour enregistrer votre consentement à l'utilisation des cookies. Il est stocké pendant 6 mois.",
        userConsentDate:
            "Cookie analytics : Ce cookie est utilisé pour enregistrer la date de votre consentement à l'utilisation des cookies. Il est stocké pendant 6 mois.",
    };
    const cookieItems = Object.entries(cookiesList).map(([key, value]) => (
        <li key={key}>
            - {key} : {value}
        </li>
    ));

    const dataUserList = {
        Nom: 'Afin de donner suite à votre demande de contact',
        Email: 'Afin de donner suite à votre demande de contact',
        Message: 'Afin de donner suite à votre demande de contact',
    };
    const dataUserItems = Object.entries(dataUserList).map(([key, value]) => (
        <li key={key}>
            - {key} : {value}
        </li>
    ));

    return (
        <>
            <Header></Header>
            <div className='mt-[15%]'>
                <div className='mx-auto text-center'>
                    <h1 className='heading1'>
                        Politique de confidentialité<br></br>
                        <span className='text-customBlue'>{society}</span>
                    </h1>
                    <h2 className='heading2 font-bold mt-1 mb-8'>
                        Dernière mise à jour le 27 novembre 2024
                    </h2>
                </div>
                <section className='px-4 pt-5 sm:px-6 flex flex-col justify-center items-center'>
                    <p>
                        Conformément à notre philosophie, la protection de vos
                        données personnelles est essentielle à nos yeux et nous
                        souhaitons vous informer par l’intermédiaire de la
                        présente politique de confidentialité (« politique de
                        confidentialité ») de la manière dont nous collectons et
                        traitons vos données personnelles et des moyens dont
                        vous disposez pour contrôler cette utilisation et
                        exercer vos droits.
                    </p>
                </section>
                <div className='px-4 py-5 sm:p-6'>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            1. Glossaire
                        </h2>
                        <p>
                            Dans la politique de confidentialité, sauf
                            disposition contraire, les expressions et mots
                            suivants ont respectivement les significations
                            indiquées ci-dessous :
                        </p>
                        <ul className='ml-5'>
                            <li>
                                <strong>Client :</strong> désigne la personne
                                physique ayant souscrit à un service auprès de{' '}
                                {society}.
                            </li>
                            <li>
                                <strong>CNIL :</strong> désigne la Commission
                                Nationale de l’Informatique et des Libertés.
                            </li>
                            <li>
                                <strong>Donnée Personnelle :</strong> désigne
                                toute information se rapportant à une personne
                                physique identifiée ou identifiable.
                            </li>
                            <li>
                                <strong>Prestataire :</strong> désigne
                                l’ensemble des prestataires avec lesquels{' '}
                                {society} entretient des relations
                                contractuelles.
                            </li>
                            <li>
                                <strong>Réglementation :</strong> désigne la Loi
                                n°78-17 du 6 janvier 1978 relative à
                                l’informatique, aux fichiers et aux libertés
                                modifiée, le règlement (UE) 2016/679 du
                                parlement européen et du conseil du 27 avril
                                2016 relatif à la protection des personnes
                                physiques à l’égard du traitement des données à
                                caractère personnel et à la libre circulation de
                                ces données, et abrogeant la directive 95/46/CE
                                (ci-après « RGPD ») ainsi que toute
                                règlementation en vigueur concernant la
                                protection des données personnelles.
                            </li>
                            <li>
                                <strong>Responsable de traitement :</strong>{' '}
                                désigne la personne physique ou morale,
                                l'autorité publique, le service ou un autre
                                organisme qui, seul ou conjointement avec
                                d'autres, détermine les finalités et les moyens
                                du traitement.
                            </li>
                            <li>
                                <strong>Site :</strong> désigne le site internet
                                édité par {society} dont l’adresse url est{' '}
                                <a href={website}>{website}</a>.
                            </li>
                            <li>
                                <strong>Sous-traitant :</strong> désigne la
                                personne physique ou morale, l'autorité
                                publique, le service ou un autre organisme qui
                                traite des données à caractère personnel pour le
                                compte du responsable du traitement.
                            </li>
                            <li>
                                <strong>Terminal :</strong> désigne l’équipement
                                matériel (ordinateur, tablette, smartphone,
                                téléphone) que vous utilisez pour consulter ou
                                voir s’afficher le Site.
                            </li>
                            <li>
                                <strong>
                                    Traitement ou traitement de données à
                                    caractère personnel :
                                </strong>{' '}
                                désigne la collecte, l’enregistrement,
                                l’organisation, la structuration, la
                                conservation, l’adaptation, ou la modification,
                                l’extraction, la consultation, l’utilisation ou
                                toute autre forme de mise à disposition, le
                                rapprochement ou l’interconnexion, la
                                limitation, l’effacement et la destruction.
                            </li>
                            <li>
                                <strong>Utilisateur :</strong> désigne la
                                personne naviguant sur le site mais n’ayant
                                jamais souscrit à un service auprès de {society}
                                .
                            </li>
                        </ul>
                        <p>
                            Ces définitions sont libellées avec une majuscule et
                            s’entendent au singulier comme au pluriel.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            2. Quel est le champ d’application de la politique
                            de confidentialité ?
                        </h2>
                        <p>Cette politique de confidentialité s’adresse :</p>
                        <ul className='ml-5'>
                            {/* <li>Aux clients;</li> (A insérer uniquement si votre client propose la souscription en ligne à ses services.) */}
                            <li>Aux utilisateurs.</li>
                        </ul>
                        <p>
                            En conséquence, l’accès et la navigation sur le site{' '}
                            {/* et la souscription à des services auprès de (A insérer uniquement si votre client propose la souscription en ligne à ses services.)*/}{' '}
                            {society} suppose que vous ayez lu et accepté
                            l’ensemble des termes de la politique de
                            confidentialité, et donc la collecte et
                            l’utilisation des données personnelles vous
                            concernant.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            3. Quels sont les acteurs de la Protection des
                            données personnelles ?
                        </h2>
                        <p>
                            Le responsable de traitement des données
                            personnelles est {lastName} {firstName},
                            représentant de {society}, SIRET n° {siret}, SIREN
                            n° {siren},TVA intracommunautaire {tvaIntra} dont le
                            siège social est situé {adress} {cp} {city} pour les
                            traitements qu’il met en œuvre sur les données
                            personnelles des clients et des utilisateurs
                            collectées.
                        </p>
                        <p>
                            Vous pouvez contacter {society} par voie postale à
                            l'adresse suivante : {adress} {cp} {city}. En lui
                            envoyant un courrier électronique à l’adresse
                            suivante : {email1}.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            4. Quelle est la nature des données personnelles
                            traitées par {society} ?
                        </h2>
                        <p>
                            {society} prend en compte les principes de
                            minimisation des données, de protection des données
                            dès la conception et de protection des données par
                            défaut. En conséquence, sont collectées des
                            informations pertinentes, adéquates et limitées à ce
                            qui est nécessaire au regard des finalités pour
                            lesquelles elles sont traitées, et notamment
                            nécessaires à la fourniture des services souscrits.
                        </p>
                        <p>
                            Ces données personnelles sont recueillies lorsque
                            vous souscrivez à un service ou lorsque vous
                            contactez {society}.
                        </p>

                        <p>
                            Lorsque vous remplissez des champs de saisie sur un
                            formulaire, le caractère obligatoire d’une réponse
                            est indiqué par l’utilisation d’un astérisque (*) à
                            la fin de la question. L’absence de réponse à une
                            question signalée par un astérisque fait obstacle au
                            traitement de votre demande.
                        </p>

                        <p>
                            Lorsque vous choisissez d’envoyer spontanément vos
                            données personnelles à {society}, sans que ce
                            dernier ne vous l’ait demandé, vous consentez
                            expressément à la collecte des données personnelles
                            et vous vous engagez à assumer l'entière
                            responsabilité des données personnelles transmises.
                        </p>

                        {/* FORMULAIRE DE CONTACT UNIQUEMENT */}
                        {/* <p><strong>Les informations communiquées sur le Site via l’onglet «Contact»</strong></p>
            <p>{society} traite le nom, prénom, adresse email et éventuellement le numéro de téléphone de l’Utilisateur qui le contacte par le biais du Site.</p> 
            (A compléter en fonction des données collectées sur le site par le client.)*/}

                        {/* NEWSLETTER UNIQUEMENT */}
                        {/* <p><strong>Les informations collectées par le biais de l’inscription à une newsletter</strong></p>
            <p>{society} traite l’adresse email de l’Utilisateur qui souhaite souscrire à une newsletter.</p>*/}

                        {/* SERVICE EN LIGNE UNIQUEMENT */}
                        <p>
                            <strong>
                                Les données relatives à la souscription à un
                                service
                            </strong>
                        </p>
                        <p>
                            {society} traite le nom, prénom, adresse email et
                            éventuellement le numéro de téléphone de ses
                            clients.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            5. Quelles sont les finalités de Traitement et les
                            bases juridiques ?
                        </h2>
                        <p>
                            {society} collecte et traite des données
                            personnelles uniquement si l’une des conditions
                            suivantes est remplie :
                        </p>
                        <ul className='ml-5'>
                            <li>
                                {society} a recueilli votre consentement
                                préalable;
                            </li>
                            {/* SERVICE EN LIGNE UNIQUEMENT */}
                            {/* <li>Le Traitement est nécessaire à l’exécution d’un contrat ou de mesures précontractuelles;</li> */}
                            <li>
                                Le traitement est nécessaire au respect des
                                obligations légales ou règlementaires de{' '}
                                {society} ; ou
                            </li>
                            <li>
                                Le traitement est nécessaire aux fins des
                                intérêts légitimes poursuivis par {society} et
                                n’affectent pas indument vos intérêts ou
                                libertés et droits fondamentaux.
                            </li>
                        </ul>

                        {/* SERVICE EN LIGNE UNIQUEMENT */}
                        {/* <p><strong>Sur le fondement d’un contrat ou de mesures précontractuelles</strong></p>
            <p>Sur le fondement d’un contrat ou de mesures précontractuelles, {society} effectue les opérations de Traitement suivantes :</p>
            <ul className="ml-5">
                <li>La gestion des prestations de service ;</li>
                <li>La gestion des incidents et des réclamations ;</li>
                <li>La facturation ;</li>
                <li>Le suivi de la relation avec les clients.</li>
            </ul>

            <p><strong>Sur le fondement de l’intérêt légitime de {society}</strong></p>
            <p>Sur le fondement de l’intérêt légitime, {society} effectue les opérations de Traitement suivantes :</p>
            <ul className="ml-5">
                <li>La préparation, l’exercice et le suivi des recours et contentieux ;</li>
                <li>L’exécution de la décision rendue.</li>
            </ul> */}

                        <p>
                            <strong>
                                Sur le fondement du consentement des
                                utilisateurs
                            </strong>
                        </p>
                        <p>
                            Sur le fondement du consentement des utilisateurs,{' '}
                            {society} effectue les opérations de traitements
                            suivantes :
                        </p>
                        <ul className='ml-5'>{dataUserItems}</ul>
                        <p>
                            Dans ce cadre, vous pouvez retirer à tout moment
                            votre consentement, sans que ce retrait puisse
                            porter atteinte à la licéité des traitements
                            réalisés par {society} avant ledit retrait.
                        </p>

                        {/* SERVICE EN LIGNE UNIQUEMENT */}
                        {/* <p><strong>Sur le fondement du respect des obligations légales et règlementaires</strong></p>
            <p>{society} est également susceptible d’utiliser vos données personnelles pour répondre aux exigences légales et réglementaires lui incombant, notamment concernant :</p>
            <ul className="ml-5">
                <li>La réponse à des exigences en en matière de sécurité, de lutte contre la fraude ou d’application de la loi;</li>
                <li>La tenue d’une comptabilité.</li>
            </ul> */}
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            6. Quelle est la durée de conservation des données
                            personnelles ?
                        </h2>
                        <p>
                            {society} conserve vos données personnelles pour le
                            temps nécessaire à l’accomplissement des finalités
                            poursuivies, sous réserve des possibilités légales
                            d’archivage, d’obligations de conservation de
                            certaines données personnelles et/ou
                            d’anonymisation.
                        </p>

                        {/* SERVICE EN LIGNE UNIQUEMENT */}
                        {/* <p><strong>données personnelles relatives à la souscription à un service</strong></p>
            <p>{society} conserve vos données personnelles pour le temps nécessaire à l’accomplissement des finalités poursuivies, sous réserve des possibilités légales d’archivage, d’obligations de conservation de certaines données personnelles et/ou d’anonymisation.</p>
            <p>Les données personnelles des clients relatives à la souscription à un service sont conservées en base active pour une durée de trois (3) ans à compter de la dernière souscription à un service.</p>
            <p>Conformément à ses obligations légales et règlementaires, {society} conserve certaines données pour des durées supérieures (notamment dix (10) ans à compter de leur émission pour les factures)</p>
            <p>A l’issue de la durée de prescription légale ou règlementaire, {society} s’engage à effacer les données personnelles de ses bases ou à les anonymiser.</p>
            <p>Par ailleurs, les données personnelles recueillies par l’intermédiaire de Cookies ne sont conservées que pour une durée de treize (13) mois à compter de la collecte de ces données personnelles.</p> */}

                        <p>
                            <strong>
                                données personnelles relatives à la prise de
                                contact via le Site
                            </strong>
                        </p>
                        <p>
                            Les données personnelles des utilisateurs qui
                            contactent {society} par l’intermédiaire du Site
                            sont conservées pour une durée de trois (3) ans à
                            compter de la dernière prise de contact, sous
                            réserve des possibilités légales d’archivage,
                            d’obligations de conservation de certaines données
                            personnelles et/ou d’anonymisation.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            7. Quels sont les destinataires de vos données
                            personnelles ?
                        </h2>
                        <p>
                            {society} ne transmet jamais vos données
                            personnelles à des tiers susceptibles de les
                            utiliser à leurs propres fins et notamment à des
                            fins commerciales et/ou de publicité directe.
                        </p>
                        <p>
                            {society} peut être amenée à partager vos données
                            personnelles, seulement dans la mesure nécessaire,
                            avec :
                        </p>
                        <ul className='ml-5'>
                            <li>
                                <strong>
                                    Ses Prestataires Sous-traitants,
                                </strong>{' '}
                                pour l’exécution des tâches se rapportant aux
                                finalités décrites précédemment ;
                            </li>
                            <li>
                                <strong>Ses Prestataires partenaires,</strong>{' '}
                                auquel {society} pourrait confier l’exécution
                                d’une partie de sa mission de prestation de
                                services ;
                            </li>
                            <li>
                                <strong>Les autorités publiques :</strong>{' '}
                                {society} peut être contrainte de communiquer
                                vos données personnelles en réponse à une
                                demande spécifique formulée par une autorité
                                administrative ou judiciaire compétente, ainsi
                                que plus généralement dans toutes les situations
                                où la loi, la règlementation ou une décision
                                administrative ou judiciaire l’impose.
                            </li>
                            {/* [Ajouter le cas échéant des catégories de personnes à qui il transfère des données personnelles] */}
                        </ul>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            8. Comment est assuré le stockage de vos données
                            personnelles ?
                        </h2>
                        <p>
                            Vos données personnelles sont stockées soit dans les
                            bases de données de {society} soit dans celles de
                            ses Prestataires Sous-traitants.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            9. Comment est assurée la sécurité des données
                            personnelles ?
                        </h2>
                        <p>
                            {society} s’engage, dans le cadre de ses activités
                            et conformément à la Réglementation à assurer la
                            protection, la confidentialité et la sécurité des
                            données personnelles.
                        </p>
                        <p>
                            {society} prend les précautions nécessaires compte
                            tenu de l’état des connaissances, des coûts de mise
                            en œuvre et de la nature, de la portée, du contexte
                            et des finalités du Traitement ainsi que de la
                            probabilité de chaque risque afin de préserver la
                            sécurité et la confidentialité des données
                            personnelles que vous lui communiquez et notamment
                            empêcher qu’elles soient déformées, endommagées ou
                            communiquées à des tiers (sauf accord de votre
                            part).
                        </p>
                        <p>
                            Par conséquent, {society} met en œuvre toutes les
                            mesures techniques, d’ordre logique, physique et
                            organisationnel permettant de garantir un niveau de
                            sécurité adapté au risque et de prévenir toute
                            perte, altération, divulgation de données
                            personnelles ou accès à des tiers non autorisés.
                        </p>
                        <p>
                            Toutefois, compte tenu des caractéristiques
                            intrinsèques d’internet, toute transmission
                            d’informations par internet n’est pas totalement
                            sécurisée. Les données personnelles transmises à{' '}
                            {society} font l’objet de mesures qui ne peuvent
                            prémunir de tous les risques de détournement et/ou
                            piratage. La transmission de vos données
                            personnelles intervient donc à vos risques et
                            périls.
                        </p>
                        <p>
                            En cas de violation de données personnelles et
                            conformément à la Réglementation, {society} s’engage
                            à les notifier à la CNIL.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            10. {society} utilise-t-il des cookies ?
                        </h2>
                        <p>
                            Des cookies (« Cookies »), à savoir des petits
                            fichiers informatiques stockés sur le disque dur de
                            votre Terminal qui enregistrent certaines
                            informations dans le but de faciliter votre
                            expérience de navigation, sont déposés sur votre
                            Terminal lors de votre navigation sur le Site.
                        </p>
                        <p>{society} utilise les Cookies suivants :</p>
                        <ul className='ml-5'>
                            <li>
                                <strong>Des cookies fonctionnels :</strong> Ces
                                cookies sont requis pour les fonctionnalités
                                basiques du Site et sont par conséquent toujours
                                actifs. Ils servent notamment à :
                                <ul className='ml-5'>
                                    <li>
                                        - Adapter la présentation du Site aux
                                        préférences d’affichage de votre
                                        Terminal de consultation (langue
                                        utilisée, résolution d’affichage,
                                        système d’exploitation utilisé, etc.) ;
                                    </li>
                                    <li>
                                        - Mémoriser des informations relatives à
                                        vos identifiants ;
                                    </li>
                                    <li>
                                        - Vous offrir un accès à votre compte
                                        grâce à vos identifiants ;
                                    </li>
                                    <li>
                                        - Mettre en œuvre des mesures de
                                        sécurité, par exemple lorsqu’il vous est
                                        demandé de vous connecter à nouveau
                                        après une certaine durée écoulée.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>
                                    Des cookies de mesure d’audience
                                    (statistiques) :
                                </strong>{' '}
                                Les Cookies de mesure d'audience permettent de
                                comptabiliser les visites et les sources du
                                trafic afin que nous puissions améliorer
                                l’intérêt et l’ergonomie de notre site. Ils
                                aident {society} à savoir quelles pages sont les
                                plus ou les moins populaires, et à observer le
                                comportement des visiteurs sur le Site.
                            </li>
                            <li>
                                <strong>
                                    Des cookies de partage de réseaux sociaux :
                                </strong>{' '}
                                {society} vous offre la possibilité d’activer
                                des fonctionnalités permettant de partager des
                                contenus éditoriaux et n’importe quel type de
                                contenu publié sur le Site à travers les réseaux
                                sociaux. Les Cookies de réseaux sociaux sont
                                gérés par l’éditeur du site du réseau social.
                                Vous êtes invité à prendre connaissance de la
                                politique d’utilisation des réseaux sociaux sur
                                les sites concernés.
                            </li>
                            <li>
                                <strong>Des cookies de publicité :</strong>{' '}
                                {society} vous propose de consentir à
                                l’utilisation de cookies publicitaires sur le
                                Site. Ces cookies peuvent être mis en place au
                                sein du Site par des partenaires publicitaires.
                                Ils peuvent être ensuite utilisés par ces
                                sociétés pour vous proposer des publicités liées
                                aux produits de {society} sur d'autres sites
                                Web. Ils ne stockent pas directement des données
                                personnelles, mais sont basés sur
                                l'identification unique de votre navigateur et
                                de votre appareil Internet.
                            </li>
                        </ul>
                        {/* ATTENTION A BIEN RENSEIGNER LA LISTE DES COOKIES */}
                        <p>
                            Vous trouverez ci-dessous la liste précise des
                            cookies présents sur le Site :
                        </p>
                        <ul className='ml-5'>{cookieItems}</ul>
                        <p>
                            Seuls des cookies strictement nécessaires à la
                            fourniture du service et exemptés de consentement
                            peuvent être déposés sur votre Terminal lors de
                            votre navigation sur le Site.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            11. Comment pouvez-vous gérer/supprimer ces cookies
                            ?
                        </h2>
                        <p>
                            Tout paramétrage que vous pouvez entreprendre sera
                            susceptible de modifier votre navigation sur
                            internet et vos conditions d’accès à certains
                            services nécessitant l’utilisation de Cookies.
                        </p>
                        <p>
                            Vous ne vous exposez à aucun risque en acceptant le
                            recours à ce système. Les Cookies n’endommagent pas
                            votre Terminal.
                        </p>
                        <p>
                            L’enregistrement d’un Cookie dans un Terminal est
                            essentiellement subordonné à votre consentement.
                            Vous pouvez exprimer et modifier à tout moment et
                            gratuitement vos choix dans le logiciel de
                            navigation de votre Terminal.
                        </p>
                        <p>
                            Si vous avez accepté dans votre logiciel de
                            navigation l’enregistrement de Cookies, les Cookies
                            intégrés dans les pages et contenus que vous avez
                            consultés pourront être stockés temporairement –
                            sans pouvoir dépasser treize (13) mois – dans un
                            espace dédié de votre Terminal. Ils y seront
                            lisibles uniquement par leur émetteur.
                        </p>
                        <p>
                            Si vous ne voulez pas que des Cookies soit placés
                            sur votre Terminal, vous pouvez facilement les
                            limiter ou les supprimer en paramétrant votre
                            navigateur ou appareil mobile. Toutefois, vous ne
                            pourrez plus bénéficier d'un certain nombre de
                            fonctionnalités qui sont néanmoins nécessaires pour
                            naviguer dans certains espaces de notre Site.
                        </p>
                        <p>
                            Le cas échéant, nous déclinons toute responsabilité
                            pour les conséquences liées au fonctionnement
                            dégradé de nos Services résultant de l'impossibilité
                            pour nous d'enregistrer ou de consulter les Cookies
                            nécessaires à leur fonctionnement et que vous auriez
                            refusés ou supprimés.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            12. {society} opère-t-il un transfert des données
                            personnelles en dehors de l’Union européenne ?
                        </h2>
                        <p>
                            Vos données personnelles peuvent faire l’objet d’un
                            transfert à un Sous-Traitant de {society} situé en
                            dehors de l’Union européenne pour permettre à ce
                            dernier de fournir ses services (hébergeur de
                            données).
                        </p>
                        <p>
                            En cas de transferts, ces derniers sont
                            systématiquement fondés sur une décision
                            d’adéquation de la Commission européenne concernant
                            les pays assurant un niveau de protection adéquat.
                        </p>
                    </section>
                    <section>
                        {/* 13. Quels sont vos Droits ? */}
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            13. Quels sont vos droits ?
                        </h2>
                        <p>
                            {society} vous informe que vous bénéficiez, dans les
                            termes et conditions prévus à la Réglementation :
                        </p>
                        <ul className='ml-5'>
                            <li>
                                <strong>D’un droit d’information :</strong> vous
                                avez le droit de recevoir des informations
                                claires, transparentes et facilement
                                compréhensible sur la façon dont nous utilisons
                                vos informations et vos droits.
                            </li>
                            <li>
                                <strong>D’un droit d’accès :</strong> vous avez
                                accès aux données personnelles vous concernant
                                que {society} détient et traite.
                            </li>
                            <li>
                                <strong>D’un droit de rectification :</strong>{' '}
                                vous avez le droit de demander à {society} de
                                rectifier les informations vous concernant en
                                cas d’erreurs ou inexactitudes.
                            </li>
                            <li>
                                <strong>D’un droit d’opposition :</strong>{' '}
                                lorsque le Traitement est fondé sur les intérêts
                                légitimes de {society}, vous avez le droit de
                                vous opposer, pour des motifs légitimes, à un
                                Traitement de données personnelles. Veuillez
                                noter que ce droit d’opposition ne s’applique
                                pas si nos intérêts légitimes à poursuivre le
                                Traitement prévalent sur les vôtres.
                            </li>
                            <li>
                                <strong>
                                    D’un droit à la limitation du traitement :
                                </strong>{' '}
                                vous avez le droit de demander à {society} à ce
                                que certaines de vos données personnelles ne
                                soient pas conservées lors de traitements futurs
                                lorsque :
                                <ul className='ml-5'>
                                    <li>
                                        - Vous contestez l’exactitude de vos
                                        données personnelles ;
                                    </li>
                                    <li>
                                        - Vous considérez et pouvez établir que
                                        le Traitement des données personnelles
                                        est illicite et vous vous opposez à
                                        l’effacement des données personnelles et
                                        exigez à la place la limitation du
                                        Traitement ;
                                    </li>
                                    <li>
                                        - {society} n’a plus besoin de vos
                                        données personnelles mais que celles-ci
                                        vous sont encore nécessaires pour la
                                        constatation, l’exercice ou la défense
                                        des droits en justice ;
                                    </li>
                                    <li>
                                        - Vous vous opposez au Traitement qui
                                        serait fondé sur l’intérêt légitime de{' '}
                                        {society}, pendant la vérification
                                        portant sur le point de savoir si les
                                        motifs légitimes poursuivis par{' '}
                                        {society} prévalent sur ceux de la
                                        personne concernée.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>D’un droit à l’effacement :</strong>{' '}
                                sous réserve des exceptions prévues par la
                                Réglementation, vous avez le droit d’obtenir de{' '}
                                {society} l’effacement de vos données
                                personnelles, lorsque l’un des motifs suivants
                                s’applique :
                                <ul className='ml-5'>
                                    <li>
                                        - Vos données personnelles ne sont plus
                                        nécessaires au regard des finalités pour
                                        lesquelles elles ont été collectées ou
                                        autrement traitées ;
                                    </li>
                                    <li>
                                        - Vous souhaitez retirer votre
                                        consentement sur lequel était fondé le
                                        Traitement de vos données personnelles
                                        et il n’existe pas d’autre fondement
                                        justifiant ce traitement ;
                                    </li>
                                    <li>
                                        - Vous vous opposez au Traitement et il
                                        n’existe pas de motifs légitime
                                        impérieux pour le Traitement ou vous
                                        vous opposez à l’envoi de sollicitations
                                        commerciales ;
                                    </li>
                                    <li>
                                        - Vous considérez et pouvez établir que
                                        vos données personnelles ont fait
                                        l’objet d’un Traitement illicite ;
                                    </li>
                                    <li>
                                        - Vos données personnelles doivent être
                                        effacées en vertu d’une obligation
                                        légale.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>
                                    D’un droit à la portabilité de vos données :
                                </strong>{' '}
                                lorsque le Traitement est fondé sur votre
                                consentement ou un contrat, vous avez le droit
                                de recevoir de {society} les données
                                personnelles vous concernant dans un format
                                structuré, couramment utilisé, et de transmettre
                                ces données personnelles à un autre responsable
                                de traitement sans que {society} n’y fasse
                                obstacle.
                                <p>
                                    Lorsque cela est techniquement possible,
                                    vous pouvez demander que ces données
                                    personnelles soient directement transmises
                                    par {society} à un autre Responsable de
                                    traitement.
                                </p>
                            </li>
                            <li>
                                <strong>
                                    D’un droit de retirer son consentement :
                                </strong>{' '}
                                lorsque le Traitement est fondé sur votre
                                consentement, vous avez le droit de retirer
                                votre consentement, à tout moment, sans que{' '}
                                {society} ne puisse s’y opposer.
                            </li>
                            <li>
                                <strong>
                                    D’un droit de décider du sort de vos données
                                    personnelles après votre mort :
                                </strong>{' '}
                                Enfin, vous avez le droit d’organiser le sort de
                                vos données personnelles post-mortem par
                                l’adoption de directives générales ou
                                particulières. {society} s’engage à respecter
                                ces directives. En l’absence de directives,{' '}
                                {society} reconnait aux héritiers la possibilité
                                d’exercer certains droits, en particulier le
                                droit d’accès, s’il est nécessaire pour le
                                règlement de la succession du défunt ; et le
                                droit d’opposition pour procéder à la clôture
                                des comptes utilisateurs du défunt et s’opposer
                                au Traitement de leurs données.
                            </li>
                        </ul>
                        <p>
                            Vous pouvez exercer vos droits en adressant à{' '}
                            {society} un courriel à l’adresse suivante :{' '}
                            {email1}, accompagné d’une copie de votre pièce
                            d’identité.
                        </p>
                        <p>
                            Si, malgré les efforts de {society} pour préserver
                            la confidentialité de vos données personnelles, vous
                            vous estimez victime d’une violation de la
                            Réglementation, vous pouvez soumettre une
                            réclamation auprès de l’autorité nationale de
                            protection des données : Commission Nationale de
                            l’Informatique et des Libertés (CNIL), 3, place de
                            Fontenoy – TSA 80715 -75334 Paris CEDEX 07 (01 53 73
                            22 22 – www.cnil.fr). Vous avez également le droit
                            de solliciter réparation auprès des tribunaux
                            compétents si vous considérez que nous n’avons pas
                            respecté vos droits.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            14. Comment être informé d’un changement de notre
                            politique de confidentialité ?
                        </h2>
                        <p>
                            Vos données personnelles peuvent faire l’objet d’un
                            transfert à un Sous-Traitant de {society} situé en
                            dehors de l’Union européenne pour permettre à ce
                            dernier de fournir ses services (hébergeur de
                            données).
                        </p>
                        <p>
                            {society} se réserve la possibilité de modifier sa
                            politique de confidentialité. Toute modification de
                            la politique de Confidentialité sera publiée sur le
                            Site. Nous vous invitons à consulter régulièrement
                            la politique de Confidentialité. Toute souscription
                            à un service postérieurement à la date de
                            modification présume votre acceptation sans réserve
                            de la nouvelle politique de confidentialité ainsi
                            modifiée.
                        </p>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            15. Hébergement
                        </h2>
                        <ul className='ml-5'>
                            <li>
                                <strong>Nom de l'hébergeur :</strong> Vercel,
                                Inc.
                            </li>
                            <li>
                                <strong>Email de l'hébergeur :</strong> 340 S
                                Lemon Ave #4133 Walnut, CA 91789 USA.
                            </li>
                            <li>
                                <strong>Adresse de l'hébergeur :</strong>{' '}
                                support@vercel.com.
                            </li>
                            <li>
                                <strong>Site web de l'hébergeur :</strong>{' '}
                                Vercel.com.
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h2 className='text-2xl font-bold mt-16 mb-8'>
                            16. Réalisation, maintenance, et publication
                        </h2>
                        <ul className='ml-5'>
                            <li>
                                <strong>Réalisation :</strong>{' '}
                                <a href='https://benjamin-vallon.fr'>
                                    Benjamin VALLON
                                </a>{' '}
                                .
                            </li>
                            <li>
                                <strong>Maintenance :</strong>{' '}
                                <a href='https://benjamin-vallon.fr'>
                                    Benjamin VALLON
                                </a>
                                .
                            </li>
                            <li>
                                <strong>Responsable de la publication :</strong>{' '}
                                {lastName} {firstName}.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
