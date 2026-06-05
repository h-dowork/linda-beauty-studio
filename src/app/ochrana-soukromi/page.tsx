import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zásady ochrany soukromí | Linda Beauty Studio",
  description: "Informace o zpracování osobních údajů dle GDPR. Privacy policy for Linda Beauty Studio.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
        >
          ← Zpět na hlavní stránku
        </Link>

        <h1
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Zásady ochrany soukromí
        </h1>
        <p className="text-sm text-gray-400 mb-10">Naposledy aktualizováno: 5. června 2026 · Platnost od: 1. června 2025 · Privacy Policy (EN summary at the bottom)</p>

        <div className="prose prose-gray max-w-none text-sm sm:text-base leading-relaxed text-gray-700 space-y-8">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Správce osobních údajů</h2>
            <p>
              Správcem osobních údajů je <strong>Linda Beauty Studio</strong> (dále jen „Studio"),
              provozované na adrese <strong>28. října 857/20, 415 01 Teplice, Česká republika</strong>.{" "}
              {/* TODO before launch: fill in IČO — required by Act 480/2004 §10 */}
              IČO: <strong>[doplnit před spuštěním]</strong>.{" "}
              Kontakt: prostřednictvím formuláře na webu nebo přes Facebook stránku Studia.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Jaké osobní údaje zpracováváme</h2>
            <p>Při vyplnění rezervačního formuláře na tomto webu zpracováváme:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-600">
              <li>Jméno a příjmení</li>
              <li>E-mailová adresa</li>
              <li>Telefonní číslo (nepovinné)</li>
              <li>Požadovaná služba (nepovinné)</li>
              <li>Text zprávy / dotazu</li>
            </ul>
            <p className="mt-3">
              Tyto údaje jsou přenášeny do aplikace Facebook Messenger (Meta Platforms, Inc.) pro
              účely přímé komunikace a potvrzení termínu.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Účel a právní základ zpracování</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900">Účel</th>
                  <th className="text-left py-2 font-semibold text-gray-900">Právní základ (GDPR čl. 6)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 pr-4">Vyřízení rezervace / dotazu</td>
                  <td className="py-2">Oprávněný zájem (čl. 6 odst. 1 písm. f))</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Prevence zneužití (ochrana před spamem)</td>
                  <td className="py-2">Oprávněný zájem (čl. 6 odst. 1 písm. f))</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Přenos údajů třetím stranám</h2>
            <p>
              Vyplněním formuláře jsou vaše údaje předány aplikaci <strong>Facebook Messenger</strong>{" "}
              (Meta Platforms, Inc., USA). Meta zpracovává tyto údaje dle vlastních zásad ochrany
              soukromí dostupných na{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900"
              >
                facebook.com/privacy/policy
              </a>
              . Přenos mimo EU probíhá na základě standardních smluvních doložek schválených
              Evropskou komisí.
            </p>
            <p className="mt-3">
              Na stránce kontaktu je integrována mapa <strong>Google Maps</strong> (Google LLC, USA),
              která se načte pouze po vašem výslovném souhlasu (kliknutím na tlačítko „Zobrazit polohu
              na Google Maps"). Při načtení mapy mohou být přeneseny vaše technické údaje (IP adresa)
              na servery Google. Google zpracovává tyto údaje dle vlastních{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900"
              >
                zásad ochrany soukromí
              </a>
              . Přenos mimo EU probíhá na základě standardních smluvních doložek.
            </p>
            <p className="mt-2">Vaše údaje neprodáváme ani neposkytujeme jiným třetím stranám.</p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Doba uchovávání</h2>
            <p>
              Formulářová data zadaná prostřednictvím rezervačního formuláře jsou přenášena
              výhradně do aplikace <strong>Facebook Messenger</strong> a nejsou ukládána na
              serverech tohoto webu. Zprávy v aplikaci Messenger podléhají zásadám uchovávání
              Meta Platforms. Pro ochranu před zneužitím (spam) zpracováváme IP adresy dočasně
              po dobu maximálně <strong>15 minut</strong>.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Vaše práva</h2>
            <p>Dle GDPR máte tato práva:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 text-gray-600">
              <li><strong className="text-gray-800">Právo na přístup</strong> — máte právo vědět, jaké údaje o vás zpracováváme.</li>
              <li><strong className="text-gray-800">Právo na opravu</strong> — máte právo na opravu nepřesných údajů.</li>
              <li><strong className="text-gray-800">Právo na výmaz</strong> — za podmínek GDPR můžete požádat o smazání svých údajů.</li>
              <li><strong className="text-gray-800">Právo na omezení zpracování</strong> — v určitých případech můžete požádat o omezení zpracování.</li>
              <li><strong className="text-gray-800">Právo na přenositelnost</strong> — máte právo obdržet své údaje ve strojově čitelném formátu.</li>
              <li><strong className="text-gray-800">Právo vznést námitku</strong> — proti zpracování na základě oprávněného zájmu.</li>
            </ul>
            <p className="mt-3">
              Pro uplatnění práv nás kontaktujte e-mailem na{" "}
              <a href="mailto:do.official@proton.me" className="underline hover:text-gray-900">
                do.official@proton.me
              </a>
              , prostřednictvím formuláře na{" "}
              <Link href="/#contact" className="underline hover:text-gray-900">
                hlavní stránce
              </Link>
              , nebo přes naši Facebook stránku.
            </p>
            <p className="mt-2">
              Máte také právo podat stížnost u dozorového orgánu:{" "}
              <a
                href="https://www.uoou.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900"
              >
                Úřad pro ochranu osobních údajů (ÚOOÚ)
              </a>
              , Pplk. Sochora 27, 170 00 Praha 7.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Soubory cookie</h2>
            <p>Tento web používá výhradně <strong>nezbytné soubory cookie a úložiště</strong>:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-600">
              <li>
                <strong className="text-gray-800">linda_cookie_accepted</strong> — uloží vaše potvrzení
                zobrazené informace o cookies (localStorage, platnost: trvalá do smazání).
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-gray-800">Google Maps (volitelné):</strong> Mapa na stránce kontaktu
              se načítá pouze po vašem výslovném souhlasu. Při načtení může Google LLC ukládat vlastní
              soubory cookie (např. <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">CONSENT</code>,{" "}
              <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">NID</code>). Souhlas lze kdykoli
              odvolat obnovením stránky bez kliknutí na mapu.
            </p>
            <p className="mt-2">
              Nepoužíváme analytické, sledovací ani marketingové cookies. Na webu nejsou integrovány
              žádné reklamní sítě.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Bezpečnost</h2>
            <p>
              Webové stránky jsou provozovány s šifrovaným přenosem (HTTPS). Komunikace přes
              formulář je chráněna omezením počtu požadavků (rate limiting) pro prevenci zneužití.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Změny těchto zásad</h2>
            <p>
              Vyhrazujeme si právo tyto zásady aktualizovat. O podstatných změnách budeme
              informovat prostřednictvím oznámení na webu. Datum poslední aktualizace je uveden
              v záhlaví tohoto dokumentu.
            </p>
          </section>

          {/* EN summary */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Privacy Policy — English Summary</h2>
            <p className="text-gray-600">
              <strong className="text-gray-800">Data controller:</strong> Linda Beauty Studio, Teplice, Czech Republic.
            </p>
            <p className="mt-2 text-gray-600">
              <strong className="text-gray-800">Data collected:</strong> Name, email, optional phone and service preference,
              and your message — submitted via the contact form and forwarded to Facebook Messenger to process your appointment request.
            </p>
            <p className="mt-2 text-gray-600">
              <strong className="text-gray-800">Legal basis:</strong> Legitimate interest (GDPR Art. 6(1)(f)).
            </p>
            <p className="mt-2 text-gray-600">
              <strong className="text-gray-800">Retention:</strong> Form data is forwarded directly to Facebook Messenger and is not stored on our servers. IP addresses are held transiently (up to 15 minutes) for spam prevention only.
            </p>
            <p className="mt-2 text-gray-600">
              <strong className="text-gray-800">Third parties:</strong> Meta Platforms (Facebook Messenger)
              for booking communication. Google LLC (Google Maps) — map embed loaded only on explicit user
              consent via a click-to-load gate. Data is not sold or shared with other parties.
            </p>
            <p className="mt-2 text-gray-600">
              <strong className="text-gray-800">Your rights:</strong> Access, rectification, erasure, restriction,
              portability, and objection under GDPR. Contact us at{" "}
              <a href="mailto:do.official@proton.me" className="underline hover:text-gray-900">
                do.official@proton.me
              </a>
              , via the website form, or our Facebook page.
              You may also lodge a complaint with the Czech Data Protection Authority (ÚOOÚ) at{" "}
              <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">
                uoou.cz
              </a>.
            </p>
            <p className="mt-2 text-gray-600">
              <strong className="text-gray-800">Cookies:</strong> Essential only (localStorage banner dismiss).
              Google Maps sets its own cookies if you choose to load the map. No tracking or analytics cookies.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 cursor-pointer"
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  );
}
