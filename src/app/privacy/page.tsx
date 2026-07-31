import type { Metadata } from "next";

import { LegalBody, LegalSection, PageHero } from "@/components/ui/page-shell";
import { mailto, site } from "@/lib/site";

/**
 * Initial privacy policy for the marketing website. Every statement below
 * describes how this site actually behaves today: no accounts, no cookies, no
 * analytics, and enquiries handled over email.
 *
 * Deliberately claims no formal compliance certification (GDPR, HIPAA, ISO,
 * SOC 2 or otherwise).
 *
 * TODO (NK Digital Works): add the registered legal entity name and address,
 * and have the wording reviewed before commercial launch.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles information collected through this website and through project enquiries sent by email.`,
  alternates: { canonical: "/privacy" },
};

/** Fixed, human-readable effective date — not generated per request. */
const EFFECTIVE_DATE = "30 July 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow={`Effective ${EFFECTIVE_DATE}`}
        title="Privacy Policy"
        lede={`This policy explains what information ${site.name} collects through this website, why we collect it and how it is handled.`}
      />

      <LegalBody>
        <LegalSection heading="Summary">
          <p>In this first version of the website:</p>
          <ul>
            <li>we do not create or offer website accounts;</li>
            <li>we do not sell personal information;</li>
            <li>
              we do not intentionally use advertising or cross-site tracking
              technology;
            </li>
            <li>
              we may process information you voluntarily send us by email;
            </li>
            <li>
              we may receive standard hosting and security logs from our
              infrastructure provider; and
            </li>
            <li>
              we may link to third-party services that have their own privacy
              practices.
            </li>
          </ul>
          <p>
            This policy covers this website only. NoorLife will have its own
            product-specific privacy policy, published before it is made
            publicly available.
          </p>
        </LegalSection>

        <LegalSection heading="Information we collect">
          <p>We keep collection to the minimum needed to run the site and reply to enquiries.</p>
          <ul>
            <li>
              <strong>Information you send us.</strong> This site has no forms.
              Its contact buttons open a pre-filled draft in your own email
              application, so we only ever receive what you choose to write and
              send — typically your name, email address and your message.
            </li>
            <li>
              <strong>Hosting and security logs.</strong> Our hosting provider
              records standard technical information such as IP address, request
              time, requested URL, referrer and user agent. These logs exist for
              security, abuse prevention and reliability.
            </li>
          </ul>
          <p>
            <strong>No accounts.</strong> There is no sign-up, login or user
            profile on this website, so we hold no credentials or account
            history.
          </p>
          <p>
            <strong>No mailing list system.</strong> There is no subscription
            service behind this page. If you ask to be kept informed about
            NoorLife, we record that request in our own email records only.
          </p>
        </LegalSection>

        <LegalSection heading="Cookies and tracking">
          <p>
            This website sets no cookies of its own, and we do not intentionally
            include advertising trackers, cross-site tracking pixels or
            behavioural profiling scripts. We run no analytics product on this
            version of the site.
          </p>
          <p>
            Fonts are served from our own domain rather than a third-party font
            service, so simply loading a page does not send a request to another
            company.
          </p>
        </LegalSection>

        <LegalSection heading="How we use information">
          <p>We use the information you send us to:</p>
          <ul>
            <li>reply to your enquiry and discuss the work you described;</li>
            <li>
              prepare proposals, estimates and agreements where a project moves
              forward;
            </li>
            <li>keep a reasonable record of our correspondence; and</li>
            <li>
              operate, secure and troubleshoot this website.
            </li>
          </ul>
          <p>
            We do not use enquiry details for unrelated marketing, and we do not
            sell or rent personal information to anyone.
          </p>
        </LegalSection>

        <LegalSection heading="Sharing and service providers">
          <p>
            We rely on service providers to operate — website hosting, domain
            services and email. These providers process information on our
            behalf and only as needed to deliver their service to us.
          </p>
          <p>
            Beyond that, we do not share your information unless you ask us to,
            or unless we are required to by law or legal process, or where it is
            necessary to protect our rights, safety or systems.
          </p>
        </LegalSection>

        <LegalSection heading="Third-party links">
          <p>
            This site may link to third-party websites or services. We do not
            control them and are not responsible for their content or privacy
            practices. Review the privacy policy of any third-party service
            before providing information to it.
          </p>
        </LegalSection>

        <LegalSection heading="Retention">
          <p>
            We keep enquiry correspondence for as long as it remains relevant to
            an active or prospective engagement, and for a reasonable period
            afterwards for business and record-keeping purposes. Hosting and
            security logs are retained by our provider for a limited period
            under their own schedule. If you would like your enquiry deleted
            sooner, ask us and we will remove it.
          </p>
        </LegalSection>

        <LegalSection heading="Security">
          <p>
            We apply reasonable technical and organisational measures to protect
            information in our care, including serving this site over HTTPS and
            limiting access to enquiry correspondence to those who need it.
          </p>
          <p>
            No method of transmission or storage is completely secure, and we
            cannot guarantee absolute security. Please do not send credentials,
            payment details or other sensitive material by email.
          </p>
        </LegalSection>

        <LegalSection heading="International processing">
          <p>
            Our hosting and email providers may store or process information on
            servers located in countries other than your own. Where that
            happens, the information remains subject to this policy and to the
            contractual terms we hold with those providers. If you would prefer
            not to have your information handled this way, please do not send it
            to us by email.
          </p>
        </LegalSection>

        <LegalSection heading="Your choices">
          <p>You are in control of what you send us. You can:</p>
          <ul>
            <li>
              choose not to contact us, or share only the details you are
              comfortable including in your own email;
            </li>
            <li>
              ask us for a copy of the enquiry correspondence we hold about you;
            </li>
            <li>ask us to correct information that is inaccurate; and</li>
            <li>ask us to delete your enquiry from our records.</li>
          </ul>
          <p>
            Write to <a href={mailto}>{site.email}</a> and we will respond.
            Depending on where you live, local law may give you further rights;
            we will honour those that apply to you.
          </p>
        </LegalSection>

        <LegalSection heading="Children's privacy">
          <p>
            This website is intended for businesses and other organisations. It
            is not directed at children, and we do not knowingly collect
            information from children through it. If you believe a child has
            sent us information, contact us and we will delete it.
          </p>
        </LegalSection>

        <LegalSection heading="Changes to this policy">
          <p>
            We may update this policy as the website or our practices change.
            The effective date at the top of this page reflects the most recent
            revision. Material changes will be reflected here before they take
            effect.
          </p>
        </LegalSection>

        <LegalSection heading="Contact">
          <p>
            For privacy questions or requests, email{" "}
            <a href={mailto}>{site.email}</a>.
          </p>
        </LegalSection>
      </LegalBody>
    </>
  );
}
