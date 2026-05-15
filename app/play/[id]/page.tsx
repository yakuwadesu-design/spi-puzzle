import { notFound } from "next/navigation";
import { PuzzleBoard } from "@/components/PuzzleBoard";
import { problems, getProblemById } from "@/data/problems";

export function generateStaticParams() {
  return problems.map((p) => ({ id: p.id }));
}

export default async function PlayProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = getProblemById(id);
  if (!problem) {
    notFound();
  }
  return <PuzzleBoard problem={problem} />;
}
