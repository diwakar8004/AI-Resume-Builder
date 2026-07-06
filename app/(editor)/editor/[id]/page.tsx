import { EditorShell } from '@/components/editor/editor-shell';
import { EditorLeftPanel } from '@/components/editor/left-panel';
import { ResumePreview } from '@/components/editor/resume-preview';
import { AIPanel } from '@/components/editor/ai-panel';

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <EditorShell
      documentId={id}
      LeftPanel={<EditorLeftPanel />}
      CenterPanel={<ResumePreview />}
      RightPanel={<AIPanel />}
    />
  );
}

export function generateMetadata() {
  return { title: 'Resume Editor | ResumeAI' };
}
