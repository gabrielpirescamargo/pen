import { BrowserWindow, Menu, Tray, app, nativeImage } from 'electron'
import path from 'path'
export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, '../../resources/penTemplate.png'),
  )
  const tray = new Tray(icon)
  const menu = Menu.buildFromTemplate([
    { label: 'Keynotes', enabled: false },
    {
      type: 'separator',
    },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Documentos recentes',
      enabled: false,
    },
    {
      label: 'React',
      accelerator: 'CommandOrControl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Node',
      accelerator: 'CommandOrControl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'React Native',
      accelerator: 'CommandOrControl+3',
      acceleratorWorksWhenHidden: false,
    },
    {
      type: 'separator',
    },
    {
      label: 'Sair do Keynotes',
      role: 'quit',
    },
  ])
  tray.setContextMenu(menu)
}
