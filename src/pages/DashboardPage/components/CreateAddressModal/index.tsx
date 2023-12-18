/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik'
import { FC, useContext } from 'react'
import * as Yup from 'yup'

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
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
  const context = useContext(AppContext)

  const { mutate } = useCreateAddress()

  const formik = useFormik({
    initialValues: {
      address: '',
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .matches(ethAddressRegex, 'Invalid Ethereum address')
        .required('Ethereum address is required'),
    }),
    onSubmit: async (values) => {
      mutate({
        ...values,
        userId: context?.user?.id as string,
      })

      formik.resetForm()
      closeModal()
    },
  })

  const { values, errors, handleChange, handleSubmit } = formik

  const onSubmit = () => {
    handleSubmit()
  }

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
          onClick={onSubmit}
        />
      </div>
    </ReactModal>
  )
}
