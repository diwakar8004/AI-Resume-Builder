'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useResumeStore } from '@/store/resume-store';

// Debounce helper
function useDebouncedCallback(callback: (...args: unknown[]) => void, delay = 1000) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (...args: unknown[]) => {
    if (timer.current) window.clearTimeout(timer.current as unknown as number);
    timer.current = setTimeout(() => callback(...args), delay);
  };
}

export function Autosave({ documentId: routeDocumentId, createNew = false }: { documentId?: string | null; createNew?: boolean }) {
  const { data: session } = useSession();
  const {
    documentId,
    setDocumentId,
    documentTitle,
    resumeData,
    loadResumeData,
    setDocumentTitle,
    markClean,
    isDirty,
    markDirty,
  } = useResumeStore();

  // Create or load the document when user signs in / when route provides id
  useEffect(() => {
    const init = async () => {
      if (!session?.user?.id) return;

      // If there's a route id, try to load that document
      const idToLoad = routeDocumentId || documentId;
      if (idToLoad) {
        try {
          const res = await fetch(`/api/documents/${idToLoad}`);
          if (res.ok) {
            const json = await res.json();
            const doc = json.document;
            setDocumentId(doc.id);
            setDocumentTitle(doc.title || 'Untitled Resume');
            if (doc.resumeData) loadResumeData(doc.resumeData);
            return;
          }
        } catch {
          // ignore and fallthrough to listing or creation
        }
      }

      if (!createNew) {
        // Otherwise, if the user has any documents, load the most recent
        try {
          const listRes = await fetch('/api/documents');
          if (listRes.ok) {
            const { documents } = await listRes.json();
            if (documents && documents.length > 0) {
              const d = documents[0];
              setDocumentId(d.id);
              setDocumentTitle(d.title || 'Untitled Resume');
              if (d.resumeData) loadResumeData(d.resumeData);
              return;
            }
          }
        } catch {
          // ignore
        }
      }

      // No existing document: create one from local state if not created already
      if (!documentId) {
        try {
          const createRes = await fetch('/api/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: documentTitle, template: resumeData.customization.template, resumeData }),
          });
          if (createRes.ok) {
            const { document } = await createRes.json();
            setDocumentId(document.id);
            markClean();
          }
        } catch {
          // ignore
        }
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id, routeDocumentId]);

  // Autosave: debounce saves when store becomes dirty
  const debouncedSave = useDebouncedCallback(async () => {
    // if unauthenticated, skip server save
    if (!session?.user?.id) return;

    // Ensure we have a server document id
    const id = documentId;
      if (!id) {
        // create
        try {
          const createRes = await fetch('/api/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: documentTitle, template: resumeData.customization.template, resumeData }),
          });
          if (createRes.ok) {
            const { document } = await createRes.json();
            setDocumentId(document.id);
            markClean();
            return;
          }
        } catch {
          return;
        }
      }

    // PATCH existing
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: documentTitle, resumeData }),
      });
      if (res.ok) {
        markClean();
      }
    } catch {
      // network error -> keep dirty
      markDirty();
    }
  }, 1000);

  // subscribe to relevant state and trigger autosave
  useEffect(() => {
    // when `isDirty` flips true, schedule a save
    if (isDirty) debouncedSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, documentTitle, resumeData]);

  return null;
}
