import { Icon } from '@iconify/react'
import { NodeViewWrapper } from '@tiptap/react'
import { readingBlockTypes } from '../data/readingBlockTypes'

function LogBlockNodeView({ node, updateAttributes, deleteNode }) {
  const blockType = readingBlockTypes.find(
    (item) => item.type === node.attrs.blockType,
  )

  if (!blockType) {
    return null
  }

  const fields = node.attrs.fields || {}

  const handleFieldChange = (fieldName, value) => {
    updateAttributes({
      fields: {
        ...fields,
        [fieldName]: value,
      },
    })
  }

  if (node.attrs.blockType === 'headline') {
    return (
      <NodeViewWrapper className="log-headline" data-log-block="">
        <input
          type="text"
          value={fields.title || ''}
          placeholder="Headline"
          onChange={(event) => handleFieldChange('title', event.target.value)}
        />
        <button type="button" onClick={deleteNode}>
          <Icon icon="fluent:dismiss-24-regular" width="16" height="16" />
        </button>
      </NodeViewWrapper>
    )
  }

  if (node.attrs.blockType === 'clip') {
    return (
      <NodeViewWrapper className="log-clip" data-log-block="">
        <div className="log-clip-mark">
          <Icon icon="fluent:clipboard-text-24-regular" width="16" height="16" />
          <span>Clip</span>
        </div>

        <textarea
          className="log-clip-quote"
          value={fields.content || ''}
          rows="4"
          placeholder="Quote"
          onChange={(event) => handleFieldChange('content', event.target.value)}
        />

        <input
          className="log-clip-location"
          type="text"
          value={fields.location || ''}
          placeholder="Location memo"
          onChange={(event) => handleFieldChange('location', event.target.value)}
        />

        <textarea
          className="log-clip-memo"
          value={fields.memo || ''}
          rows="3"
          placeholder="Why this stayed with me"
          onChange={(event) => handleFieldChange('memo', event.target.value)}
        />

        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon icon="fluent:dismiss-24-regular" width="16" height="16" />
        </button>
      </NodeViewWrapper>
    )
  }

  if (node.attrs.blockType === 'topic') {
    return (
      <NodeViewWrapper className="log-topic" data-log-block="">
        <div className="log-topic-mark">
          <Icon
            icon="fluent:chat-bubbles-question-24-regular"
            width="16"
            height="16"
          />
          <span>Topic</span>
        </div>

        <textarea
          className="log-topic-question"
          value={fields.topic || ''}
          rows="3"
          placeholder="Topic"
          onChange={(event) => handleFieldChange('topic', event.target.value)}
        />

        <textarea
          className="log-topic-answer"
          value={fields.answer || ''}
          rows="3"
          placeholder="My thoughts"
          onChange={(event) => handleFieldChange('answer', event.target.value)}
        />

        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon icon="fluent:dismiss-24-regular" width="16" height="16" />
        </button>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className="log-block" data-log-block="">
      <div className="log-block-header">
        <strong>{blockType.label}</strong>
        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon icon="fluent:dismiss-24-regular" width="18" height="18" />
        </button>
      </div>

      <div className="log-block-fields">
        {blockType.fields.map((field) => {
          const value = fields[field.name] || ''

          return (
            <label className="log-field" key={field.name}>
              <span>{field.label}</span>
              {field.input === 'textarea' ? (
                <textarea
                  value={value}
                  rows={field.name === 'content' ? 5 : 3}
                  onChange={(event) =>
                    handleFieldChange(field.name, event.target.value)
                  }
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(event) =>
                    handleFieldChange(field.name, event.target.value)
                  }
                />
              )}
            </label>
          )
        })}
      </div>
    </NodeViewWrapper>
  )
}

export default LogBlockNodeView
