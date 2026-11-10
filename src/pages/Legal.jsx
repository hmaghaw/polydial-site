import { marked } from "marked";
import SubPageLayout from "../components/SubPageLayout.jsx";
import privacy from "../content/privacy-policy.md?raw";
import terms from "../content/terms-of-service.md?raw";

// Legal copy lives in src/content/*.md so it can be edited without touching code.
const DOCS = { privacy, terms };

export default function Legal({ doc }) {
  const html = marked.parse(DOCS[doc], { breaks: true });
  return (
    <SubPageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="legal" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </SubPageLayout>
  );
}
