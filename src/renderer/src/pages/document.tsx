import { Editor } from '../components/Editor'
import { ToC } from '../components/ToC'
export function Document() {
  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-pen-300 font-semibold text-xs">
          TABLE OF CONTENT
        </span>

        <ToC.Root>
          <ToC.Link>Backend</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        <Editor />
      </section>
    </main>
  )
}
