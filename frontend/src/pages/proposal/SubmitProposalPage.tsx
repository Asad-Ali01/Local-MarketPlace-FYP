import { Link, useParams } from "react-router";
import { ArrowLeft, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import SubmitProposalForm from "@/components/proposal/CreateProposal";


const SubmitProposalPage = () => {
  const { jobId } = useParams<{ jobId: string }>();

  if (!jobId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Invalid job
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          The job ID is missing from the URL.
        </p>
        <Link
          to="/jobs"
          className="mt-5 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Browse jobs
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          to={"/provider/jobs"}
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to job details
        </Link>

        <div className="mb-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <BriefcaseBusiness size={24} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Provider workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Submit your proposal
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-400">
            Tell the client how you can help, share your proposed budget,
            and provide an estimated completion time.
          </p>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-7 flex items-start gap-3 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-500/10">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
            />
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Make your proposal stand out
              </h2>
              <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                Explain your relevant skills, your approach to the project,
                and why the client should choose you.
              </p>
            </div>
          </div>

          <SubmitProposalForm jobId={jobId} />
        </section>

        <p className="mt-5 text-center text-xs text-gray-500">
          Your proposal will be shared with the client who posted this job.
        </p>
      </div>
    </main>
  );
};

export default SubmitProposalPage;