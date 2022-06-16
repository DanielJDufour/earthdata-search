export const buildDuplicateCollections = (json) => {
  const { duplicateCollections } = json

  if (!duplicateCollections) return []

  const ids = duplicateCollections.items.map((item) => item.id).sort()

  return ids
}

export default buildDuplicateCollections
