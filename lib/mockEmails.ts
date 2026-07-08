import { Email } from './types'

export const mockEmails: Email[] = [
  {
    id: 'email-1',
    from: 'Microsoft Security Team',
    senderDomain: 'security@microsoft-support.net',
    to: 'you@akfung.com',
    subject: 'Action Required: Verify Your Microsoft Account',
    body: `Dear User,

We detected unusual activity on your Microsoft account. 

To prevent account suspension, please verify your identity within 24 hours.

Click here to verify: [Verify Your Account](http://security-microsoft.net/verify)

If you did not request this, please ignore this email.

Thank you,
Microsoft Security Team`,
    timestamp: '09:15 AM',
    attachments: [
      {
        name: 'Account_Verification_Form.html',
        size: 125,
        type: 'HTML',
        suspicious: true,
        details: 'File contains form requesting login credentials',
      },
    ],
    isLegitimate: false,
    threat: 'phishing',
    clues: {
      senderProfile:
        'Domain is suspicious - microsoft-support.net instead of microsoft.com. Legitimate Microsoft uses @microsoft.com domains.',
      linkDetails: [
        'Link points to security-microsoft.net - mimics official domain but slightly different',
        'No tracking or legitimate Microsoft URL patterns found',
      ],
      attachmentAnalysis:
        'HTML file requesting login credentials is a major red flag. Microsoft does not send credentials requests via email.',
      languageAnalysis:
        'Urgent tone with 24-hour deadline is a common phishing tactic. Grammar is mostly correct but formal tone seems off.',
      contextAnalysis:
        'You did not initiate any account activity. The "unusual activity" claim is vague and unspecific.',
      requestAnalysis:
        'Requesting account verification credentials via email is never legitimate. Real Microsoft uses secure portals.',
    },
  },
  {
    id: 'email-2',
    from: 'HR Department',
    senderDomain: 'hr@akfung.com',
    to: 'you@akfung.com',
    subject: 'Updated Benefits Information',
    body: `Hi,

We've updated our benefits package for this year. Please review the new information in the attached PDF.

Best regards,
HR Department`,
    timestamp: '08:50 AM',
    attachments: [
      {
        name: 'Benefits_2024.pdf',
        size: 450,
        type: 'PDF',
        suspicious: false,
        details: 'Standard company benefits document',
      },
    ],
    isLegitimate: true,
    threat: 'legitimate',
    clues: {
      senderProfile:
        'Sender is from company domain (@akfung.com) and HR is a legitimate department.',
      linkDetails: [],
      attachmentAnalysis: 'PDF file from HR containing expected company benefits information.',
      languageAnalysis: 'Professional and calm tone, appropriate for HR communication.',
      contextAnalysis:
        'Benefits updates are a normal annual occurrence. You work for this company.',
      requestAnalysis:
        'No request for sensitive information or unusual actions. Just asking to review policy.',
    },
  },
  {
    id: 'email-3',
    from: 'Jason Lee',
    senderDomain: 'jlee@akfung.com',
    to: 'you@akfung.com',
    subject: 'Q3 Marketing Plan',
    body: `Hey,

Can you review the Q3 marketing plan? I've attached the latest draft. Let me know if you have any feedback.

Thanks!
Jason`,
    timestamp: '08:30 AM',
    attachments: [
      {
        name: 'Q3_Marketing_Plan.docx',
        size: 280,
        type: 'Word Document',
        suspicious: false,
        details: 'Company document shared internally',
      },
    ],
    isLegitimate: true,
    threat: 'legitimate',
    clues: {
      senderProfile:
        'Jason Lee is a known colleague from marketing department. Email from company domain.',
      linkDetails: [],
      attachmentAnalysis: 'Standard Word document with marketing plan - normal business file.',
      languageAnalysis: 'Casual, friendly tone. Typical of internal colleague communication.',
      contextAnalysis:
        'You work in marketing. Q3 planning is an expected business activity.',
      requestAnalysis:
        'Simple request for feedback on work document. No suspicious requests.',
    },
  },
  {
    id: 'email-4',
    from: 'PayPal Alert',
    senderDomain: 'alert@paypal-secure.com',
    to: 'you@akfung.com',
    subject: 'Unusual Login Detected - Confirm Your Identity',
    body: `Your PayPal account has experienced an unusual login attempt from an unfamiliar location.

For your account security, we require immediate verification.

[Confirm Identity Now](http://paypal-secure.com/verify-identity)

This link will expire in 1 hour.

PayPal Security Team`,
    timestamp: '07:45 AM',
    attachments: [],
    isLegitimate: false,
    threat: 'phishing',
    clues: {
      senderProfile:
        'Domain is alert@paypal-secure.com - real PayPal uses @paypal.com. The fake domain uses a common pattern to appear legitimate.',
      linkDetails: [
        'Link goes to paypal-secure.com instead of paypal.com',
        'No official PayPal branding or secure routing in URL',
      ],
      attachmentAnalysis: 'No attachments, but the verification link is the attack vector.',
      languageAnalysis:
        'Creates artificial urgency with "1 hour" deadline. PayPal would never use this tactic.',
      contextAnalysis:
        'You may not have PayPal account, or this could be sent to many addresses randomly.',
      requestAnalysis:
        'Asking to verify identity via link is a phishing red flag. Real PayPal directs to official site.',
    },
  },
  {
    id: 'email-5',
    from: 'System Notification',
    senderDomain: 'notification@akfung.com',
    to: 'you@akfung.com',
    subject: 'Password will expire soon',
    body: `Your network password will expire in 7 days.

To reset your password securely, please visit:
https://akfung.com/portal/reset-password

Use your employee ID and current password to authenticate.

IT Support`,
    timestamp: 'Yesterday',
    attachments: [],
    isLegitimate: true,
    threat: 'legitimate',
    clues: {
      senderProfile:
        'Notification from company notification system using official @akfung.com domain.',
      linkDetails: [
        'Link is to official company domain (akfung.com)',
        'Uses HTTPS for secure connection',
        'Path follows standard company portal naming',
      ],
      attachmentAnalysis: 'No attachments needed for password reset notification.',
      languageAnalysis:
        'Professional, clear instructions. Standard security protocol messaging.',
      contextAnalysis:
        'Password expiration notifications are normal company security policy.',
      requestAnalysis:
        'Legitimate request to reset password through official company portal.',
    },
  },
  {
    id: 'email-6',
    from: 'Apple Support',
    senderDomain: 'support@apple-verify.com',
    to: 'you@akfung.com',
    subject: 'Your Apple ID requires verification',
    body: `Dear Apple ID User,

We've detected a login attempt from a new device. To protect your account, please verify your identity immediately.

[Verify Now](http://apple-verify.com/secure-verify)

This action is required within 24 hours.

Apple Security Team`,
    timestamp: '10:20 AM',
    attachments: [],
    isLegitimate: false,
    threat: 'phishing',
    clues: {
      senderProfile:
        'Domain is apple-verify.com instead of apple.com. Suspicious subdomain pattern.',
      linkDetails: [
        'Link points to apple-verify.com instead of apple.com',
        'No official Apple security protocols in URL',
      ],
      attachmentAnalysis: 'No attachments, but verification link is suspicious.',
      languageAnalysis:
        'Urgent 24-hour deadline creates artificial pressure. Apple typically directs to settings.',
      contextAnalysis:
        'Unusual to require Apple ID verification for company email account.',
      requestAnalysis:
        'Requesting identity verification through email link is not Apple standard practice.',
    },
  },
  {
    id: 'email-7',
    from: 'Internal System',
    senderDomain: 'noreply@akfung.com',
    to: 'you@akfung.com',
    subject: 'Monthly Security Audit Complete',
    body: `Your monthly security audit has been completed. All systems are operating normally.

Please review the attached report for details.

IT Security Team`,
    timestamp: '09:50 AM',
    attachments: [
      {
        name: 'Security_Audit_Report.pdf',
        size: 320,
        type: 'PDF',
        suspicious: false,
        details: 'Standard monthly security report',
      },
    ],
    isLegitimate: true,
    threat: 'legitimate',
    clues: {
      senderProfile:
        'Email from company noreply system using official @akfung.com domain.',
      linkDetails: [],
      attachmentAnalysis: 'PDF attachment is legitimate security report from IT department.',
      languageAnalysis: 'Professional and reassuring tone. Standard IT communication format.',
      contextAnalysis:
        'Monthly security audits are normal company procedure.',
      requestAnalysis:
        'No requests for sensitive information. Just providing audit results.',
    },
  },
  {
    id: 'email-8',
    from: 'Unknown Sender',
    senderDomain: 'info@business-opportunity.net',
    to: 'you@akfung.com',
    subject: 'Exclusive Business Opportunity - Invest Now',
    body: `Hello,

We have an exclusive investment opportunity that could yield 500% returns!

To learn more and secure your spot, please reply with:
- Your full name
- Date of birth
- Bank account information

Limited spots available!

Business Opportunities Ltd.`,
    timestamp: '08:15 AM',
    attachments: [],
    isLegitimate: false,
    threat: 'phishing',
    clues: {
      senderProfile:
        'Unknown sender from generic domain. Typical of spam and phishing campaigns.',
      linkDetails: [],
      attachmentAnalysis: 'No attachments, but request for personal banking info is red flag.',
      languageAnalysis:
        'Unrealistic returns claim and artificial scarcity ("limited spots") are classic scam tactics.',
      contextAnalysis:
        'Unsolicited business opportunity sent to company email.',
      requestAnalysis:
        'Requesting personal and financial information via email is a major phishing indicator.',
    },
  },
  {
    id: 'email-9',
    from: 'Finance Department',
    senderDomain: 'finance@akfung.com',
    to: 'you@akfung.com',
    subject: 'Expense Report Submission Required',
    body: `Hi,

Please submit your expense reports for the month of July by end of business Friday.

Use the attached expense template and email to finance@akfung.com.

Thank you!
Finance Team`,
    timestamp: '07:30 AM',
    attachments: [
      {
        name: 'Expense_Report_Template.xlsx',
        size: 85,
        type: 'Excel',
        suspicious: false,
        details: 'Standard company expense report form',
      },
    ],
    isLegitimate: true,
    threat: 'legitimate',
    clues: {
      senderProfile:
        'Email from company Finance department using official @akfung.com domain.',
      linkDetails: [],
      attachmentAnalysis: 'Excel template is legitimate company form for expense reporting.',
      languageAnalysis: 'Professional, clear instructions with reasonable deadline.',
      contextAnalysis:
        'Monthly expense reporting is normal company procedure.',
      requestAnalysis:
        'Standard request for employees to submit required business expenses.',
    },
  },
  {
    id: 'email-10',
    from: 'CEO Office',
    senderDomain: 'ceo@akfung.com',
    to: 'you@akfung.com',
    subject: 'Urgent: Update Your W-2 Information',
    body: `Dear Employee,

Please update your W-2 information immediately by clicking below.

Your current information appears incomplete in our system.

[Update W-2 Now](http://w2-update.org/secure-form)

This must be completed by EOD today.

HR Department`,
    timestamp: '06:45 AM',
    attachments: [],
    isLegitimate: false,
    threat: 'phishing',
    clues: {
      senderProfile:
        'Email claims to be from CEO but uses generic language. Real CEO emails are personalized.',
      linkDetails: [
        'Link points to w2-update.org instead of company domain',
        'Suspicious domain unrelated to company',
      ],
      attachmentAnalysis: 'No attachments, but link is clearly phishing.',
      languageAnalysis:
        'Artificial urgency with "EOD today" deadline. Companies typically allow more time for W-2 updates.',
      contextAnalysis:
        'W-2 updates would come from HR with company domain, not suspicious external link.',
      requestAnalysis:
        'Companies never request W-2 updates via email links. This is a classic tax-season phishing attack.',
    },
  },
]

export const verificationContacts = [
  {
    id: 'it',
    name: 'IT Support',
    role: 'Technical Support',
    canHelp: [
      'Verify if a link is legitimate',
      'Check if attachments are safe',
      'Confirm company domains and email systems',
      'Provide information about phishing indicators',
    ],
  },
  {
    id: 'supervisor',
    name: 'Your Supervisor',
    role: 'Manager',
    canHelp: [
      'Confirm if work is expected from colleagues',
      'Verify company policies and procedures',
      'Provide context about business requests',
    ],
  },
  {
    id: 'hr',
    name: 'HR Department',
    role: 'Human Resources',
    canHelp: [
      'Confirm HR communications and benefits updates',
      'Verify company policies',
      'Confirm personnel-related requests',
    ],
  },
  {
    id: 'finance',
    name: 'Finance Department',
    role: 'Finance',
    canHelp: [
      'Verify payment requests and invoices',
      'Confirm financial communications',
      'Verify account information requests',
    ],
  },
  {
    id: 'sender',
    name: 'Contact Sender Directly',
    role: 'Direct Communication',
    canHelp: [
      'Verify if sender actually sent the email',
      'Confirm requests through alternative channel',
      'Ask about suspicious content directly',
    ],
  },
]
