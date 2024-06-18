import clsx from 'clsx'
import { Code, CaretDoubleRight, TrashSimple } from 'phosphor-react'
import * as Breadcrumbs from './Breadcrumbs'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../lib/react-query'
import { Document } from '@/shared/types/ipc'

interface Header {
  isSidebarOpen: boolean
}
export function Header({ isSidebarOpen }: Header) {
  const isMacOS = process.platform === 'darwin'
  const { id } = useParams()
  const navigate = useNavigate()
  const { mutateAsync: deleteDocument } = useMutation({
    mutationFn: async () => {
      //@ts-ignore
      await window.api.deleteDocument({ id: id! })
    },
    onSuccess: () => {
      queryClient.setQueryData(['documents'], (documents: Document[]) => {
        return documents.filter((document) => document.id !== id)
      })
      navigate('/')
    },
  })


  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      //@ts-ignore
      const response = await window.api.fetchDocument({ id: id! })

      return response.data
    },
  })
  return (
    <div
      id="header"
      className={clsx(
        'border-b h-14 border-pen-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx('h-5 w-5 text-pen-200 hover:text-pen-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Collapsible.Trigger>

      {id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estudos
            </Breadcrumbs.Item>
            {/* <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator /> */}
            {/* <Breadcrumbs.Item>Back-end</Breadcrumbs.Item> */}
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>{data?.title}</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            <button
              onClick={() => {
                deleteDocument()
              }}
              className="inline-flex items-center gap-1 text-pen-100 text-sm hover:text-pen-50 disabled:opacity-60"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
