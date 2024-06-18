import { useParams } from 'react-router-dom'
import { Editor, onContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Document as DocType } from '@/shared/types/ipc'
export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [htmlTags, setHtmlTags] = useState<any>({})

  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      //@ts-ignore
      const response = await window.api.fetchDocument({ id: id! })

      return response.data
    },
  })

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: onContentUpdatedParams) => {
      //@ts-ignore
      await window.api.saveDocument({
        id: id!,
        title,
        content,
      })
    },
    onSuccess: (_, { title }) => {
      queryClient.setQueryData<DocType[]>(['documents'], (documents) => {
        return documents?.map((document) => {
          if (document.id === id) {
            return { ...document, title }
          }
          return document
        })
      })
    },
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? ''}`
    }
    return ''
  }, [data])

  function handleEditorContentUpdated({
    title,
    content,
    //@ts-ignore
    editorJSON,
  }: onContentUpdatedParams) {
    saveDocument({ title, content })
    setHtmlTags(editorJSON)
  }

  console.log(htmlTags)
  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-pen-300 font-semibold text-xs">
          TABLE OF CONTENT
        </span>

        <ToC.Root>

          {htmlTags?.content?.map((tag: any) => {
            if (tag?.type === 'heading' && tag.attrs.level === 1) {
              return <ToC.Link>{tag?.content?.[0]?.text}</ToC.Link>
            }
            if (tag?.type === 'heading' && tag.attrs.level > 1) {
              return (
                <ToC.Section>
                  <ToC.Link>{tag?.content?.[0]?.text}</ToC.Link>
                </ToC.Section>
              )
            }
          })}
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data ? (
          <Editor
            onContentUpdated={handleEditorContentUpdated}
            content={initialContent}
          />
        ) : (
          <></>
        )}
      </section>
    </main>
  )
}
