/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'

import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { ReactModal } from '../../../../components/common/ReactModal'
import { useUpdateAddress } from '../../../../hooks/useUpdateAddress'

interface Props {
  isOpen: boolean
  addressId: string
  closeModal: () => void
  setAddressId: (id: string) => void
}

export const EditAddressModal: FC<Props> = ({
  isOpen,
  addressId,
  closeModal,
  setAddressId,
}) => {
  const { mutate } = useUpdateAddress()

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
    initialValues: {
      name: '',
    },

    onSubmit: async (values) => {
      mutate({
        id: addressId,
        name: values.name.toLowerCase(),
      })
      setAddressId('')
      formik.resetForm()
      closeModal()
    },
  })

  const { values, errors, handleChange, handleSubmit } = formik

  const submit = () => {
    handleSubmit()
  }

  return (
    <ReactModal
      isOpen={isOpen}
      title="Address name"
      description="Find this address easily by giving it a name"
      closeModal={closeModal}
    >
      <div className="mt-4"></div>
      <BaseInput
        name="name"
        label="Name"
        value={values.name}
        error={errors.name}
        handleChange={handleChange}
        placeholder="Add descriptive name"
      />
      <div className="mt-4 flex justify-end">
        <BaseButton size="small" text="Save" style="primary" onClick={submit} />
      </div>
    </ReactModal>
  )
}
