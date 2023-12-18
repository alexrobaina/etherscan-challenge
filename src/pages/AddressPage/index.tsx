import { useFormik } from 'formik'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { BaseButton } from '../../components/common/BaseButton'
import { BaseInput } from '../../components/common/BaseInput'
import { BaseLoading } from '../../components/common/BaseLoading'
import { BaseSelect } from '../../components/common/BaseSelect'
import { Header } from '../../components/common/Header'
import { useCreateEtherExchangeRate } from '../../hooks/useCreateEtherExchangeRate'
import { useGetAddress } from '../../hooks/useGetAddress'
import { useGetEtherExchangeRate } from '../../hooks/useGetEtherExchangeRate'
import { useGetListExchangeRates } from '../../hooks/useGetListExchangeRates'
import { formatEthBalance, formatExchangeRate } from '../../utils/ether'

import { ExchangeRateChart } from './components/ExchangeRateChart'

export const AddressPage: FC = () => {
  const { address } = useParams()
  const { data: addressData, isLoading: isLoadingAddress } =
    useGetAddress(address)
  const {
    reset,
    mutate,
    data: etherExchangeRateData,
    isLoading: isLoadingEtherExchangeRate,
  } = useGetEtherExchangeRate()
  const {
    mutateCreateEtherExchange,
    isLoading: isLoadingCreateEtherExchangeRate,
  } = useCreateEtherExchangeRate()
  const { data, isLoading: isLoadingListExchangeRates } =
    useGetListExchangeRates(addressData?.addressId)

  const formik = useFormik({
    validationSchema: Yup.object({
      amount: Yup.string().required('Amount is required'),
      currency: Yup.string().required('Currency is required'),
    }),
    initialValues: {
      amount: '',
      currency: '',
      address: address || '',
    },
    onSubmit: (values) => mutate({ ...values, address }),
  })

  const {
    values,
    errors,
    resetForm,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik

  const getEtherExcangeRate = () => {
    handleSubmit()
  }

  const handleSaveData = () => {
    mutateCreateEtherExchange({
      address: address,
      amount: values.amount,
      currency: etherExchangeRateData.currency,
      exchangeRate: etherExchangeRateData?.etherExchangeRate,
    })
    resetForm()
    reset()
  }

  const isLoading = isLoadingListExchangeRates || isLoadingAddress

  return (
    <div className="">
      <header className="flex lg:flex-row md:justify-between flex-col gap-5">
        <Header title="Address" buttonBack />
      </header>
      <div className="flex mt-5 w-full">
        <div className="shadow-2xl sm:rounded-lg p-8 sm:px-12 w-full">
          <div className="flex justify-between items-center">
            <div>
              Address: <span className="font-bold">{address}</span>
            </div>
            {addressData?.isOlderThanOnaYear ? (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                Older than one year
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                Less than one year
              </span>
            )}
          </div>
          {addressData?.addressBalance && (
            <div className="mt-3">
              {`Your address balance is: `}
              <span className="font-bold">
                {formatEthBalance(addressData?.addressBalance)}
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <BaseInput
              name="amount"
              type="number"
              label="Add amount"
              value={values.amount}
              error={errors.amount}
              placeholder="Add amount"
              handleChange={handleChange}
            />
            <BaseSelect
              name="currency"
              value={values.currency}
              error={errors.currency}
              label="Select a currency"
              options={
                ['USD', 'EUR'].map((item) => ({
                  label: item,
                  value: item,
                })) || []
              }
              placeholder="Add currency"
              setFieldValue={setFieldValue}
            />
          </div>
          <div className="mt-5 flex md:flex-row justify-start gap-2 md:gap-5">
            {values.amount && values.currency && (
              <>
                {values.amount && (
                  <div className="mt-3">
                    {`The amount in ${values.currency} is: `}
                    <span className="font-bold">{values.amount}</span>
                  </div>
                )}
              </>
            )}
            {etherExchangeRateData?.etherExchangeRate && (
              <div className="mt-3">
                {`Ether exchange rate: `}
                <span className="font-bold">
                  {formatExchangeRate(etherExchangeRateData?.etherExchangeRate)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-5">
            <div className="mt-2 w-full">
              <BaseButton
                style="primary"
                className="w-[300px]"
                text="Get exchange rate"
                onClick={getEtherExcangeRate}
                isLoading={isLoadingEtherExchangeRate}
              />
            </div>
            <div className="mt-2 w-full">
              <BaseButton
                text="Save"
                style="primary"
                className="w-[300px]"
                onClick={handleSaveData}
                isLoading={isLoadingCreateEtherExchangeRate}
                isDisabled={!etherExchangeRateData?.etherExchangeRate}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-[100px]">
          <BaseLoading large />
        </div>
      ) : (
        <ExchangeRateChart data={data} />
      )}
    </div>
  )
}
