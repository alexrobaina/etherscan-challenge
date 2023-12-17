/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik'
import { FC, useContext } from 'react'

import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { ReactModal } from '../../../../components/common/ReactModal'
import { useCreateAddress } from '../../../../hooks/useCreateAddress'
import { AppContext } from '../../../../services/AppContext'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

export const CreateAddressModal: FC<Props> = ({ isOpen, closeModal }) => {
  const context = useContext(AppContext)
  console.log(context?.user)

  const { mutate } = useCreateAddress()

  const formik = useFormik({
    initialValues: {
      address: '',
    },

    onSubmit: async (values) => {
      console.log(values)
      mutate({
        ...values,
        // id:
      })

      formik.resetForm()
      closeModal()
    },
  })

  const {
    values,
    errors,
    resetForm,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik

  return (
    <ReactModal isOpen={isOpen} title="Add address" closeModal={closeModal}>
      <BaseInput
        name="address"
        label="Address"
        value={values.address}
        error={errors.address}
        handleChange={handleChange}
        placeholder="Add your address"
      />
      <div className="mt-4 flex justify-end">
        <BaseButton
          size="small"
          text="Create"
          style="primary"
          onClick={handleSubmit}
        />
      </div>
    </ReactModal>
  )
}
