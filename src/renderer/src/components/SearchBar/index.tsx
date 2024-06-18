import { useQuery } from '@tanstack/react-query'
import { Command } from 'cmdk'
import { File, MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function SearchBar({ open, onOpenChange }: SearchBarProps) {
  const navigate = useNavigate()
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpenChange, open])

  //@ts-ignore


  const { data }: any = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      //@ts-ignore
      const response = await window.api.fetchDocuments()
      return response.data
    },
  })


  const handleOpenDocument = (documentId: any) => {
    navigate(`/documents/${documentId}`)
    onOpenChange(false)
  }
  return (
    <Command.Dialog
      className="fixed top-24 left-1/2 -translate-x-1/2 w-[480px] max-w-full bg-pen-800 rounded-md shadow-2xl text-pen-100 border border-pen-600"
      open={open}
      onOpenChange={onOpenChange}
      label="Search"
    >
      <div className="flex items-center gap-2 border-b border-pen-700 p-4">
        <MagnifyingGlass className="w-5 h-5" />
        <Command.Input
          autoFocus
          placeholder="Buscar documentos..."
          className="w-full bg-transparent focus:outline-none text-sm text-pen-50 placeholder:text-pen-200"
        />
      </div>
      <Command.List className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-pen-600 scrollbar-track-pen-800">
        <Command.Empty className="py-3 px-4 text-pen-200 text-sm">
          Nenhum documento encontrado.
        </Command.Empty>


        {data?.map((document: any) => {
          return (
            <Command.Item
              key={document.id}
              onSelect={() => handleOpenDocument(document.id)}
              className="py-3 px-4 text-pen-50 text-sm flex items-center gap-2 hover:bg-pen-700 aria-selected:!bg-pen-600"
            >
              <File className="w-4 h-4" />
              {document.title}
            </Command.Item>
          )
        })}
      </Command.List>
    </Command.Dialog>
  )
}
