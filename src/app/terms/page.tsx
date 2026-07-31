import type { Metadata } from "next";

import {
  LegalBody,
  LegalNotice,
  LegalSection,
  PageHero,
} from "@/components/ui/page-shell";
import { mailto, site } from "@/lib/site";

/**
 * Initial website terms of use. Intentionally states no registered company
 * number, legal address or governing jurisdiction — those must be supplied by
 * the owner and reviewed by a qualified adviser before commercial launch.
 */
export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply to visitors of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

/** Fixed, human-readable effective date — not generated per request. */
const EFFECTIVE_DATE = "30 July 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Effective ${EFFECTIVE_DATE}`}
        title="Terms of Use"
        lede={`These terms apply to your use of the ${site.name} website.`}
      />

      <LegalBody>
        <LegalNotice>
          <p>
            This is an initial website policy published alongside the first
            version of this site. It is not a substitute for legal advice and
            requires review by a qualified legal adviser before commercial
            launch. Company registration details and governing law are not yet
            stated and will be added once confirmed.
          </p>
        </LegalNotice>

        <LegalSection heading="Purpose of this website">
          <p>
            This website is informational. It describes who {site.name} is, the
            kinds of software we build and how to get in touch. It is not a
            transactional platform: there is no account to create, nothing to
            purchase and no service delivered through these pages.
          </p>
          <p>
            Nothing on this site is an offer capable of acceptance, and browsing
            it does not create a client relationship. Paid work is carried out
            only under a separate written agreement covering scope,
            deliverables, fees, intellectual property and liability. Where such
            an agreement differs from these terms, that agreement governs the
            work.
          </p>
        </LegalSection>

        <LegalSection heading="Intellectual property">
          <p>
            The design, text, layout, code and visual treatment of this website
            belong to {site.name} unless stated otherwise. The {site.name} name
            and the NoorLife name are ours.
          </p>
          <p>
            You may read, link to and quote short extracts with attribution.
            Reproducing, republishing or adapting the site or substantial parts
            of its content — particularly for commercial purposes — requires our
            prior written permission.
          </p>
        </LegalSection>

        <LegalSection heading="Acceptable use">
          <p>You agree not to:</p>
          <ul>
            <li>
              attempt to gain unauthorised access to this site, its hosting
              environment or any connected system;
            </li>
            <li>
              probe, scan or test the vulnerability of the site without our
              written consent;
            </li>
            <li>
              interfere with normal operation, including through automated
              requests at a volume that degrades service for others;
            </li>
            <li>
              use the site to transmit malicious code or unlawful, deceptive or
              infringing material;
            </li>
            <li>
              misrepresent your identity or affiliation when contacting us; or
            </li>
            <li>
              collect information from the site for bulk unsolicited messaging.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="No professional advice">
          <p>
            The content here is general information about our services and
            approach. It is not technical, legal, financial, regulatory or other
            professional advice, and it should not be relied upon as such. You
            should obtain advice suited to your own circumstances before acting
            on anything you read here.
          </p>
        </LegalSection>

        <LegalSection heading="Third-party links">
          <p>
            Where we link to another website or service, we do so for
            convenience. We do not control those destinations and do not endorse
            them. We are not responsible for their content, availability,
            security or privacy practices.
          </p>
        </LegalSection>

        <LegalSection heading="NoorLife is under private development">
          <p>
            NoorLife is a product under private development by {site.name}.
          </p>
          <p>
            <strong>
              Public descriptions and visual concepts are intentionally limited
              and may not represent the final product.
            </strong>{" "}
            The visuals on this website are abstract and conceptual. They are not
            images of the application, and what NoorLife ultimately includes,
            how it works and where it is available may all change during
            development.
          </p>
          <p>
            <strong>No launch commitment is made.</strong> Nothing on this
            website is a promise that NoorLife will be released, that it will be
            released on any particular date, or that it will include any
            particular capability. No date is stated because none is committed.
          </p>
        </LegalSection>

        <LegalSection heading="NoorLife ownership and website artwork">
          <p>
            NoorLife, its name and its original design artwork are owned by their
            respective owner. Reproduction, redistribution or adaptation of this
            website&rsquo;s artwork, wording or branding is not permitted without
            written permission.
          </p>
          <p>
            To be clear about the limits of that: this protects our specific
            artwork, wording and branding only. It does not make general software
            ideas or categories legally exclusive to us, and others remain free
            to build their own products in the same general space.
          </p>
        </LegalSection>

        <LegalSection heading="Availability">
          <p>
            We provide this website on an &ldquo;as available&rdquo; basis. We
            may change, suspend, withdraw or restrict access to all or part of it
            at any time, with or without notice, including for maintenance. We do
            not guarantee uninterrupted or error-free access.
          </p>
        </LegalSection>

        <LegalSection heading="Disclaimer">
          <p>
            We aim to keep this website accurate and current, but we do not
            warrant that the content is complete, accurate or free of error, or
            that the site is free of harmful components.
          </p>
          <p>
            To the extent permitted by applicable law, the site and its content
            are provided without warranties of any kind, whether express or
            implied.
          </p>
        </LegalSection>

        <LegalSection heading="Limitation of liability">
          <p>
            To the fullest extent permitted by applicable law, {site.name} will
            not be liable for indirect, incidental, special or consequential loss
            arising from your use of this website, including loss of profit,
            revenue, data, business or goodwill.
          </p>
          <p>
            Nothing in these terms excludes or limits any liability that cannot
            lawfully be excluded or limited. Because the law on this differs
            between countries, the protections available to you may be broader
            than those described here, and this section is to be read as limited
            accordingly.
          </p>
        </LegalSection>

        <LegalSection heading="Changes to these terms">
          <p>
            We may revise these terms as the website develops. The effective
            date at the top of this page reflects the most recent revision, and
            continuing to use the site means you accept the current version.
          </p>
        </LegalSection>

        <LegalSection heading="Contact">
          <p>
            Questions about these terms can be sent to{" "}
            <a href={mailto}>{site.email}</a>.
          </p>
        </LegalSection>
      </LegalBody>
    </>
  );
}
