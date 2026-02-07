import { Mail, ShieldCheck, Code2, ListChecks } from "lucide-react";
// Local Card components (no shadcn/ui dependency)
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-800 bg-slate-900 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default function ApiDocs() {
    const appId=process.env.REACT_APP_SERVER_APP_ID;
    const apiBaseUrl=process.env.REACT_APP_BASE_URL;
    const postManCollectionLink="https://www.postman.com/cloudy-crescent-770366/workspace/public-api/collection/18039051-03b21a40-4149-4b0e-80e1-b14b8f831bb6?action=share&creator=18039051"
  return (
    <div className=" text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Email Notification API – Organization Guide</h1>
          <p className="text-slate-400">
            Follow these steps to register your organization, configure email credentials, and start sending notifications.
          </p>
        </header>

        {/* Step 1 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <ListChecks className="w-5 h-5" /> Step 1: Create Organization Account
            </div>
            <p className="text-slate-300">Create an organization account using the signup API.</p>
            <p className="text-slate-400 text-sm">Required Header:</p>
            <pre className="bg-black rounded-xl p-4 text-sm">{`app-id: ${appId}`}</pre>
            <pre className="bg-black rounded-xl p-4 text-sm overflow-x-auto">{`POST ${apiBaseUrl}/auth/organizations/signup

{
  "name": "monstartX",
  "emailId": "souravXXX@gmail.com",
  "password": "123456"
}`}</pre>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <ShieldCheck className="w-5 h-5" /> Step 2: Create Email Credentials
            </div>
            <p className="text-slate-300">Configure email credentials that will be used to send notifications.</p>
            <p className="text-slate-400 text-sm">Required Headers:</p>
            <pre className="bg-black rounded-xl p-4 text-sm">{`app-id: ${appId}
secret-key: YOUR_SECRET_KEY
Authorization: Bearer YOUR_TOKEN`}</pre>
            <pre className="bg-black rounded-xl p-4 text-sm overflow-x-auto">{`POST ${apiBaseUrl}/organizations/credentials

{
  "emailUserName": "sourav@gmail.com",
  "emailPassword": "password",
  "emailRateLimit": 10,
  "notificationSendPercent": {
    "immediate": 60,
    "failed": 40
  }
}`}</pre>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Code2 className="w-5 h-5" /> Step 3: List Organization Credentials
            </div>
            <p className="text-slate-300">Retrieve all email credentials linked to your organization.</p>
            <pre className="bg-black rounded-xl p-4 text-sm overflow-x-auto">{`GET ${apiBaseUrl}/organizations/credentials

Response:
{
  "_id": "6982041d812e8f26e253be2f",
  "emailUserName": "souravdashd3@gmail.com",
  "emailRateLimit": 100,
  "status": 1,
  "notificationSendPercent": {
    "immediate": 80,
    "failed": 20
  },
  "createdAt": "2026-02-03T14:20:13.951Z"
}`}</pre>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Mail className="w-5 h-5" /> Step 4: Send Email Notification
            </div>
            <p className="text-slate-300">Send immediate or scheduled email notifications.</p>
            <pre className="bg-black rounded-xl p-4 text-sm overflow-x-auto">{`POST ${apiBaseUrl}/notifications/send-immediate

{
  "organizationCredentialId": "69782ac9558aa9731bff7708",
  "to": "souravhd2@gmail.com",
  "subject": "this is a subject",
  "scheduleTime": "2024-12-12T11:01",
  "text": "this is bodyMessage",
  "priority": 2
}`}</pre>
            <p className="text-slate-400 text-sm">priority: 1 = immediate, 2 = scheduled</p>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6 space-y-2">
            <p className="text-slate-300">
              • For more API references, please check the Postman collection.
              <a className="bg-blue-600 rounded-sm px-1" href={postManCollectionLink} target="blank">Click</a>
            </p>
            <p className="text-slate-300">
              • These steps can also be completed using our UI dashboard.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
