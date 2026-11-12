import { Head } from '@inertiajs/react'
import LegalPage, { ContactEmail } from '../../components/LegalPage'
import { CONTACT_PHONE, LEGAL_COMPANY_NAME } from '../../utils/legal'

interface SupportPageProps {
  footer?: any
}

export default function SupportPage({ footer }: SupportPageProps) {
  return (
    <LegalPage title="Nasser Construction app — Support" footer={footer}>
      <Head title="Support" />

      <h2>About the app</h2>
      <p>
        The Nasser Construction app is the internal tool that {LEGAL_COMPANY_NAME} provides to its
        employees and contractors. It is used to see the work orders and crews you are assigned to,
        check in and out of your work days, and add notes, expenses and photos to a work order.
      </p>

      <h2>Getting an account</h2>
      <p>
        Accounts are created by a company administrator. You cannot sign up on your own from the
        app. If you work with Nasser Construction and do not have an account yet, ask your
        supervisor or a company administrator to create one for you, then sign in with the email
        address they registered.
      </p>

      <h2>Forgot your password?</h2>
      <p>You can reset your password from the app:</p>
      <ol>
        <li>
          On the sign-in screen, tap <strong>Forgot your password?</strong>
        </li>
        <li>Enter the email address of your account.</li>
        <li>We will email you a 6-digit code. Enter it in the app.</li>
        <li>Choose your new password and confirm it.</li>
        <li>Sign in with your new password.</li>
      </ol>
      <p>
        If the email does not arrive, check your spam folder and make sure you entered the same
        email address your administrator registered for you.
      </p>

      <h2>Contact us</h2>
      <p>
        If you still need help, or have a question about your account or your information, write to
        us at <ContactEmail />
        {CONTACT_PHONE && <> or call {CONTACT_PHONE}</>}. Please include your name and a short
        description of the problem.
      </p>
      <p>
        See also our{' '}
        <a href="/privacy" className="font-medium text-navy-900 underline">
          Privacy Policy
        </a>
        .
      </p>
    </LegalPage>
  )
}
