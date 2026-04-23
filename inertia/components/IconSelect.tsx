import { useMemo } from 'react'
import { Select, Space } from 'antd'
import { icons } from 'lucide-react'

interface IconSelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function IconSelect({ value, onChange, placeholder = 'Select icon' }: IconSelectProps) {
  const options = useMemo(() => {
    return Object.keys(icons).map((name) => {
      const Icon = (icons as any)[name]
      return {
        label: (
          <Space>
            {Icon && <Icon size={16} />}
            <span>{name}</span>
          </Space>
        ),
        value: name,
      }
    })
  }, [])

  return (
    <Select
      showSearch
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      optionFilterProp="value"
      options={options}
      className="w-full"
      allowClear
    />
  )
}
