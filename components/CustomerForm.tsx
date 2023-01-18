import { SimpleGrid, TextInput } from '@mantine/core'
import React from 'react'

class CustomerForm extends React.Component<{
  customerForm: any
  setCustomerForm: any
}> {
  renderFormField(field, label) {
    const { customerForm, setCustomerForm } = this.props
    const value = customerForm[field]
    let error
    if (field === 'state' && value.length !== 2) {
      error = 'State must be 2 characters'
    } else if (!value) {
      error = `${label} cant be blank`
    }

    return (
      <TextInput
        mb={10}
        onChange={(event) => {
          const newForm = { ...customerForm }
          newForm[field] = event.currentTarget.value
          setCustomerForm(newForm)
        }}
        value={value}
        label={label}
        withAsterisk
        error={error}
      />
    )
  }

  render() {
    return (
      <>
        {this.renderFormField('businessName', 'Business Name')}
        <SimpleGrid cols={2}>
          {this.renderFormField('email', 'Email')}
          {this.renderFormField('phone', 'Phone')}
        </SimpleGrid>
        <SimpleGrid cols={2}>
          {this.renderFormField('line1', 'Address')}
          {this.renderFormField('city', 'City')}
        </SimpleGrid>
        <SimpleGrid cols={2}>
          {this.renderFormField('state', 'State')}
          {this.renderFormField('postalCode', 'Postal Code')}
        </SimpleGrid>
      </>
    )
  }
}

export default CustomerForm
