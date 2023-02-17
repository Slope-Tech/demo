import { Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'
import React from 'react'

const ErrorAlert: React.FC<{ error: any; setError: any }> = ({ error, setError }) => {
  if (!error) {
    return null
  }

  const message = error.messages[0] || JSON.stringify(error)

  return (
    <Alert
      mb="xl"
      onClose={() => setError(null)}
      icon={<IconAlertCircle size={16} />}
      title="Bummer!"
      withCloseButton
      color="red"
    >
      {message}
    </Alert>
  )
}

export default ErrorAlert
