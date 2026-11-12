import { Head } from '@inertiajs/react'
import LegalPage, { ContactEmail } from '../../components/LegalPage'
import {
  COMPANY_ADDRESS,
  CONTACT_PHONE,
  LEGAL_COMPANY_NAME,
  PRIVACY_EFFECTIVE_DATE,
} from '../../utils/legal'

interface PrivacyPageProps {
  footer?: any
}

export default function PrivacyPage({ footer }: PrivacyPageProps) {
  return (
    <LegalPage title="Privacy Policy — Nasser Construction app" footer={footer}>
      <Head title="Privacy Policy" />

      <p>
        <strong>Effective date:</strong> {PRIVACY_EFFECTIVE_DATE}
      </p>

      <p>
        {LEGAL_COMPANY_NAME} ("Nasser Construction", "we", "us") provides the Nasser Construction
        mobile app and web panel (the "Service") to its employees and contractors to manage work
        orders, crews and work days. This policy explains what information the Service collects and
        how it is used.
      </p>

      <h2>Who can use the Service</h2>
      <p>
        The Service is for people who work with Nasser Construction. Accounts are created by a
        company administrator; you cannot sign up on your own. The Service is not directed to
        children under 13.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Account information:</strong> your name, email address, phone number, job position
          and role (administrator, supervisor or worker), entered by a company administrator or by
          you in your profile.
        </li>
        <li>
          <strong>Work records:</strong> the work orders and crews you are assigned to, your
          check-in and check-out times, the validation status of your work days, and notes, expenses
          and attachments you add to a work order.
        </li>
        <li>
          <strong>Photos:</strong> pictures you choose to take or select for a work order note, an
          expense or your profile. The app asks for camera or photo library permission only when you
          use those features.
        </li>
        <li>
          <strong>Device information:</strong> a push notification token, so we can send you
          notifications about your assignments and work days.
        </li>
        <li>
          <strong>Sign-in information:</strong> if you sign in with Google, we receive your email
          address from Google to match it with your existing account. We do not receive your Google
          password.
        </li>
        <li>
          <strong>Technical logs:</strong> the date, time, address and result of requests made to
          our servers, used to keep the Service secure and to fix errors.
        </li>
      </ul>
      <p>We do not collect your precise location, your contacts, or financial account details.</p>

      <h2>How we use information</h2>
      <p>
        We use this information only to operate the Service: to show you your assignments, record
        and validate work days, calculate labor costs, send notifications, keep an audit history of
        changes, and protect and troubleshoot the Service.
      </p>
      <p>
        We do not sell your information, we do not use it for advertising, and we do not track you
        across other companies' apps or websites.
      </p>

      <h2>Who can see your information</h2>
      <ul>
        <li>Company administrators can see the information described above.</li>
        <li>Supervisors can see the work records of the crews they supervise.</li>
        <li>
          Service providers that host the Service for us (servers, file storage, email delivery and
          push notification delivery) process information on our behalf and only to provide those
          services.
        </li>
        <li>We may disclose information if the law requires it.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep account and work records for as long as you work with Nasser Construction and
        afterwards for as long as needed for payroll, tax, legal and business records. Technical
        logs are kept for a limited time and then deleted.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>You can review and update your name, phone number and photo in your profile.</li>
        <li>
          You can turn off notifications and revoke camera or photo permissions in your device
          settings.
        </li>
        <li>
          To ask for a correction, a copy of your information, or the deactivation or deletion of
          your account, contact us at the address below. Some records may need to be kept where the
          law requires it.
        </li>
      </ul>

      <h2>Security</h2>
      <p>
        Access requires an account, connections to the Service are encrypted, and access to
        information is limited by role. No system is completely secure, but we work to protect your
        information.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy. The effective date above shows the latest version.</p>

      <h2>Contact</h2>
      <address className="not-italic">
        {LEGAL_COMPANY_NAME}
        <br />
        {COMPANY_ADDRESS}
        <br />
        <ContactEmail />
        {CONTACT_PHONE && (
          <>
            <br />
            {CONTACT_PHONE}
          </>
        )}
      </address>
    </LegalPage>
  )
}
