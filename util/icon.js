export async function loadIcon(name) {
  return {
    name,
    data: await(await fetch(`/img/${name}.svg`)).text()
  }
}

export async function importIcons() {
  const icons = await Promise.all([

  ])
  window.icons = {}
  icons.forEach(i => window.icons[i.name] = i.data)
}