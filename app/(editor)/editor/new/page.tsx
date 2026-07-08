import { EditorShell } from '@/components/editor/editor-shell';
import { EditorLeftPanel } from '@/components/editor/left-panel';
import { ResumePreview } from '@/components/editor/resume-preview';
import { AIPanel } from '@/components/editor/ai-panel';

export default function NewEditorPage() {
  return (
    <EditorShell
      createNew
      LeftPanel={<EditorLeftPanel />}
      CenterPanel={<ResumePreview />}
      RightPanel={<AIPanel />}
    />
  );
}

export function generateMetadata() {
  return { title: 'New Resume Editor | ResumeAI' };
}
