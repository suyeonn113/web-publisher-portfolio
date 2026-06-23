import { Icon } from '@iconify/react'
import { readingBlockTypes } from '../data/readingBlockTypes'

function ReadingBlockEditor({ block, onChange, onDelete }) {
  const blockType = readingBlockTypes.find((item) => item.type === block.type)

  if (!blockType) {
    return null
  }

  return (
    <article className="log-block">
      <div className="log-block-header">
        <strong>{blockType.label}</strong>
        <button type="button" onClick={() => onDelete(block)}>
          <Icon icon="fluent:dismiss-24-regular" width="18" height="18" />
        </button>
      </div>

      <div className="log-block-fields">
        {blockType.fields.map((field) => {
          const value = block.fields[field.name] || ''

          return (
            <label className="log-field" key={field.name}>
              <span>{field.label}</span>
              {field.input === 'textarea' ? (
                <textarea
                  value={value}
                  rows={field.name === 'content' ? 5 : 3}
                  onChange={(event) =>
                    onChange(block.id, field.name, event.target.value)
                  }
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(event) =>
                    onChange(block.id, field.name, event.target.value)
                  }
                />
              )}
            </label>
          )
        })}
      </div>
    </article>
  )
}

export default ReadingBlockEditor
